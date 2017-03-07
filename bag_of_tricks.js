/*These functions execute the correct tricks.js function based on which button in the pop-up window was clicked*/

/*First, a function to inject jQuery into the page
because the content script cannot read the version
of jQuery that is already embedded in the page.*/
injectjQuery = function() {
	chrome.tabs.executeScript(
      {file:"jquery-2.1.3.min.js"});
}

/*Here are all of the execution functions. */

//DE tweaks
executeWidenOptions = function() {
	injectjQuery();
 	chrome.tabs.executeScript(
 		{code:"widenOptions();"});
}

executeOpenOptions = function() {
	injectjQuery();
 	chrome.tabs.executeScript(
 		{code:"openOptions();"});
}

executeOpenActiveOptions = function() {
	injectjQuery();
 	chrome.tabs.executeScript(
 		{code:"openActiveOptions();"});	
}

//Navigation
executeOpenTicket = function() {
	injectjQuery();
	chrome.tabs.executeScript(
		{code:"openTicket();"});
}

executeTicketSearch = function() {
	injectjQuery();
	chrome.tabs.executeScript(
		{code:"searchForTickets();"});
}

//Etc.
executeGenerateTBJFiles = function() {
	injectjQuery();
	chrome.tabs.executeScript(
		{code:"generateTBJFiles();"});
}

document.addEventListener('DOMContentLoaded', function () {
	//DE tweaks
	document.getElementById("open-active").addEventListener('click', executeOpenActiveOptions);
	document.getElementById("open-all").addEventListener('click', executeOpenOptions);
	document.getElementById("widen-options").addEventListener('click', executeWidenOptions);
	//Navigation
	document.getElementById("go-to-ticket").addEventListener('click', executeOpenTicket);
	document.getElementById("search-for-ticket").addEventListener('click', executeTicketSearch);
	//Etc.
	document.getElementById("tbj").addEventListener('click', executeGenerateTBJFiles);
});

