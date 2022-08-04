document.addEventListener('DOMContentLoaded', function () {
    // inputmask
    Inputmask().mask(document.querySelectorAll('input'))

    // height 100vh fix for IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // height header
    const header = document.getElementById('header')
    let headerh = header ? header.getBoundingClientRect().height : 0;

    document.documentElement.style.setProperty('--headerh', `${headerh}px`);

    // resize
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        let headerh = header ? header.getBoundingClientRect().height : 0;
        
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--headerh', `${headerh}px`);
    });
    
    // textarea
    document.querySelectorAll('textarea').forEach(el => {
        el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
        el.classList.add('auto');
        el.addEventListener('input', e => {
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight) + 'px';
        });
    });
    
    // slim select
    const allSelect = document.querySelectorAll('.select')

    if (allSelect) {
        allSelect.forEach(item => {
            new SlimSelect({
                select: item
            });
        })
    }
    
    // smooth scroll
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // smooth scroll on all links
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                if (item.getAttribute('href').length > 1) {
                    smoothScroll(item.getAttribute('href').slice(1))
                }
            })
        })
    }
    
    // mobile menu
    const hamburger = document.getElementById('hamburger-toggle')
    const mobileMenu = document.getElementById('mobile-menu')

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            if (!mobileMenu.classList.contains('mobile-menu--active')) {
                header.classList.add('header--menu')
                hamburger.classList.add('hamburger--active')
                mobileMenu.classList.add('mobile-menu--active')
                document.body.classList.add('scroll-disabled')
            } else {
                header.classList.remove('header--menu')
                hamburger.classList.remove('hamburger--active')
                mobileMenu.classList.remove('mobile-menu--active')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }
    
    // slides up/down/toggle
    let slideUpQna = (target, duration = 400) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.previousElementSibling.style.pointerEvents = 'none';
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.previousElementSibling.style.pointerEvents = 'auto';
        }, duration);
        target.parentNode.classList.remove('is--open');
    }

    let slideDownQna = (target, duration = 400) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.previousElementSibling.style.pointerEvents = 'none';
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.previousElementSibling.style.pointerEvents = 'auto';
        }, duration);
        target.parentNode.classList.add('is--open');
    }

    let slideToggleQna = (target, duration = 400) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDownQna(target, duration);
        } else {
            return slideUpQna(target, duration);
        }
    }

    // accordeon
    const accordeonTrigger = document.querySelectorAll('.c-accordeon__trigger')
    const mobileMenuAccordeonTrigger = document.querySelectorAll('.mobile-menu__dropdown')
    const footerAccordeonTrigger = document.querySelectorAll('.footer__heading')

    if (accordeonTrigger) {
        accordeonTrigger.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (!item.parentNode.classList.contains('is--open')) {
                    slideDownQna(item.nextElementSibling)
                } else {
                    slideUpQna(item.nextElementSibling)
                }
            })
        })
    }

    if (footerAccordeonTrigger && window.innerWidth < 768) {
        footerAccordeonTrigger.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (!item.parentNode.classList.contains('is--open')) {
                    slideDownQna(item.nextElementSibling)
                } else {
                    slideUpQna(item.nextElementSibling)
                }
            })
        })
    }

    if (mobileMenuAccordeonTrigger) {
        mobileMenuAccordeonTrigger.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const parent = item.closest('.mobile-menu__item')
                const submenu = parent.querySelector('.mobile-menu__submenu')

                if (!parent.classList.contains('is--open')) {
                    slideDownQna(submenu)
                } else {
                    slideUpQna(submenu)
                }
            })
        })
    }

    // tabs
    const mediaTabsItems = document.querySelectorAll('.media-tabs__item')
    const projectsTabsItems = document.querySelectorAll('.projects-tabs__item')
    const newsTabsItems = document.querySelectorAll('.news-tabs__item')
    const lkTabsItems = document.querySelectorAll('.lk-tabs__item:not(.lk-tabs__item--no-tab)')

    if (mediaTabsItems) {
        mediaTabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.media-tabs__item').forEach((child) => child.classList.remove('media-tabs__item--active'))
                document.querySelectorAll('.media-tabs__wrapper').forEach((child) => child.classList.remove('media-tabs__wrapper--active'))
    
                item.classList.add('media-tabs__item--active')
                document.querySelectorAll('.media-tabs__wrapper')[i].classList.add('media-tabs__wrapper--active')
            })
        })
    }

    if (projectsTabsItems) {
        projectsTabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.projects-tabs__item').forEach((child) => child.classList.remove('projects-tabs__item--active'))
                document.querySelectorAll('.projects-tabs__wrapper').forEach((child) => child.classList.remove('projects-tabs__wrapper--active'))
    
                item.classList.add('projects-tabs__item--active')
                document.querySelectorAll('.projects-tabs__wrapper')[i].classList.add('projects-tabs__wrapper--active')
            })
        })
    }

    if (newsTabsItems) {
        newsTabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.news-tabs__item').forEach((child) => child.classList.remove('news-tabs__item--active'))
                document.querySelectorAll('.news-tabs__wrap').forEach((child) => child.classList.remove('news-tabs__wrap--active'))
    
                item.classList.add('news-tabs__item--active')
                document.querySelectorAll('.news-tabs__wrap')[i].classList.add('news-tabs__wrap--active')
            })
        })
    }

    if (lkTabsItems) {
        lkTabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.lk-tabs__item').forEach((child) => child.classList.remove('lk-tabs__item--active'))
                document.querySelectorAll('.lk-tabs__wrap').forEach((child) => child.classList.remove('lk-tabs__wrap--active'))
    
                item.classList.add('lk-tabs__item--active')
                document.querySelectorAll('.lk-tabs__wrap')[i].classList.add('lk-tabs__wrap--active')
            })
        })
    }

    // subscribe news
    const subscribeNews = document.querySelector('.subscribe-news')
    const subscribeNewsClose = document.querySelector('.subscribe-news__close')

    if (subscribeNewsClose) {
        subscribeNewsClose.addEventListener('click', (event) => {
            event.preventDefault()

            subscribeNews.classList.add('subscribe-news--hidden')
        })
    }

    // likes
    const likes = document.querySelectorAll('.c-like')

    if (likes) {
        likes.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (item.classList.contains('c-like--liked')) {
                    item.classList.remove('c-like--liked')
                } else {
                    item.classList.add('c-like--liked')
                }
            })
        })
    }

    // support idea likes
    const supportIdeaLikes = document.querySelectorAll('.c-support-idea__btn')

    if (supportIdeaLikes) {
        supportIdeaLikes.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (item.classList.contains('c-support-idea__btn--liked')) {
                    item.classList.remove('c-support-idea__btn--liked')
                } else {
                    item.classList.add('c-support-idea__btn--liked')
                }
            })
        })
    }

    // lk nav select
    const selected = document.querySelector('.lk-select-nav__current')

    const useItemChecker = (els, onClickOutside) => {
        const checkBodyClick = (e) => {
            let currentEl = e.target;

            while (currentEl) {
                if (els.includes(currentEl)) break;
                currentEl = currentEl.parentNode
            }

            if (!currentEl) {
                onClickOutside()
                removeBodyChecker()
            }
        }
        function setBodyChecker  ()  {
            document.documentElement.addEventListener('click', checkBodyClick)
        }
        function removeBodyChecker ()  {
            document.documentElement.removeEventListener('click', checkBodyClick)
        }
        return {setBodyChecker, removeBodyChecker}
    }
    
    if (selected) {
        const close = () => {
            selected.closest('.lk-select-nav').classList.remove('lk-select-nav--active')
        }
        const itemChecker = useItemChecker([selected.parentNode], close)

        selected.addEventListener('click', (event) => {
            event.preventDefault()

            const parent = selected.closest('.lk-select-nav')

            if (parent.classList.contains('lk-select-nav--active')) {
                parent.classList.remove('lk-select-nav--active')
            }
            else {
                parent.classList.add('lk-select-nav--active')
                itemChecker.setBodyChecker()
            }
        })
    }

    // chat
    const chat = document.querySelector('.chat__wrapper .simplebar-content')
    const chatAttach = document.querySelector('.chat-file__input')
    const chatInput = document.querySelector('.chat__input')
    const chatSendBtn = document.querySelector('.chat__send')
    const chatFiles = document.querySelector('.chat__files')

    function handleButtonClick() {
        chat.scrollIntoView({block: "end"});
    }

    if (chat) {
        handleButtonClick()
    }

    if (chatInput) {
        function chatBtnVision() {
            if (chatInput.value.length > 0) {
                chatSendBtn.classList.add('chat__send--visible')
            } else {
                chatSendBtn.classList.remove('chat__send--visible')
            }
        }
    
        chatBtnVision()

        chatInput.addEventListener('input', (event) => {
            event.preventDefault()

            chatBtnVision()
        })
    }

    if (chatAttach) {
        chatAttach.addEventListener('change', (event) => {
            event.preventDefault()
            
            if ('files' in chatAttach) {
                if (chatAttach.files.length == 0) {
                    txt = "Файл не выбран";
                } else {
                    for (let i = 0; i < chatAttach.files.length; i++) {
                        let file = chatAttach.files[i];
                        if ('name' in file) {
                            chatFiles.querySelector('.return-file__value').innerHTML = file.name
                        }
                    }
                }
            }

            chatFiles.classList.add('return-file--active')
        })
    }

    // flatpickr
    if (document.querySelectorAll('.datepickr')) {
        document.querySelectorAll('.datepickr').forEach(item => {
            flatpickr(item, {
                dateFormat: 'd.m.Y',
                'locale': 'ru',
            });
        })
    }
    
    // input file
    const inputFile = document.querySelector('.add-file__input')
    const inputFileReturn = document.querySelector('.return-file')
    const inputFileReturnDelete = document.querySelector('.return-file__delete')

    if (inputFile) {
        inputFile.addEventListener('change', (event) => {
            event.preventDefault()
            
            if ('files' in inputFile) {
                if (inputFile.files.length == 0) {
                    txt = "Файл не выбран";
                } else {
                    for (let i = 0; i < inputFile.files.length; i++) {
                        let file = inputFile.files[i];
                        if ('name' in file) {
                            inputFileReturn.querySelector('.return-file__value').innerHTML = file.name
                        }
                    }
                }
            }

            inputFile.closest('.add-file').classList.add('add-file--hidden')
            inputFileReturn.classList.add('return-file--active')
        })
    }

    if (inputFileReturnDelete) {
        inputFileReturnDelete.addEventListener('click', (event) => {
            event.preventDefault()

            if (inputFile) {
                inputFile.closest('.add-file').classList.remove('add-file--hidden')
            }
            
            inputFileReturn.querySelector('.return-file__value').innerHTML = ''
            inputFileReturn.classList.remove('return-file--active')
        })
    }

    // image upload
    const imageUpload = document.querySelectorAll('.c-add-photo__input')

    function ImageSetter(input, target) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                target.setAttribute('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    if (imageUpload) {
        imageUpload.forEach(item => {
            item.addEventListener('change', (event) => {
                event.preventDefault()
        
                const image = item.closest('.c-add-photo').querySelector('.c-add-photo__image > img')
    
                item.closest('.c-add-photo').classList.add('c-add-photo--uploading')
                ImageSetter(item, image)
            });
        })
    }

    // communities hover
    const communitiesBlocks = document.querySelectorAll('.communities__block')
    const communitiesImages = document.querySelectorAll('.communities__preview > img')

    if (communitiesBlocks) {
        communitiesBlocks.forEach((item, i) => {
            item.addEventListener('mouseover', (event) => {
                event.preventDefault()

                document.querySelectorAll('.communities__preview > img').forEach((child) => child.style.opacity = '0')
                document.querySelectorAll('.communities__preview > img')[i].style.opacity = '1'
            })
        })
    }

    // lk nav dropdown
    const lkNavDropdown = document.querySelectorAll('.lk-nav__link--dropdown')

    if (lkNavDropdown) {
        lkNavDropdown.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const parent = item.closest('.lk-nav__item')
                const submenu = parent.querySelector('.lk-nav__submenu')

                if (submenu.classList.contains('lk-nav__submenu--active')) {
                    item.classList.remove('is-active')
                    submenu.classList.remove('lk-nav__submenu--active')
                } else {
                    item.classList.add('is-active')
                    submenu.classList.add('lk-nav__submenu--active')
                }
            })
        })
    }

    // questionnaire
    const questionnaireImage = document.querySelector('.questionnaire__image')
    const questionnaireBtn = document.querySelectorAll('.questionnaire-form__btn')
    const questionnaireBackBtn = document.querySelectorAll('.questionnaire-form__back')

    if (questionnaireBtn) {
        questionnaireBtn.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const parent = item.closest('.questionnaire-form__wrapper')

                parent.classList.remove('questionnaire-form__wrapper--active')
                parent.nextElementSibling.classList.add('questionnaire-form__wrapper--active')

                if (questionnaireImage.classList.contains('questionnaire__image--hidden')) {
                    questionnaireImage.classList.remove('questionnaire__image--hidden')
                }
            })
        })
    }

    if (questionnaireBackBtn) {
        questionnaireBackBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const parent = item.closest('.questionnaire-form__wrapper')

                parent.classList.remove('questionnaire-form__wrapper--active')
                parent.previousElementSibling.classList.add('questionnaire-form__wrapper--active')

                if (i === 0 && !questionnaireImage.classList.contains('questionnaire__image--hidden')) {
                    questionnaireImage.classList.add('questionnaire__image--hidden')
                }
            })
        })
    }

    // poll
    const pollCheckbox = document.querySelectorAll('.poll-checkbox')
    const pollCancel = document.querySelectorAll('.poll-link--cancel')
    
    if (pollCheckbox) {
        pollCheckbox.forEach((item) => {
            item.addEventListener('click', () => {
                
                const parent = item.closest('.poll-vision')
                const parentWrapper = item.closest('.poll-wrapper')

                if (parent && parentWrapper) {
                    parent.classList.add('poll-vision--active')
                    parentWrapper.querySelector('.poll-link--results').classList.add('poll-link--hidden')
                    parentWrapper.querySelector('.poll-link--cancel').classList.remove('poll-link--hidden')
                }
            })
        })
    }

    if (pollCancel) {
        pollCancel.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const parentWrapper = item.closest('.poll-wrapper')
                const parent = parentWrapper.querySelector('.poll-vision')

                if (parent && parentWrapper) {
                    parent.classList.remove('poll-vision--active')
                    parentWrapper.querySelector('.poll-link--results').classList.remove('poll-link--hidden')
                    parentWrapper.querySelector('.poll-link--cancel').classList.add('poll-link--hidden')
                }
    
                parent.querySelectorAll('.poll-checkbox__input').forEach(item => item.checked = false)
            })
        })
    }

    // popup
    const popupBtn = document.querySelectorAll('.popup-btn')
    const popup = document.querySelectorAll('.popup')
    const popupClose = document.querySelectorAll('.popup__close')
    const popupOverlay = document.querySelector('.popup-overlay')
    
    if (popupBtn) {
        popupBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                document.querySelectorAll('.popup.popup--active').forEach((child) => child.classList.remove('popup--active'))
                if (!popupOverlay.classList.contains('popup-overlay--active')) {
                    popupOverlay.classList.add('popup-overlay--active')
                }
                document.body.classList.add('scroll-disabled')

                const popupID = item.dataset.id
                document.getElementById(popupID).classList.add('popup--active')
            });
        });
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', () => {
            if (popup && popupOverlay.classList.contains('popup-overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.popup.popup--active').forEach((child) => child.classList.remove('popup--active'))
                popupOverlay.classList.remove('popup-overlay--active')
            }
        });
    }

    if (popupClose) {
        popupClose.forEach((item) => {
            item.addEventListener('click', () => {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.popup.popup--active').forEach((child) => child.classList.remove('popup--active'))
                popupOverlay.classList.remove('popup-overlay--active')
            });
        });
    }

    // auth popup
    const authPopupBtn = document.querySelectorAll('.auth-popup-btn')
    const authPopupClose = document.querySelectorAll('.auth-popup__close, .auth-popup__btn--close')
    
    if (authPopupBtn) {
        authPopupBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                document.querySelectorAll('.auth-popup.auth-popup--active').forEach((child) => child.classList.remove('auth-popup--active'))
                document.body.classList.add('scroll-disabled')

                const popupID = item.dataset.id
                document.getElementById(popupID).classList.add('auth-popup--active')
            });
        });
    }

    if (authPopupClose) {
        authPopupClose.forEach((item) => {
            item.addEventListener('click', () => {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.auth-popup.auth-popup--active').forEach((child) => child.classList.remove('auth-popup--active'))
            });
        });
    }

    // input code
    const inputElements = [...document.querySelectorAll('.input-control__input--code')]

    inputElements.forEach((item, i) => {
        item.addEventListener('keydown', (event) => {
            if (event.keyCode === 8 && event.target.value === '') {
                inputElements[Math.max(0, i - 1)].focus()
            }
        })
        item.addEventListener('input', (event) => {
            const [first,...rest] = event.target.value
            event.target.value = first ?? ''
            const lastInputBox = i === inputElements.length - 1 // последний ынпут
            const insertedContent = first !== undefined
            
            if (insertedContent && !lastInputBox) {
                inputElements[i + 1].focus()
                inputElements[i + 1].value = rest.join('')
                inputElements[i + 1].dispatchEvent(new Event('input'))
            }
        })
    })

    // quill redactor (editor)
    const allEditor = document.querySelectorAll('.editor')

    if (allEditor) {
        allEditor.forEach(item => {
            new Quill(item, {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        ['image'],
                        [{ header: [1, 2, 3, false] }],
                    ]
                },
                placeholder: item.dataset.placeholder,
                theme: 'snow'
            });
        })
    }

    // timer
    const authTimeoutClock = document.querySelector('.input-control .timer')
    const ceremonyTimeoutClock = document.querySelector('.c-ceremony .timer')

    if (authTimeoutClock) {
        var dataAuthTimeoutClock = authTimeoutClock.dataset.timeout
        var icInt = {};

        function initializeClock(target, distance, callback) {
            if(icInt[target] != null) clearInterval(icInt[target]);
            
            var elem = document.querySelector(target),
                now = 0,
                finishDistance = distance;

            icInt[target] = setInterval(function() {

                var distance = (finishDistance - now);

                if (distance > 0) {
                    elem.innerHTML = distance;
                } else {
                    const parent = authTimeoutClock.parentNode
                    const link = authTimeoutClock.parentNode.nextElementSibling
                    
                    elem.innerHTML = distance;

                    if (parent.classList.contains('input-control__text')) {
                        parent.classList.add('input-control__text--hidden')
                    }
                    if (link.classList.contains('input-control__link')) {
                        link.classList.remove('input-control__link--hidden')
                    }
                }
                
                now++;
                
                if (distance < 0) {
                    clearInterval(icInt[target]);
                    if(typeof callback == "function") callback();
                }
            }, 1000);
        }

        initializeClock('.input-control .timer', dataAuthTimeoutClock)
    }

    if (ceremonyTimeoutClock) {
        var dataCeremonyTimeoutClock = ceremonyTimeoutClock.dataset.timeout
        var icInt = {};

        function initializeClock(target, distance, callback) {
            if(icInt[target] != null) clearInterval(icInt[target]);
            
            var elem = document.querySelector(target),
                now = 0,
                finishDistance = distance;

            icInt[target] = setInterval(function() {

                var distance = (finishDistance - now) * 1000;

		        var days = Math.floor(distance/(1000*60*60*24)),
                    hours = Math.floor((distance/(1000*60*60)) % 24),
                    minutes = Math.floor((distance/1000/60) % 60),
                    seconds = Math.floor((distance/1000) % 60);

                var html = [];
                if(days >= 0) html.push('<span class="c-ceremony__value">'+ (days < 10 ? "0" : "") + days +'</span>');
                if(hours >= 0) html.push('<span class="c-ceremony__value">'+ (hours < 10 ? "0" : "") + hours +'</span>');
                if(minutes >= 0) html.push('<span class="c-ceremony__value">'+ (minutes < 10 ? "0" : "") + minutes +'</span>');
                if(seconds >= 0) html.push('<span class="c-ceremony__value">'+ (seconds < 10 ? "0" : "") + seconds +'</span>');

                if(seconds >= 0) elem.innerHTML = html.join("");
                
                now++;
                
                if (distance < 0) {
                    clearInterval(icInt[target]);
                    if(typeof callback == "function") callback();
                }
            }, 1000);
        }

        initializeClock('.c-ceremony .timer', dataCeremonyTimeoutClock)
    }

    // copy link
    const copyBtn = document.querySelectorAll('.media-controls__btn--copy')

    function copyToClipboard(selector) {
        const message = selector.querySelector('.media-controls__message')
        let copyText = selector.dataset.link;

        navigator.clipboard.writeText(copyText).then(() => {
            // Alert the user that the action took place.
            // Nobody likes hidden stuff being done under the hood!
            //alert("Copied to clipboard: " + copyText);
            if (!message.classList.contains('media-controls__message--active')) {
                message.classList.add('media-controls__message--active')

                setTimeout(() => {
                    message.classList.remove('media-controls__message--active')
                }, 1000)
            }
        });
    }

    if (copyBtn) {
        copyBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
    
                copyToClipboard(item)
            })
        })
    }

    // maps list
    const mapsList = document.querySelector('.maps__list')
    const mapsListOpen = document.querySelector('.maps__elem--open')

    if (mapsList && mapsListOpen) {
        mapsListOpen.addEventListener('click', (event) => {
            event.preventDefault()

            mapsList.classList.add('maps__list--open')
            mapsListOpen.classList.add('maps__elem--hidden')
        })
    }

    // maps
    let regions = document.querySelectorAll('.maps__map path');

    var idAarr = ["RU-MOW", "RU-SPE", "RU-NEN", "RU-YAR", "RU-CHE", "RU-ULY", "RU-TYU", "RU-TUL", "RU-SVE", "RU-RYA", "RU-ORL", "RU-OMS", "RU-NGR", "RU-LIP", "RU-KRS", "RU-KGN", "RU-KGD", "RU-IVA", "RU-BRY", "RU-AST", "RU-KHA", "RU-CE", "RU-UD", "RU-SE", "RU-MO", "RU-KR", "RU-KL", "RU-IN", "RU-AL", "RU-BA", "RU-AD", "RU-CR", "RU-SEV", "RU-KO", "RU-KIR", "RU-PNZ", "RU-TAM", "RU-MUR", "RU-LEN", "RU-VLG", "RU-KOS", "RU-PSK", "RU-ARK", "RU-YAN", "RU-CHU", "RU-YEV", "RU-TY", "RU-SAK", "RU-AMU", "RU-BU", "RU-KK", "RU-KEM", "RU-NVS", "RU-ALT", "RU-DA", "RU-STA", "RU-KB", "RU-KC", "RU-KDA", "RU-ROS", "RU-SAM", "RU-TA", "RU-ME", "RU-CU", "RU-NIZ", "RU-VLA", "RU-MOS", "RU-KLU", "RU-BEL", "RU-ZAB", "RU-PRI", "RU-KAM", "RU-MAG", "RU-SA", "RU-KYA", "RU-ORE", "RU-SAR", "RU-VGG", "RU-VOR", "RU-SMO", "RU-TVE", "RU-PER", "RU-KHM", "RU-TOM", "RU-IRK"];
    var idAarr2 = new Array(
    ["RU-MOW",  "Москва", "moscow.gif"],
    ["RU-CHE", "Челябинская область", "chelyabinskaya_flag.png" ],
    ["RU-ORL",  "Орловская область"],
    ["RU-OMS",  "Омская область", "flag_omskoj_oblasti.png"],
    ["RU-LIP",  "Липецкая область", "lipeckya.jpg"],
    ["RU-KRS",  "Курская область", "flag_of_kursk_oblast.png"],
    ["RU-RYA",  "Рязанская область", "ryazan.png"],
    ["RU-BRY",  "Брянская область", "bryanskaya_flag.png"],
    ["RU-KIR",  "Кировская область", "flag_kirovskoy_oblasti.png"],
    ["RU-ARK",  "Архангельская область", ""],
    ["RU-MUR",  "Мурманская область", ""],
    ["RU-SPE",  "Санкт-Петербург", ""],
    ["RU-YAR",  "Ярославская область", ""],
    ["RU-ULY",  "Ульяновская область", ""],
    ["RU-NVS",  "Новосибирская область", ""],
    ["RU-TYU",  "Тюменская область", ""],
    ["RU-SVE",  "Свердловская область", ""],
    ["RU-NGR",  "Новгородская область", ""],
    ["RU-KGN",  "Курганская область", ""],
    ["RU-KGD",  "Калининградская область", ""],
    ["RU-IVA",  "Ивановская область", ""],
    ["RU-AST",  "Астраханская область", ""],
    ["RU-KHA",  "Хабаровский край", ""],
    ["RU-CE",  "Чеченская республика", ""],
    ["RU-UD",  "Удмуртская республика", ""],
    ["RU-SE",  "Республика Северная Осетия", ""],
    ["RU-MO",  "Республика Мордовия", ""],
    ["RU-KR",  "Республика  Карелия", ""],
    ["RU-KL",  "Республика  Калмыкия", ""],
    ["RU-IN",  "Республика  Ингушетия", ""],
    ["RU-AL",  "Республика Алтай", ""],
    ["RU-BA",  "Республика Башкортостан", ""],
    ["RU-AD",  "Республика Адыгея", ""],
    ["RU-CR",  "Республика Крым", ""],
    ["RU-SEV",  "Севастополь", ""],
    ["RU-KO",  "Республика Коми", ""],
    ["RU-PNZ",  "Пензенская область", ""],
    ["RU-TAM",  "Тамбовская область", ""],
    ["RU-LEN",  "Ленинградская область", ""],
    ["RU-VLG",  "Вологодская область", ""],
    ["RU-KOS",  "Костромская область", ""],
    ["RU-PSK",  "Псковская область", ""],
    ["RU-YAN",  "Ямало-Ненецкий Автономный округ", ""],
    ["RU-CHU",  "Чукотский АО", ""],
    ["RU-YEV",  "Еврейская автономская область", ""],
    ["RU-TY",  "Республика Тыва", ""],
    ["RU-SAK",  "Сахалинская область", ""],
    ["RU-AMU",  "Амурская область", ""],
    ["RU-BU",  "Республика Бурятия", ""],
    ["RU-KK",  "Республика Хакасия", ""],
    ["RU-KEM",  "Кемеровская область", ""],
    ["RU-ALT",  "Алтайский край", ""],
    ["RU-DA",  "Республика Дагестан", ""],
    ["RU-KB",  "Кабардино-Балкарская республика", ""],
    ["RU-KC",  "Карачаевая-Черкесская республика", ""],
    ["RU-KDA",  "Краснодарский край", ""],
    ["RU-ROS",  "Ростовская область", ""],
    ["RU-SAM",  "Самарская область", ""],
    ["RU-TA",  "Республика Татарстан", ""],
    ["RU-ME",  "Республика Марий Эл", ""],
    ["RU-CU",  "Чувашская республика", ""],
    ["RU-NIZ",  "Нижегородская край", ""],
    ["RU-VLA",  "Владимировская область", ""],
    ["RU-MOS",  "Московская область", ""],
    ["RU-KLU",  "Калужская область", ""],
    ["RU-BEL",  "Белгородская область", ""],
    ["RU-ZAB",  "Забайкальский край", ""],
    ["RU-PRI",  "Приморский край", ""],
    ["RU-KAM",  "Камачатский край", ""],
    ["RU-MAG",  "Магаданская область", ""],
    ["RU-SA",  "Республика Саха", ""],
    ["RU-KYA",  "Красноярский край", ""],
    ["RU-ORE",  "Оренбургская область", ""],
    ["RU-SAR",  "Саратовская область", ""],
    ["RU-VGG",  "Волгоградская область", ""],
    ["RU-VOR",  "Ставропольский край", ""],
    ["RU-SMO",  "Смоленская область", ""],
    ["RU-TVE",  "Тверская область", ""],
    ["RU-PER",  "Пермская область", ""],
    ["RU-KHM",  "Ханты-Мансийский АО", ""],
    ["RU-KHM",  "Ханты-Мансийский АО", ""],
    ["RU-TOM",  "Томская область", ""],
    ["RU-IRK",  "Иркутская область", ""],
    ["RU-NEN",  "Ненецкий АО", ""],
    ["RU-STA",  "Ставропольский край", ""],
    ["RU-TUL",  "Тульская область", "tulskaya_flag.png"]

    );

    for (let reg of regions) {
        var regId = reg.getAttribute('id');
        var flag = '';
        var regName = '';
        for (var j = 0; j < idAarr2.length; j++) {
            if (regId == idAarr2[j][0]) {
                regName = idAarr2[j][1];
                reg.setAttribute('name', regName);
            }
        }
        reg.onmouseover = reg.onmouseout = indicatorHandler;
    }

    function indicatorHandler(event) {
        let region = event.target;
        
        let indicator = document.querySelector('.indicator');

        if (event.type == 'mouseover') {
            indicator.innerHTML = '';

            if(region.hasAttribute('name')) {
                var name = region.getAttribute('name');
                indicator.innerHTML = '<div>' + name +'</div>';
            }

            indicator.style.top = event.offsetY + 150 + 'px';
            indicator.style.left = event.offsetX + 30 + 'px';
            indicator.style.display = 'block';
        }
        if (event.type == 'mouseout') {
            indicator.style.display = 'none';
        }
    }

    // player
    const audioPlayer = document.querySelector('.player');
    const audioPlayerTimeline = document.querySelector('.player__timeline');
    const audioPlayerProgressBar = document.querySelector('.player__progress');
    const audioPlayerTrackName = document.querySelector('.player__title');
    const audioPlayerCurrentTime = document.querySelector('.player__item--current');
    const audioPlayerTotalTime = document.querySelector('.player__item--length');
    const audioPlayerBackBtn = document.querySelector('.player__control--back');
    const audioPlayerPlayBtn = document.querySelector('.player__control--play');
    const audioPlayerNextBtn = document.querySelector('.player__control--next');
    const mainPodcastsPlayer = document.querySelectorAll('.main-podcasts__play, .main-podcasts__player');
    const podcastsPlayer = document.querySelectorAll('.podcasts__player');
    const podcastsReleasePlayer = document.querySelectorAll('.c-listening');
    let songsList = [];
    let indexAudio = 0;

    function createPlayList(selector) {
        const tracksArray = document.querySelectorAll(selector);
        songsList = [];

        for (let i = 0; i < tracksArray.length; i++) {
            let obj = {};
            obj.id = tracksArray[i].dataset.trackId;
            obj.name = tracksArray[i].dataset.trackName;
            obj.track = tracksArray[i].dataset.trackSrc;
            songsList.push(obj);
        }
    }

    function getTimeCodeFromNum(num) {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;

        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
            seconds % 60
        ).padStart(2, 0)}`;
    }

    function loadNewTrack(index) {
        const player = document.getElementById('source-audio')
        player.src = songsList[index].track
        audioPlayerTrackName.textContent = songsList[index].name
        this.currentAudio = document.getElementById("player-audio")
        this.currentAudio.load()
        audioPlayerProgressBar.style.width = '0%';
        audioPlayerProgressBar.style.transition = 'none';
        toggleAudio()
        updateProgress()
        this.indexAudio = index

        currentAudio.onloadedmetadata = function() {
            audioPlayerCurrentTime.textContent = getTimeCodeFromNum(this.currentAudio.currentTime);
            audioPlayerTotalTime.textContent = getTimeCodeFromNum(this.currentAudio.duration);
        }.bind(this);
    }

    function toggleAudio() {
        if (this.currentAudio.paused) {
            audioPlayerPlayBtn.classList.add('pause');
            this.currentAudio.play();
        } else {
            audioPlayerPlayBtn.classList.remove('pause');
            this.currentAudio.pause();
        }
    }

    function updateProgress() {
        setInterval(() => {
            audioPlayerProgressBar.style.width = currentAudio.currentTime / currentAudio.duration * 100 + '%';
            audioPlayerProgressBar.style.transition = 'all 0.7s linear';
            audioPlayerCurrentTime.textContent = getTimeCodeFromNum(currentAudio.currentTime);
        }, 500);
    }

    function changeProgress() {
        const timelineWidth = window.getComputedStyle(audioPlayerTimeline).width;
        const timeToSeek = event.offsetX / parseInt(timelineWidth) * currentAudio.duration;
        currentAudio.currentTime = timeToSeek;
    }

    function next() {
        if (this.indexAudio < songsList.length - 1) {
            var oldIndex = this.indexAudio
            this.indexAudio++;
            loadNewTrack(this.indexAudio);
        }
    }
  
    function previous() {
        if (this.indexAudio > 0) {
            var oldIndex = this.indexAudio
            this.indexAudio--;
            loadNewTrack(this.indexAudio);
        }
    }

    if (audioPlayerTimeline) {
        audioPlayerTimeline.addEventListener('click', (event) => {
            event.preventDefault()

            changeProgress()
        });
    }

    if (audioPlayerBackBtn) {
        audioPlayerBackBtn.addEventListener('click', (event) => {
            event.preventDefault()

            previous()
        })
    }

    if (audioPlayerPlayBtn) {
        audioPlayerPlayBtn.addEventListener('click', (event) => {
            event.preventDefault()

            toggleAudio()
        })
    }

    if (audioPlayerNextBtn) {
        audioPlayerNextBtn.addEventListener('click', (event) => {
            event.preventDefault()

            next()
        })
    }

    if (audioPlayer && mainPodcastsPlayer) {
        mainPodcastsPlayer.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                createPlayList('.main-podcasts__track')

                loadNewTrack(0)

                if (audioPlayer.classList.contains('player--hidden')) {
                    audioPlayer.classList.remove('player--hidden')
                }
            })
        })
    }

    if (audioPlayer && podcastsPlayer) {
        podcastsPlayer.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                createPlayList('.podcasts__player')

                loadNewTrack(i)

                if (audioPlayer.classList.contains('player--hidden')) {
                    audioPlayer.classList.remove('player--hidden')
                }
            })
        })
    }
    if (audioPlayer && podcastsReleasePlayer) {
        podcastsReleasePlayer.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                createPlayList('.c-listening')

                loadNewTrack(i)

                if (audioPlayer.classList.contains('player--hidden')) {
                    audioPlayer.classList.remove('player--hidden')
                }
            })
        })
    }

    // get max height
    function getMaxElementsHeight(elements) {

        const heights = elements.map(elements => {
            return elements.getBoundingClientRect().height;
        });              
        
        return Math.max.apply(null, heights);
    }

    // swiper
    const mainSlider = document.querySelector('.main__slider .swiper')

    if (mainSlider) {
        const myMainSlider = new Swiper(mainSlider, {
            slidesPerView: 1,
            speed: 600,
            fadeEffect: { crossFade: true },
            effect: 'fade',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            breakpoints: {
                768: {
                    pagination: {
                        type: 'fraction',
                    },
                },
            }
        });
    }

    //
    const imageSlider = document.querySelector('.image-slider .swiper')

    if (imageSlider) {
        const myImageSlider = new Swiper(imageSlider, {
            slidesPerView: 1,
            speed: 600,
            fadeEffect: { crossFade: true },
            effect: 'fade',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
        });
    }

    const communitySlider = document.querySelector('.community__slider .swiper')
    const communitySlides = [...document.querySelectorAll('.community__slide')]

    if (communitySlider) {
        setTimeout(() => {
            let maxCellHeightCommunitySlides = getMaxElementsHeight(communitySlides)
    
            communitySlides.forEach(item => {
                item.style.minHeight = maxCellHeightCommunitySlides + 'px'
            })
        }, 100)

        const myCommunitySlider = new Swiper(communitySlider, {
            slidesPerView: 6,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 5,
                },
                1200: {
                    slidesPerView: 6,
                }
            }
        });
    }

    //
    const projectsWinnersSlider = document.querySelector('.projects-winners__slider .swiper')
    const projectsWinnersSlides = [...document.querySelectorAll('.projects-winners__slide')]

    if (projectsWinnersSlider) {
        setTimeout(() => {
            let maxCellHeightProjectsWinnersSlides = getMaxElementsHeight(projectsWinnersSlides)
    
            projectsWinnersSlides.forEach(item => {
                item.style.minHeight = maxCellHeightProjectsWinnersSlides + 'px'
            })
        }, 100)

        const myProjectsWinnersSlider = new Swiper(projectsWinnersSlider, {
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }

    //
    const teamMainSlider = document.querySelector('.team-main__slider .swiper')

    if (teamMainSlider) {
        const myTeamMainSlider = new Swiper(teamMainSlider, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            speed: 800,
            watchOverflow: true,
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
        });
    }

    //
    const mainNewsSlider = document.querySelector('.main-news__slider .swiper')

    if (mainNewsSlider) {
        const myMainNewsSlider = new Swiper(mainNewsSlider, {
            slidesPerView: 'auto',
            spaceBetween: 40,
            loop: true,
            speed: 800,
            watchOverflow: true,
            navigation: {
                nextEl: '.swiper-button-next',
            },
            breakpoints: {
                0: {
                    spaceBetween: 20,
                },
                768: {
                    spaceBetween: 40,
                },
            }
        });
    }

    //
    const socialEntrepreneurshipSlider = document.querySelector('.social-entrepreneurship__slider .swiper')
    const socialEntrepreneurshipSlides = [...document.querySelectorAll('.social-entrepreneurship__slide')]

    if (socialEntrepreneurshipSlider) {
        setTimeout(() => {
            let maxCellHeightSocialEntrepreneurshipSlides = getMaxElementsHeight(socialEntrepreneurshipSlides)
    
            socialEntrepreneurshipSlides.forEach(item => {
                item.style.minHeight = maxCellHeightSocialEntrepreneurshipSlides + 'px'
            })
        }, 100)

        const mySocialEntrepreneurshipSlider = new Swiper(socialEntrepreneurshipSlider, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            speed: 800,
            watchOverflow: true,
            navigation: {
                prevEl: '.js-social-entrepreneurship-prev',
                nextEl: '.js-social-entrepreneurship-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                500: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 'auto',
                },
            }
        });
    }

    //
    const webinarsSlider = document.querySelector('.webinars__slider .swiper')
    
    if (webinarsSlider) {
        const myWebinarsSlider = new Swiper(webinarsSlider, {
            slidesPerView: 2,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 2,
                },
            }
        });
    }

    //
    const otherCategoriesSlider = document.querySelector('.other-categories__slider .swiper')

    if (otherCategoriesSlider) {
        const myOtherCategoriesSlider = new Swiper(otherCategoriesSlider, {
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }

    //
    const researchSlider = document.querySelector('.research__slider .swiper--double')
    const researchSingleSlider = document.querySelector('.research__slider .swiper--single')
    const researchLkSlider = document.querySelector('.research__slider .swiper--lk')
    const researchSlides = [...document.querySelectorAll('.research__slide')]

    if (researchSlider) {
        setTimeout(() => {
            let maxCellHeightResearchSlides = getMaxElementsHeight(researchSlides)
    
            researchSlides.forEach(item => {
                item.style.minHeight = maxCellHeightResearchSlides + 'px'
            })
        }, 100)
        
        const myResearchSlider = new Swiper(researchSlider, {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                prevEl: researchSlider.closest('.research__slider').querySelector('.swiper-button-prev'),
                nextEl: researchSlider.closest('.research__slider').querySelector('.swiper-button-next'),
            },
        });
    }

    if (researchSingleSlider) {
        setTimeout(() => {
            let maxCellHeightResearchSlides = getMaxElementsHeight(researchSlides)
    
            researchSlides.forEach(item => {
                item.style.minHeight = maxCellHeightResearchSlides + 'px'
            })
        }, 100)

        console.log(researchSingleSlider.closest('.research__slider').querySelector('.swiper-button-prev'))
        const myResearchSingleSlider = new Swiper(researchSingleSlider, {
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                prevEl: researchSingleSlider.closest('.research__slider').querySelector('.swiper-button-prev'),
                nextEl: researchSingleSlider.closest('.research__slider').querySelector('.swiper-button-next'),
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }

    if (researchLkSlider) {
        setTimeout(() => {
            let maxCellHeightResearchSlides = getMaxElementsHeight(researchSlides)
    
            researchSlides.forEach(item => {
                item.style.minHeight = maxCellHeightResearchSlides + 'px'
            })
        }, 100)

        const myResearchLkSlider = new Swiper(researchLkSlider, {
            slidesPerView: 2,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                navigation: {
                    prevEl: researchLkSlider.closest('.research__slider').querySelector('.swiper-button-prev'),
                    nextEl: researchLkSlider.closest('.research__slider').querySelector('.swiper-button-next'),
                },
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
            }
        });
    }

    // 
    const partnersSlider = document.querySelector('.partners__slider .swiper')

    if (partnersSlider) {
        const myPartnersSlider = new Swiper(partnersSlider, {
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                prevEl: partnersSlider.closest('.partners__slider').querySelector('.swiper-button-prev'),
                nextEl: partnersSlider.closest('.partners__slider').querySelector('.swiper-button-next'),
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }

    //
    const nominationsSlider = document.querySelector('.nominations__slider .swiper')
    const nominationsSlides = [...document.querySelectorAll('.nominations__slide')]

    if (nominationsSlider) {
        if (window.innerWidth >= 768) {
            setTimeout(() => {
                let maxCellHeightNominationsSlides = getMaxElementsHeight(nominationsSlides)
        
                nominationsSlides.forEach(item => {
                    item.style.minHeight = maxCellHeightNominationsSlides + 'px'
                })
            }, 100)
        }

        const myNominationsSlider = new Swiper(nominationsSlider, {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
        });
    }

    //
    const newsSlider = document.querySelectorAll('.news-slider__slider .swiper')

    if (newsSlider) {
        newsSlider.forEach(slider => {
            const myNewsSlider = new Swiper(slider, {
                slidesPerView: 'auto',
                spaceBetween: 20,
                speed: 800,
                watchOverflow: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                },
            })
        })
    }

    //
    const socialIdeasSlider = document.querySelector('.social-ideas__slider .swiper')
    
    if (socialIdeasSlider) {
        const mySocialIdeasSlider = new Swiper(socialIdeasSlider, {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,
            loop: true,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            breakpoints: {
                1024: {
                    pagination: {
                        type: 'fraction',
                    },
                },
            }
        });
    }

    //
    const ideasRatingSlider = document.querySelector('.ideas-rating__slider .swiper')
    const ideasRatingSlides = [...document.querySelectorAll('.ideas-rating__item')]

    if (ideasRatingSlider && window.innerWidth < 1024) {
        setTimeout(() => {
            let maxCellHeightIdeasRatingSlides = getMaxElementsHeight(ideasRatingSlides)
    
            ideasRatingSlides.forEach(item => {
                item.style.minHeight = maxCellHeightIdeasRatingSlides + 'px'
            })
        }, 100)

        const myIdeasRatingSlider = new Swiper(ideasRatingSlider, {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
            }
        });
    }

    // fancybox
    Fancybox.bind('[data-fancybox="gallery"]', {
        animated: false,
        dragToClose: false,
        showClass: false,
        hideClass: false,
        closeButton: "top",
        Image: {
            zoom: false,
            wheel: false,
            click: false,
        },
        Thumbs: false,
        Toolbar: {
            display: [
                { id: "prev", position: "left", html: '<svg><use xlink:href="img/dist/sprite.svg#icon-arrow-prev"></use></svg>' },
                { id: "counter", position: "left" },
                { id: "next", position: "right", html: '<svg><use xlink:href="img/dist/sprite.svg#icon-arrow-next"></use></svg>', },
                { id: "close", position: "right", html: '<svg><use xlink:href="img/dist/sprite.svg#icon-close"></use></svg>', },
            ],
        },
    });
});