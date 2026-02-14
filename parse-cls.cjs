const fs = require('fs');
try {
    const report = JSON.parse(fs.readFileSync('./lighthouse-mobile.json'));
    const audits = report.audits;
    const cls = audits['cumulative-layout-shift'];
    const shifts = audits['layout-shifts']?.details?.items || [];

    console.log('CLS Value:', cls.displayValue);
    console.log('Number of Shifts:', shifts.length);

    shifts.forEach((shift, index) => {
        console.log(`\nShift #${index + 1}: score ${shift.score}`);
        // node from the shift
        // Lighthouse JSON structure for node is complex, usually in shift.node
        // But let's print what we can finding
        console.log(JSON.stringify(shift, null, 2));
    });

    const domSize = audits['dom-size']?.displayValue;
    console.log('\nDOM Size:', domSize);

} catch (e) {
    console.error('Error:', e);
}
