/**
 * Adds table header text as data attributes to table cells, which will appear on mobile for responsive tables.
 */
function labelResponsiveTableCells() {
	const tableCells = document.querySelectorAll('.rise-table-wrap--responsive td');
	tableCells.forEach(tableCell => {
		let cellIndex = tableCell.cellIndex;
		let table = tableCell.closest('table');
		let headerText = (table.querySelector('tr').cells[cellIndex].textContent);
		tableCell.setAttribute('data-label', headerText);
	});
}
function init() {
	console.log('Mighty custom code running');
        const observer = new MutationObserver(() => {
                labelResponsiveTableCells();
        });
	// Observe lessons being loaded
        observer.observe(document.body, {
                childList: true,
                subtree: true,
        });
}
init();
