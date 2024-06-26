const lang_introduction = "Ready to elevate your digital landscape? With a robust skillset that spans Apache JMeter to Selenium WebDriver and fluency in frameworks and languages like ASP.NET Web Apps, HTML/CSS, JavaScript, C#, and PHP, I excel at weaving seamless interfaces and sturdy backends into the fabric of any platform. Let’s stitch together your next project and tailor a solution that fits perfectly. Interested in threading some ideas? Let’s connect.";
const lang_collapse_all = "Collapse All";
const lang_expand_all = "Expand All";
const lang_no_results = "No Results";

const smoothScroll = (id) => {
    var element = $(`#${id}`);
    if (element) {
        element.stop().animate({ scrollTop: element.prop("scrollHeight"), }, 500);
    } else {
        console.warn(`Element with id '${id}' not found`);
    }
};

function setOnlyOneActive(buttonClicked, targetSectionId) {
    $('.top-nav .nav-item').removeClass("active");

    if (targetSectionId == "") {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    } else {
        $('#' + buttonClicked).addClass("active");
        $('html, body').animate({
            scrollTop: $(`#${targetSectionId}`).offset().top
        }, 1000);
    }
    // Mobile View
    if ($('#hamburger').parent().css('display') === "flex") {
        $(".top-nav").css("display", "none");
        $('#hamburger').removeClass("open");
    }
}

function sortDescByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

/*********  Home ***********/
function init() {
    $('#hamburger').click(function () {
        $('#hamburger').toggleClass("open");
        $(".top-nav").slideToggle();
    });

    $(window).resize(function () {
        if ($(window).width() > 767) {
            $(".top-nav").css("display", "flex");
        } else {
            $(".top-nav").css("display", "none");
        }
        $('#hamburger').removeClass("open");
    });

    setNavBar();
    setFooterRow();
    setNavProgress();

    setHomeText();

    loadWorkExperience();
    loadCertifications();
    loadEducation();

    loadSkills();

    loadProjects();   
    includeHTML();

    setTimeout(function () { getFlickr(); }, 5000);
}

function setNavBar() {
    var lastScrollTop = 0;
    var navbarVisible = true;

    window.addEventListener('scroll', function () {
        var navbar = document.getElementById('top-navbar');
        var scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll down
            if (navbarVisible) {
                if ($('#hamburger').parent().css('display') === "flex") {
                    $(".top-nav").css("display", "none");
                    $('#hamburger').removeClass("open");
                }
                navbar.classList.add('hidden');
                navbarVisible = false;
            }
        } else {
            // Scroll up
            if (!navbarVisible) {
                navbar.classList.remove('hidden');
                navbarVisible = true;
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });
}
function setFooterRow() {
    window.addEventListener('scroll', function () {
        var footerRow = document.getElementById('bottom-footer');
        var triggerElement = document.getElementById('homeSection');
        // Get the bottom position of the trigger element
        var triggerBottom = triggerElement.getBoundingClientRect().bottom;

        if (triggerBottom <= 0) {
            // If the trigger element is above or at the top of the viewport
            footerRow.classList.remove('originalFooter');
            footerRow.classList.add('stickyFooter');
        } else {
            // If the trigger element is below the top of the viewport
            footerRow.classList.remove('stickyFooter');
            footerRow.classList.add('originalFooter');
        }
    });
}
function setNavProgress() {
    const sections = document.querySelectorAll("section");
    const buttons = document.querySelectorAll(".top-nav .nav-item");

    window.addEventListener("scroll", function () {
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 10) {
                currentSection = section;
            }
        });

        if (currentSection) {
            let activeButtonId = null;
            buttons.forEach(button => {
                if (button.classList.contains("active")) {
                    activeButtonId = button.id;
                }
            });

            if (currentSection == "homeSection") {
                $('.top-nav .nav-item').removeClass("active");
            } else {
                $('.top-nav .nav-item').removeClass("active");
                $(`#${currentSection.id}Btn`).addClass("active");
            }
        }

        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            $('.top-nav .nav-item').removeClass("active");
            $(`#photographySectionBtn`).addClass("active");
        }
    });
}

function setHomeText() {
    // var wordsArr = lang_introduction.split(/\s+/);
    var originalText = lang_introduction;
    var homeTextElement = document.getElementById("intro");
    var typeClassMap = {
        'soft': 'highlight1',
        'hard': 'highlight2',
        'tech': 'highlight3',
    }
    var fullRegex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gmu;

    var urlStr = "./data/data-skills.json";

    $.ajax({
        method: "GET",
        url: urlStr,
        // headers: {
        //     "Authorization": "Bearer " + constant_accessToken
        // },
        contentType: "application/json",
        dataType: "json",
        cache: false,
        timeout: 600000
    }).done(function (data) {
        if (data) {
            var jsonObj = data;
            var objCount = Object.keys(jsonObj).length;
            if (objCount > 0) {
                data.forEach(item => {
                    const name = item.name;
                    const regex = new RegExp(name, 'gi'); // 'gi' for global case-insensitive matching

                    if (regex.test(lang_introduction)) {
                        const replacementClass = typeClassMap[item.type];
                        if (replacementClass) {
                            const replacement = `<span class="${replacementClass}">${name}</span>`;
                            originalText = originalText.replace(regex, replacement);
                        }
                    }
                });
                homeTextElement.innerHTML = originalText;
                // $('#intro').html(formattedText);
            }
        }
    }).fail(function (xhr, status, error) {
    });
}


//#region Resume
function toggleAccordionCard(sectionId, isExpanded) {
    var accordionElements = $(`[id^="${sectionId}"] .card-accordion`);
    for (var i = 0; i < accordionElements.length; i++) {
        if (isExpanded == 0) {
            accordionElements[i].classList.add('active');
            $(`#${sectionId} .card`).addClass('card-focus');
        } else {
            accordionElements[i].classList.remove('active');
            $(`#${sectionId} .card.card-focus`).removeClass('card-focus');
        }
    }

    const buttonText = (isExpanded == 1) ? lang_expand_all : lang_collapse_all;
    const buttonValue = (isExpanded == 1) ? 0 : 1;
    $(`#${sectionId} .collapseExpandBtn`).html(buttonText).val(buttonValue);
}

function expandAccordionCard(elementId, sectionId) {
    // Make sure only 1 is expanded at all times.
    // var expandedElements = document.querySelectorAll(".df-modal-accordion.active");
    // var clickedElement = document.getElementById(elementId);
    // if (expandedElements.length == 0) {
    //   clickedElement.classList.add("active");
    // } else {
    //   if (!clickedElement.classList.contains("active")) {
    //     expandedElements.forEach(el => {
    //       el.classList.remove('active');
    //     });
    //     clickedElement.classList.add("active");
    //     // console.log("expand");
    //   } else {
    //     expandedElements.forEach(el => {
    //       el.classList.remove('active');
    //     });
    //     // console.log("collapse");
    //   }
    // }
    var clickedElement = document.getElementById(elementId);
    var parentElement = clickedElement.parentElement.parentElement;

    if (clickedElement.classList.contains('active')) {
        clickedElement.classList.remove('active');
        parentElement.classList.remove('card-focus');
    } else {
        clickedElement.classList.add("active");
        parentElement.classList.add('card-focus');
    }

    // var accordionIdPrefix = elementId.substring(0, elementId.length - 2);
    var expandedElements = document.querySelectorAll(`[id^="${sectionId}"] .card-accordion.active`).length;
    // var totalElements = document.querySelectorAll(`[id^="${accordionIdPrefix}"]`).length;

    if (expandedElements == 0) {
        $(`#${sectionId} .collapseExpandBtn`).html(lang_expand_all);
        $(`#${sectionId} .collapseExpandBtn`).val(0);
    } else {
        $(`#${sectionId} .collapseExpandBtn`).html(lang_collapse_all);
        $(`#${sectionId} .collapseExpandBtn`).val(1);
    }
}

function loadWorkExperience() {
    $('.collapseExpandBtn').html(lang_expand_all);

    var urlStr = "./data/data-pastJobs.json";

    $.ajax({
        method: "GET",
        url: urlStr,
        // headers: {
        //     "Authorization": "Bearer " + constant_accessToken
        // },
        contentType: "application/json",
        dataType: "json",
        cache: false,
        timeout: 600000
    }).done(function (data) {
        if (data) {
            var jsonObj = data;
            if (jsonObj && Object.keys(jsonObj).length > 0) {
                var contentSectionId = "workExperienceContent";
                var timelineSectionId = "workTimeline";
                var prevYear = "";

                for (i in jsonObj) {
                    var id = jsonObj[i].id;
                    var year = jsonObj[i].year;
                    var title = jsonObj[i].title;
                    var company = jsonObj[i].company;
                    var period = jsonObj[i].period;
                    var description = jsonObj[i].description;
                    var printable = jsonObj[i].printable;
                    var multi_desc = description.reduce((count, current) => current.department, 0);

                    // Right Timeline
                    var rightContainerObj = $("<div>", {
                        class: "timeline-card-container card-right"
                    }).prependTo($(`#${timelineSectionId}`));

                    var timelineYear = $("<div>", {
                        id: "year-" + id,
                        class: "even-row timeline-node-year",
                        html: year,
                    }).appendTo(rightContainerObj);
                    if (prevYear == year) {
                        $(`#year-${parseInt(id) - 1}`).remove();
                    }
                    prevYear = year;

                    var cardObj = $("<div>", {
                        class: "card",
                    }).appendTo(rightContainerObj);

                    var headerRow = $("<div>", {
                        class: "card-header-row card-accordion",
                        id: "experienceAccordion-" + i,
                        onclick: `expandAccordionCard('experienceAccordion-${i}', '${contentSectionId}')`
                    }).appendTo(cardObj);

                    var headerRow1 = $("<div>", {
                        class: "card-row",
                    }).appendTo(headerRow);
                    var cardJobTitle = $("<span>", {
                        class: "card-title ",
                        html: title
                    }).appendTo($(headerRow1));
                    var downIcon = $("<i>", {
                        class: "fa-chevron-down accordionIcon-" + i
                    }).appendTo(headerRow1);
                    var upIcon = $("<i>", {
                        class: "fa-chevron-up accordionIcon-" + i
                    }).appendTo(headerRow1);

                    var headerRow2 = $("<div>", {
                        class: "card-row",
                    }).appendTo(headerRow);
                    var cardCompany = $("<p>", {
                        class: "card-company",
                        html: company
                    }).appendTo(headerRow2);

                    var headerRow3 = $("<div>", {
                        class: "card-row",
                    }).appendTo(headerRow);
                    var cardWorkPeriod = $("<p>", {
                        class: "small card-period",
                        html: period
                    }).appendTo(headerRow3);

                    var bodyRow = $("<div>", {
                        class: "card-body-row card-accordion-content",
                    }).appendTo(cardObj);

                    if (multi_desc == undefined) {
                        var descStr = "";
                        var cardDescriptionContainer = $("<div>", {
                            class: "card-description ",
                        }).appendTo(bodyRow);
                        for (h in description) {
                            var cardDescription = $("<li>", {
                                html: description[h]
                            }).appendTo(cardDescriptionContainer);
                        }
                    } else {
                        var descriptionObj = description;
                        for (i in descriptionObj) {
                            var dept = description[i].department;
                            var deptPeriod = description[i].period;
                            var scopeObj = description[i].scope;
                            var awardsArr = description[i].awards;

                            var awardStr = "";
                            var descStr = "";

                            if (i == descriptionObj.length - 1) {
                                var cardDescriptionContainer = $("<div>", {
                                    class: "card-description ",
                                }).appendTo(bodyRow);
                            } else {
                                var cardDescriptionContainer = $("<div>", {
                                    class: "card-description ",
                                    style: "margin-bottom: 40px;"
                                }).appendTo(bodyRow);
                            }

                            var cardDepartment = $("<div>", {
                                class: "section-label",
                                html: dept
                            }).appendTo($(cardDescriptionContainer));
                            if (awardsArr.length > 0 && awardsArr != "") {
                                var awardsLabel = $("<div>", {
                                    class: "awards-list",
                                }).appendTo(cardDescriptionContainer);
                                for (j in awardsArr) {
                                    var cardAwards = $("<p>", {
                                        html: awardsArr[j] + "<br/>"
                                    }).appendTo(awardsLabel);
                                }
                            }

                            for (k in scopeObj) {
                                var cardDescription = $("<li>", {
                                    html: scopeObj[k]
                                }).appendTo(cardDescriptionContainer);
                            }
                        }
                    }
                }
            }

        }
    }).fail(function (xhr, status, error) {
    });
}

function loadCertifications() {
    var urlStr = "./data/data-certifications.json";

    $.ajax({
        method: "GET",
        url: urlStr,
        // headers: {
        //     "Authorization": "Bearer " + constant_accessToken
        // },
        contentType: "application/json",
        dataType: "json",
        cache: false,
        timeout: 600000
    }).done(function (data) {
        if (data) {
            var jsonObj = data;
            if (jsonObj && Object.keys(jsonObj).length > 0) {
                var contentSectionId = "certificationContent";
                var sortedArr = sortDescByKey(jsonObj, 'year');
                var currentYear = 0;

                for (i in sortedArr) {
                    var title = sortedArr[i].title;
                    var year = sortedArr[i].year;
                    var url = sortedArr[i].url;

                    if (parseInt(year) != parseInt(currentYear)) {
                        currentYear = parseInt(year);
                        var yearRow = $('<div>', {
                            class: "sub-header-year",
                            html: currentYear,
                            id: currentYear
                        }).appendTo($(`#${contentSectionId}`));
                    }
                    var row = $('<div>', {
                        class: "cert-list",
                    }).appendTo(`#${currentYear}`);
                    if (url != "" && url != null) {
                        var item = $('<a>', {
                            class: "clickable",
                            html: title,
                            href: url
                        }).appendTo(row);
                    } else {
                        var item = $('<a>', {
                            html: title,
                            href: url
                        }).appendTo(row);
                    }
                }
            }
        }
    }).fail(function (xhr, status, error) {
    });
}
function loadEducation() {
    $('.collapseExpandBtn').html(lang_expand_all);

    var urlStr = "./data/data-education.json";

    $.ajax({
        method: "GET",
        url: urlStr,
        // headers: {
        //     "Authorization": "Bearer " + constant_accessToken
        // },
        contentType: "application/json",
        dataType: "json",
        cache: false,
        timeout: 600000
    })
        .done(function (data) {
            if (data) {
                var jsonObj = data;
                if (jsonObj && Object.keys(jsonObj).length > 0) {
                    var contentSectionId = "educationContent";
                    var timelineSectionId = "educationTimeline";
                    var prevYear = "";

                    for (i in jsonObj) {
                        var id = jsonObj[i].id;
                        var year = jsonObj[i].year;
                        var title = jsonObj[i].title;
                        var school = jsonObj[i].school;
                        var period = jsonObj[i].period;
                        var descriptionObj = jsonObj[i].description;
                        var printable = jsonObj[i].printable;
                        var project_id = jsonObj[i].project_id;
                        var project_name = jsonObj[i].project_name;

                        // Right Timeline
                        var rightContainerObj = $("<div>", {
                            class: "timeline-card-container card-right"
                        }).prependTo($(`#${timelineSectionId}`));

                        var timelineYear = $("<div>", {
                            id: "year-" + id,
                            class: "even-row timeline-node-year",
                            html: year,
                        }).appendTo(rightContainerObj);
                        if (prevYear == year) {
                            $(`#year-${parseInt(id) - 1}`).remove();
                        }
                        prevYear = year;

                        var cardObj = $("<div>", {
                            class: "card",
                        }).appendTo(rightContainerObj);

                        var headerRow = $("<div>", {
                            class: "card-header-row card-accordion",
                            id: "educationAccordion-" + i,
                            onclick: `expandAccordionCard('educationAccordion-${i}', '${contentSectionId}')`
                        }).appendTo(cardObj);

                        var headerRow1 = $("<div>", {
                            class: "card-row",
                        }).appendTo(headerRow);
                        var cardJobTitle = $("<span>", {
                            class: "card-title ",
                            html: title
                        }).appendTo(headerRow1);
                        var downIcon = $("<i>", {
                            class: "fa-chevron-down accordionIcon-" + i
                        }).appendTo(headerRow1);
                        var upIcon = $("<i>", {
                            class: "fa-chevron-up accordionIcon-" + i
                        }).appendTo(headerRow1);

                        var headerRow2 = $("<div>", {
                            class: "card-row",
                        }).appendTo(headerRow);
                        var cardCompany = $("<p>", {
                            class: "card-company",
                            html: school
                        }).appendTo($(headerRow2));

                        var headerRow3 = $("<div>", {
                            class: "card-row",
                        }).appendTo(headerRow);
                        var cardPeriod = $("<p>", {
                            class: "small card-period",
                            html: period
                        }).appendTo(headerRow3);

                        var bodyRow = $("<div>", {
                            class: "card-body-row card-accordion-content",
                        }).appendTo(cardObj);

                        for (i in descriptionObj) {
                            var label = descriptionObj[i].title;
                            var descArr = descriptionObj[i].description;

                            var cardDescriptionContainer = $("<div>", {
                                class: "card-description ",
                            }).appendTo($(bodyRow));
                            if (label != "") {
                                var cardDepartment = $("<p>", {
                                    class: "section-label",
                                    html: label
                                }).appendTo(cardDescriptionContainer);
                            }

                            for (j in descArr) {
                                var cardDescription = $("<li>", {
                                    html: descArr[j]
                                }).appendTo(cardDescriptionContainer);
                            }
                        }
                    }
                }
            }
        })
        .fail(function (xhr, status, error) {
        });
}

function loadSkills() {
    var targetId = "skillWordCloud";
    var urlStr = "./data/data-skills.json";

    keywordWordCloudRoot = am5.Root.new(targetId);
    keywordWordCloudRoot.setThemes([am5themes_Animated.new(keywordWordCloudRoot)]);

    // Word Cloud Wrapper
    var container = keywordWordCloudRoot.container.children.push(am5.Container.new(keywordWordCloudRoot, {
        width: am5.percent(100),
        height: am5.percent(100),
        // layout: root.verticalLayout
        // layout: root.horizontalLayout      
    }));

    // Chart Data
    var series = container.children.push(am5wc.WordCloud.new(keywordWordCloudRoot, {
        categoryField: "name",
        valueField: "weight",
        minFontSize: 22,
        calculateAggregates: true // for heat rules to work,
    }));

    // Chart Label
    // var title = container.children.push(am5.Label.new(keywordWordCloudRoot, {
    //     text: title,
    //     fontSize: 22,
    //     // fontWeight: 400,
    //     fontFamily: "Oracle Sans Semi Bold",
    //     fill: am5.color(0x3d3d3d),
    //     x: am5.percent(50),
    //     y: am5.percent(0),
    //     centerX: am5.percent(50)
    // }));

    // Words
    series.labels.template.setAll({
        padding: 5,
        // fontFamily: "Oracle Sans",
        minFontSize: am5.percent(50),
        // fill: am5.color(0x3b82f6),
        // cursorOverStyle: "pointer"
    });

    $.ajax({
        method: "GET",
        url: urlStr,
        // headers: {
        //     "Authorization": "Bearer " + constant_accessToken
        // },
        contentType: "application/json",
        dataType: "json",
        cache: false,
        timeout: 600000
    }).done(function (data) {
        if (data) {
            var jsonObj = data;
            var objCount = Object.keys(jsonObj).length;
            if (objCount > 0) {
                var words = jsonObj;

                if (words.length == 0) {
                    var noDataTitle = container.children.push(am5.Label.new(keywordWordCloudRoot, {
                        text: lang_no_results,
                        fontSize: 22,
                        // fontWeight: 400,
                        // fontFamily: "Oracle Sans ",
                        fill: am5.color(0x5f5f5f),
                        x: am5.percent(50),
                        y: am5.percent(50),
                        centerX: am5.percent(50)
                    }));
                } else {
                    // series.labels.template.events.on("click", function (ev) {
                    //     // console.log("Clicked on:", ev.target);
                    //     console.log("Clicked on:", ev.target.dataItem.get("category"));
                    //     console.log("hover item:", ev.target.dataItem.get("value"));
                    // });

                    // series.labels.template.set("tooltipText", "{category}: [bold]{value}[/]");

                    // series.animate({
                    //     key: "startAngle",
                    //     to: 180,
                    //     loops: Infinity,
                    //     duration: 2000,
                    //     easing: am5.ease.yoyo(am5.ease.cubic)
                    // });

                    series.set("heatRules", [{
                        target: series.labels.template,
                        dataField: "value",
                        min: am5.color(0x000000),
                        max: am5.color(0x3b82f6),
                        key: "fill",
                        // minFontSize: am5.percent(50)
                    }]);

                    series.data.setAll(words);
                }
                // }
            } else {
                var noDataTitle = container.children.push(am5.Label.new(keywordWordCloudRoot, {
                    text: lang_no_results,
                    fontSize: 22,
                    // fontWeight: 400,
                    // fontFamily: "Oracle Sans ",
                    fill: am5.color(0x5f5f5f),
                    x: am5.percent(50),
                    y: am5.percent(50),
                    centerX: am5.percent(50)
                }));
            }
        }
    }).fail(function (xhr, status, error) {
    });
}

//#endregion Resume

//#region Projects
function loadProjects() {
    var items = document.querySelectorAll(".left-nav-item");
    items.forEach((item, index) => {
        item.addEventListener("click", e => {
            handleLeftNavIndicator(e.target);
            expandProjectAccordion(e.target.id);
        });
        item.classList.contains("active") && handleLeftNavIndicator(item);
    });

    document.getElementById('mysimBtn').click();
}
function handleLeftNavIndicator(el) {
    var items = document.querySelectorAll(".left-nav-item");
    var indicator = document.querySelector(".vertical-nav-indicator");
    items.forEach(item => {
        item.classList.remove("active");
        item.removeAttribute("style");
    });

    // indicator.style.height = `${el.offsetHeight}px`;
    indicator.style.height = `50%`;
    // indicator.style.top = `1%`;
    indicator.style.top = `${el.offsetTop}px`;
    el.classList.add("active");
}
function expandProjectAccordion(buttonId) {
    var elementId = buttonId.substring(0, buttonId.length - 3);
    var elements = document.querySelector(".project-content.active");
    if (elements != null) {
        $('.project-content.active').slideUp(200, function () {
            $('.project-content.active').removeClass('active');
            $('#' + elementId + 'Section').addClass('active');
            $('#' + elementId + 'Section').slideDown(1000);
        });
    } else {
        $('#' + elementId + 'Section').addClass('active');
        $('#' + elementId + 'Section').slideDown(1000);
    }
}
//#endregion Projects

//#region Photography
function getFlickr() {
    var iframe = document.querySelector("#embeddedFlickr iframe");
    var elmnt = iframe.contentWindow.document.getElementsByTagName("a");
    // var photos = iframe.contentWindow.document.querySelectorAll(".flickr-embed .flickr-embed-photo > a");
    var photos = iframe.contentWindow.document.querySelectorAll("a.slide");
    for (var i = 0; i < photos.length; i++) {
        var node = photos[i];
        var img = node.querySelector("img");
        img.removeAttribute('onload');
        $("#photoAlbumContainer").append(node.cloneNode(true));

        // var imgWrapper = $("<div>", { 
        //     class: "img-container", 
        // }).appendTo("#photoAlbumContainer"); 
        // imgWrapper.append(node.cloneNode(true));
    }

    $("#loader-container").hide();
}
//#endregion Photography