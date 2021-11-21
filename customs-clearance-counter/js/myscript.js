$(function() {
    function positionFooter(footer, body) {
        var oHeight = $(window).outerHeight() - body.height();
        var fHeight = footer.outerHeight();
        var bPadding = fHeight + 20;
        if (oHeight >= bPadding) {
            body.css('padding-bottom', oHeight + 'px');
        } else {
            body.css('padding-bottom', bPadding + 'px');
        }
    }
    $('.add-select-to-css').select2();
    $(document).ready(function() {
        positionFooter($('footer.footer'), $('body'));
    });
    $(window).resize(function() {
        positionFooter($('footer.footer'), $('body'));
    });
});
$(function() {
    var menuWidth = 0;

    function autoHeightAnimate(element, time) {
        var curHeight = element.height(),
            autoHeight = element.css('height', 'auto').height();
        element.height(curHeight);
        element.stop().animate({
            height: autoHeight
        }, time);
    }

    function elemWidthOuter(elem) {
        var width = parseFloat(elem.css('width'));
        var padding = parseFloat(elem.css('padding-left')) + parseFloat(elem.css('padding-right'));
        var margin = parseFloat(elem.css('margin-left')) + parseFloat(elem.css('margin-right'));
        return width + padding + margin;
    }

    function elemOuter(elem) {
        var padding = parseFloat(elem.css('padding-left')) + parseFloat(elem.css('padding-right'));
        var margin = parseFloat(elem.css('margin-left')) + parseFloat(elem.css('margin-right'));
        return padding + margin;
    }
    $('.me-menu').find('li').each(function(e) {
        menuWidth += elemWidthOuter($('.me-menu').find('li').eq(e));
    });
    menuWidth += elemOuter($('.me-menu'));

    function openExpendMenu(content, button) {
        button.on('click', function() {
            if (!content.hasClass('open-menu-active')) {
                content.addClass('open-menu-active');
                autoHeightAnimate(content, 300);
            } else {
                content.animate({
                    height: 0
                }, 300);
                setTimeout(function() {
                    content.removeClass('open-menu-active');
                });
            }
        });
    }

    function expendMenu(menu, content, button, collapse) {
        var counterLi = 0;
        $('.me-menu').find('li').each(function(e) {
            $('.me-menu').find('li').eq(e).css('width', 'max-content');
            counterLi += elemWidthOuter($('.me-menu').find('li').eq(e));
            $('.me-menu').find('li').eq(e).css('width', 'auto');
        });
        var parentMenu = '<div class="parent-menu"></div>';
        var appendMenu;
        var parentContent = content.parent().parent();
        var lengthPar;
        var lengthApp;
        var winDocument = $(document).width();
        if (winDocument > 575) {
            appendMenu = $('.parent-menu');
            lengthPar = parentContent.find(appendMenu).length;
            if (lengthPar > 0) {
                lengthApp = appendMenu.find(menu).length;
                if (lengthApp > 0) {
                    button.removeClass('d-block');
                    menu.addClass('d-flex');
                    collapse.removeClass('py-2');
                    menu.appendTo(content);
                    menu.removeClass('mb-2');
                }
                parentContent.find(appendMenu).remove();
            }
            if (counterLi > content.width()) {
                appendMenu = $('.parent-menu');
                lengthPar = parentContent.find(appendMenu).length;
                if (lengthPar == 0) {
                    button.addClass('d-block');
                    menu.addClass('mb-2');
                    menu.removeClass('d-flex');
                    collapse.addClass('py-2');
                    parentContent.append(parentMenu);
                    appendMenu = $('.parent-menu');
                    lengthApp = appendMenu.find(menu).length;
                    if (lengthApp == 0) {
                        menu.appendTo(appendMenu);
                        openExpendMenu(appendMenu, button);
                    }
                }
            } else {
                appendMenu = $('.parent-menu');
                lengthPar = parentContent.find(appendMenu).length;
                if (lengthPar > 0) {
                    lengthApp = appendMenu.find(menu).length;
                    if (lengthApp > 0) {
                        button.removeClass('d-block');
                        menu.addClass('d-flex');
                        collapse.removeClass('py-2');
                        menu.appendTo(content);
                        menu.removeClass('mb-2');
                    }
                    parentContent.find(appendMenu).remove();
                }
            }
        } else {
            appendMenu = $('.parent-menu');
            lengthPar = parentContent.find(appendMenu).length;
            if (lengthPar == 0) {
                button.addClass('d-block');
                menu.addClass('mb-2');
                menu.removeClass('d-flex');
                collapse.addClass('py-2');
                parentContent.append(parentMenu);
                appendMenu = $('.parent-menu');
                lengthApp = appendMenu.find(menu).length;
                if (lengthApp == 0) {
                    menu.appendTo(appendMenu);
                    openExpendMenu(appendMenu, button);
                }
            }
        }
    }
    expendMenu($('.me-menu'), $('.collapse-content'), $('.btn-collapse'), $('.me-menu-collapse'));
    $(window).resize(function() {
        expendMenu($('.me-menu'), $('.collapse-content'), $('.btn-collapse'), $('.me-menu-collapse'));
    });
});

function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}
var textRazor = document.getElementsByClassName('blog-item-text');
for (var i = 0; i < textRazor.length; i++) {
    textRazor[i].htmlRazor({
        razor: true,
        razorLength: 255,
        title: true,
        titleLength: 75,
        screen: true,
        screenLength: {
            xl: 200,
            lg: 150,
            md: 100,
            sm: 50,
        }
    });
}
$('.open-modal').mouseup(function() {
    let index = $('.open-modal').index(this);
    if (!$('.my-modal').eq(index).hasClass('d-flex')) {
        $('.my-modal').eq(index).addClass('d-flex');
    }
});
$('.my-modal-close').mouseup(function() {
    let index = $('.my-modal-close').index(this);
    $('.my-modal').eq(index).removeClass('d-flex');
});

$('#invoice-price').inputmask("numeric", {
    groupSeparator: " ",
    digits: 0,
    autoGroup: true,
    rightAlign: false,
});
$(function() {
    function outerHeight(elem) {
        var margin = parseFloat(elem.css('margin-top')) + parseFloat(elem.css('margin-bottom'));
        var padding = parseFloat(elem.css('padding-top')) + parseFloat(elem.css('padding-bottom'));
        return elem.height() + margin + padding;
    }

    function readMore(elem, contentParent, buttonParent) {
        elem.each(function(e) {
            if (contentParent.eq(e).height() < outerHeight(elem.eq(e))) {
                buttonParent.eq(e).addClass('d-flex');
                contentParent.eq(e).removeClass('mb-3');
            } else {
                buttonParent.eq(e).removeClass('d-flex');
                contentParent.eq(e).addClass('mb-3');
            }
        });
    }

    function openRead(button, buttonIcon, contentParent, hiddenHeight, time) {
        button.on('click', function() {
            var index = button.index(this);
            if (!button.eq(index).hasClass('open-read-more')) {
                button.eq(index).addClass('open-read-more');
                buttonIcon.eq(index).html('<i class="fa fa-chevron-circle-up ml-1"></i>');
                contentParent.eq(index).animate({
                    'max-height': contentParent.eq(index).children().outerHeight()
                }, 500);
            } else {
                button.eq(index).removeClass('open-read-more');
                buttonIcon.eq(index).html('<i class="fa fa-chevron-circle-down ml-1"></i>');
                contentParent.eq(index).animate({
                    'max-height': hiddenHeight
                }, time);
            }
        });
    }
    readMore($('.aside-content'), $('.aside-content-parent'), $('.more-button-parent'));
    openRead($('.read-more'), $('.icon-read-button'), $('.aside-content-parent'), 120, 500);
    $(window).resize(function() {
        readMore($('.aside-content'), $('.aside-content-parent'), $('.more-button-parent'), 120, 500);
    });
});