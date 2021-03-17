/**
Updateing history
 * 12032021 Apply Scroll func
 * 13032021 apply hover func
 * 14032021 apply active sections
 * 15032021 Fix scroll issue
 * 16032021 fix resolution issue

 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
* @description Represents a Navigator and sections
* @constructor
* @param {navigator01} navigator01 - navigator bar
* @param {sectionmoving} sectionmoving -to select sections while moving
* @param {navbar01} navbar01 -to select current titles in navigator bar
*/

const navbarMenu = document.querySelector('.navigator01');
const sectionWrapper = document.querySelector('.sectionmoving');
const navbarListContainer = document.querySelector('#navbar01');
let allSections = [];
let allNavItems = [];
let activeSection = [];
let activeNavItem = [];
const classEnums = {
  SECTION_ACTIVE: 'activediv',
  NAV_ACTIVE: 'activeitems',
};

const intersectionOptions = {
  threshold: 0.8,
};
/*it's that instead on toggling the target visibility,
i want to make an call to an endpoint to retrieve the data and do action.*/
function intersectionCallback(entries, potat) {
  //console.log(entries); test
  if(entries[0].isIntersecting) {
    handleIntersection(entries[0].target);
  }
}
const observer = new IntersectionObserver(intersectionCallback, intersectionOptions);
/**
 * to select sections if lenght = 0 return all sections
*/
function getAllSections() {
  if(allSections.length === 0) {
    allSections = [ ...sectionWrapper.children];
  }
  return allSections;
}
// to select the active section per scroll
function activateClickedItem() {
const oldActiveSection = document.querySelector(`.${classEnums.SECTION_ACTIVE}`);
oldActiveSection.classList.remove(classEnums.SECTION_ACTIVE);
const oldActiveNavItem = document.querySelector(`.${classEnums.NAV_ACTIVE}`)
oldActiveNavItem.classList.remove(classEnums.NAV_ACTIVE);

activeNavItem.classList.add(classEnums.NAV_ACTIVE);
activeSection.classList.add(classEnums.SECTION_ACTIVE);
}

function getNavItemView(itemName, index) {
  return `<li class="menucontent01" id="navitem${index}" data-sectionid="section${index}">${itemName}</li>`;
}

function populateNav(items) {
navbarListContainer.innerHTML = items;
}

function getSectionInfo(section) {
  console.log(section.dataset.nav)
  return section.dataset.nav || 'For test';
}

//console.dir(getAllSections().forEach(getSectionInfo)) - to test under test
/**
 
 * functions related to lesson 4#
*/

function handleIntersection(section) {
  const sectionId = section.id;
  console.log(section.id)
  activeSection = document.querySelector(`#${sectionId}`);
  //cheap trick
  console.log(sectionId.match(/d+/))
  const navItemQuery = '#navitem'.concat(sectionId.replace('section', ''))
  console.log(navItemQuery)
  activeNavItem = document.querySelector(navItemQuery);
  activateClickedItem()
}

function init() {
  let navHTML = '';
  getAllSections().forEach((section, index) => {
    observer.observe(section);
    navHTML += getNavItemView(section.dataset.nav, index+1);
  })
  populateNav(navHTML);
  allNavItems = [ ...navbarListContainer.children ];
  allNavItems.forEach(function(navItem, index) {
    navItem.addEventListener('click', handleNavItemClick)
  })
  allNavItems[0].classList.add(classEnums.NAV_ACTIVE);
  console.log(allNavItems)
}
// its return li#navitem4.menucontent01 to select whhat is the current section i clicked
function scrollToElement(element) {
  const { x, y, top } = element.getBoundingClientRect();
  window.scrollTo({
    top: document.documentElement.scrollTop + y,
    left: x,
    behavior: 'smooth',
  })
}

// to return what navitem is clicked by select menucontent01 from HTML
function handleNavItemClick(navEvent) {
  const correspondingSectionID = navEvent.target.dataset.sectionid;
  activeSection = document.querySelector(`#${correspondingSectionID}`);
  activeNavItem = navEvent.target;
  console.dir(activeNavItem)
  // for mobile devices
  if(window.outerWidth <= 786) {
      activateClickedItem();
  }
  scrollToElement(activeSection)
}


// build the nav

// Add class 'active' to section when near top of viewport - active 1 - done tested
/*
TESTing funcition - Faild
loop scrolls
1- for (var i = 0; i < array.length; i++) {
  array[i]
  var current = document.getElementsByClassName (*activeitems*)
  current [0].className = current
}
*/

// Scroll to anchor ID using scrollTO event - done tested


/**
 * End Main Functions
 * Begin Events done - tested
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
init();
