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
/**
 * Install Google Tag Manager.
 */
function installGTM() {
	const gtmScriptTag = document.createElement('script');
	const gtmNoScriptTag = document.createElement('noscript');
	gtmScriptTag.text = `
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TR597RRZ');
`;
	gtmNoScriptTag.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TR597RRZ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
	document.head.prepend(gtmScriptTag);
	document.body.prepend(gtmNoScriptTag);
}
function init() {
	console.log('Mighty custom code running');
	installGTM();
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
