import config from '../config/config.js';

export async function startCoverage(page) {
    await Promise.all([
        page.coverage.startJSCoverage({ resetOnNavigation: false }),
        page.coverage.startCSSCoverage({ resetOnNavigation: false })
    ])
}

export async function stopCoverage(page, HTMLCoverageReport, navigationStep) {
    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage()
    ])

    let coverageReport = parseCoverageHTML(HTMLCoverageReport, navigationStep, jsCoverage, cssCoverage);

    return coverageReport;
}

export function formatBytesToKB(bytes) {
    if (bytes > 1024) {
        const formattedNum = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(bytes / 1024);
        return `${formattedNum}KB`;
    }
    return `${bytes} bytes`;
}

function parseCoverageObjects(coverage, type) {
    var HTMLCoverageReportRows = ``;
    var totalUnused = 0;
    var totalBytes = 0;

    coverage.forEach(function (file) {
        let { url, ranges, text } = file;
        var totalLength = 0;
        ranges.forEach(function (range) {
            let { start, end } = range;
            let length = end - start;
            totalLength = totalLength + length;
        });

        var total = text.length;
        var unused = total - totalLength;
        var unusedPc = Math.round((unused / total) * 100);

        totalUnused = totalUnused + unused;
        totalBytes = totalBytes + total;

        const HTMLCoverageReportRowTemp = `<tr>
        <td>${url}</td>
        <td nowrap><i>${type}</i></td>
        <td nowrap>${text.length}</td>
        <td nowrap>${unused} <b>(${unusedPc}%)</b></td>
      </tr>`;

        HTMLCoverageReportRows = `${HTMLCoverageReportRows}${HTMLCoverageReportRowTemp}`;
    });

    return { HTMLCoverageReportRows, totalUnused, totalBytes };
}

function parseCoverageHTML(HTMLCoverageReport, navigationStep, coverageJS, coverageCSS) {

    let parsedJSCoverage = parseCoverageObjects(coverageJS, 'JS');
    let parsedCSSCoverage = parseCoverageObjects(coverageCSS, 'CSS');

    let totalUnused = parsedJSCoverage.totalUnused + parsedCSSCoverage.totalUnused;
    let totalBytes = parsedJSCoverage.totalBytes + parsedCSSCoverage.totalBytes;
    let unusedPc = Math.round((totalUnused / totalBytes) * 100);

    const HTMLCoverageReportHeader = `
    <table>
    <tr>
        <th align="left" colspan="3">${navigationStep}</th>
    </tr>
    <tr>
        <th align="left">URL</th>
        <th>Type</th>
        <th>Total Bytes</th>
        <th>Unused Bytes</th>
    </tr>`;

    const HTMLCoverageReportTotal = `
    <tr>
        <th align="left" colspan="3">Total ${formatBytesToKB(totalUnused)} out of ${formatBytesToKB(totalBytes)} unused (${unusedPc}%).</th>
    <tr>`;

    const HTMLCoverageReportFooter = `</table>`;

    const HTMLCoverageReportTemp = `
    ${HTMLCoverageReportHeader}
    ${parsedJSCoverage.HTMLCoverageReportRows}
    ${parsedCSSCoverage.HTMLCoverageReportRows}
    ${HTMLCoverageReportTotal}
    ${HTMLCoverageReportFooter}`

    HTMLCoverageReport = `${HTMLCoverageReport}${HTMLCoverageReportTemp}`;

    return `${HTMLCoverageReport}`;
}

export function outputCoverage(outputTitle, outputHTML) {

    
    let dt = new Date();
    let outputUtcTime = dt.toUTCString();
    let outputTimestamp = dt.getTime();
    let outputFilename = `${outputTitle}-${outputTimestamp}.html`
    
    let outputTarget = config.outputTarget;

    if ( outputTarget === 'WPCOM' && config.outputWordPressAPIKey) {
        let wpcom = require('wpcom')(config.outputWordPressAPIKey);

        wpcom
            .site(config.outputWordPressName)
            .addPost({ title: `${outputTitle} ${outputUtcTime}`, content: outputHTML }, function (err, data) {
                if (err) throw err;
                debugger;
            });
        }
    else {
        const fs = require('fs');

        fs.writeFile(`${__dirname}/../output/${outputFilename}`, outputHTML, 'utf8', function (err) {
          if (err) {
              return console.log(err);
          }
        }); 

        if ( outputTarget === 'WPCOM' && !(config.outputWordPressAPIKey) ) {
            console.log("No WPCOM API key found, outputting to local HTML file.");
        }
          
        console.log(`Coverage output saved as "output/${outputFilename}"`);       
    }
}

/*


    
*/