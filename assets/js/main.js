
(function ($) {
    "use strict";
    function awdMenu() {
        $(".menu-toggle").on('click', function (e) {
            $(this).toggleClass('opened');
            $("#awd-site-nav").toggleClass('active');
        });
    }

    ///** 背景动画 **/
    var can = document.getElementById('awd-site-canvas');
    var cxt = can.getContext('2d');

    var w = can.width = window.innerWidth;
    var h = can.height = window.innerHeight;

    var num = 200; //生成点的个数
    var data = []; //定义一个数组，准备用来存坐标
    var move = {};
    var liuXY = [];
    var k = -1;
    var range = Math.atan(k);
    var length = 200;

//生成num个点，并且存储初始坐标
    for (var i = 0; i < num; i++) {
        data[i] = {
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 8 + 3
        };
        Cricle(data[i].x, data[i].y, data[i].r);
    };

    ! function draw() {
        cxt.clearRect(0, 0, w, h);
        for (var i = 0; i < num; i++) {
            data[i].r += Math.random() * 2 - 1;
            data[i].r = Math.max(0, data[i].r);
            data[i].r = Math.min(12, data[i].r);
            Cricle(data[i].x, data[i].y, data[i].r);
        };
        if (liuXY.length) {
            for (var i in liuXY) {
                liuXY[i].cX -= 10;
                liuX(liuXY[i].cX, liuXY[i].y, liuXY[i].x);
                if (liuXY[i].cX < 0 || getY(liuXY[i].cX, liuXY[i].y, liuXY[i].x) > h) {
                    liuXY.splice(i, 1);
                };
            };
        };
        if (Math.random() > 0.98) {
            var a = Math.random() * (w - 400) + 400;
            liuXY.push({
                x: a,
                y: 0,
                cX: a
            });
        };
        window.requestAnimationFrame(draw);
    }();

    function liuX(x, sX, sY) {
        cxt.save();
        var y = getY(x, sY, sX);
        var r = 15;
        var rad = cxt.createRadialGradient(x, y, 0, x, y, r);
        rad.addColorStop(0, 'rgba(255,255,255,0.8)');
        rad.addColorStop(0.1, 'rgba(255,255,255,0.8)');
        rad.addColorStop(0.2, 'rgba(255,255,255,0.08)');
        rad.addColorStop(1, 'rgba(255,255,255,0)');
        cxt.fillStyle = rad;
        cxt.beginPath();
        cxt.arc(x, y, r, 0, 2 * Math.PI, true);
        cxt.closePath();
        cxt.fill();
        cxt.restore();

        var wX = x + (Math.cos(range) * length);
        var wY = y + (Math.sin(range) * length);

        var x1 = x + 3;
        var y1 = y;
        var x2 = x;
        var y2 = y - 3;

        cxt.save();
        var rad2 = cxt.createRadialGradient(x, y, 0, x, y, length);
        rad2.addColorStop(0, 'rgba(255,255,255,0.1)');
        rad2.addColorStop(1, 'rgba(255,255,255,0)');
        cxt.fillStyle = rad2;
        cxt.beginPath();
        cxt.moveTo(x1, y1);
        cxt.lineTo(x2, y2);
        cxt.lineTo(wX, wY);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
    };

    function getY(x, startY, startX) {
        return k * x + startY - k * startX;
    };

//画点
    function Cricle(x, y, r) {
        cxt.save();
        var rad = cxt.createRadialGradient(x, y, 0, x, y, r);
        rad.addColorStop(0, 'rgba(255,255,255,0.8)');
        rad.addColorStop(0.1, 'rgba(255,255,255,0.8)');
        rad.addColorStop(0.2, 'rgba(255,255,255,0.08)');
        rad.addColorStop(1, 'rgba(255,255,255,0)');
        cxt.fillStyle = rad;
        cxt.beginPath();
        cxt.arc(x, y, r, 0, 2 * Math.PI, true);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
    };
    //
    // var canvas = document.getElementById("awd-site-canvas");
    // var ctx = canvas.getContext("2d");
    // window.requestAnimFrame = (function () {
    //     return window.requestAnimationFrame ||
    //     window.webkitRequestAnimationFrame ||
    //     window.mozRequestAnimationFrame ||
    //     function (callback) {
    //         window.setTimeout(callback, 1000 / 60);
    //     };
    // })();
    //
    // var curves_array = [];
    // var curve = function (cp1x, cp1y, cp2x, cp2y, x, y, cp1xvx, cp1xvy, cp1yvx, cp1yvy, cp2xvx, cp2xvy, cp2yvx, cp2yvy) {
    //     this.cp1x = cp1x;
    //     this.cp1y = cp1y;
    //     this.cp2x = cp2x;
    //     this.cp2y = cp2y;
    //     this.x = x;
    //     this.y = y;
    //
    //     this.cp1xvx = cp1xvx;
    //     this.cp1xvy = cp1xvy;
    //     this.cp1yvx = cp1yvx;
    //     this.cp1yvy = cp1yvy;
    //
    //     this.cp2xvx = cp2xvx;
    //     this.cp2xvy = cp2xvy;
    //     this.cp2yvx = cp2yvx;
    //     this.cp2yvy = cp2yvy;
    // };
    //
    //
    // function awdCanvasResize() {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // }
    //
    //
    // function awdCanvasInit() {
    //     for (var i = 0; i < awd_bg_number_of_curves; i++) {
    //         var cp1x = Math.random() * canvas.width;
    //         var cp1y = Math.random() * canvas.height;
    //         var cp2x = Math.random() * canvas.width;
    //         var cp2y = Math.random() * canvas.height;
    //         var x = 0;
    //         var y = 0;
    //
    //         var cp1xvx = Math.random() * 2- 1;
    //         var cp1xvy = Math.random() * 2 - 1;
    //
    //         var cp1yvx = Math.random() * 2 - 1;
    //         var cp1yvy = Math.random() * 2 - 1;
    //
    //         var cp2xvx= Math.random() * 2 - 1;
    //         var cp2xvy= Math.random() * 2 - 1;
    //
    //         var cp2yvx = Math.random() * 2 - 1;
    //         var cp2yvy = Math.random() * 2 - 1;
    //
    //
    //         curves_array.push(
    //             new curve(
    //                 cp1x, cp1y, cp2x, cp2y,
    //                 x, y,
    //                 cp1xvx,cp1xvy,cp1yvx,cp1yvy,
    //                 cp2xvx,cp2xvy,cp2yvx,cp2yvy
    //             )
    //         );
    //     }
    // }
    //
    //
    // function awdCanvasDraw() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //
    //     ctx.lineWidth = 1;
    //     ctx.strokeStyle = $("#awd-site-wrap").css('color');
    //
    //     for (var i = 0; i < curves_array.length; i++) {
    //
    //         ctx.beginPath();
    //         ctx.moveTo(-100, canvas.height + 100);
    //         ctx.bezierCurveTo(
    //             curves_array[i].cp1x, curves_array[i].cp1y,
    //             curves_array[i].cp2x, curves_array[i].cp2y,
    //             canvas.width + 100, curves_array[i].y - 100
    //         );
    //         ctx.stroke();
    //
    //         if (curves_array[i].cp1x < 0 || curves_array[i].cp1x > canvas.width) {
    //             curves_array[i].cp1x -= curves_array[i].cp1xvx;
    //             curves_array[i].cp1xvx *= -1;
    //         }
    //         if (curves_array[i].cp1y < 0 || curves_array[i].cp1y > canvas.height) {
    //             curves_array[i].cp1y -= curves_array[i].cp1yvy;
    //             curves_array[i].cp1yvy *= -1;
    //         }
    //
    //         if (curves_array[i].cp2x < 0 || curves_array[i].cp2x > canvas.width) {
    //             curves_array[i].cp2x -= curves_array[i].cp2xvx;
    //             curves_array[i].cp2xvx *= -1;
    //         }
    //         if (curves_array[i].cp2y < 0 || curves_array[i].cp2y > canvas.height) {
    //             curves_array[i].cp2y -= curves_array[i].cp2yvy;
    //             curves_array[i].cp2yvy *= -1;
    //         }
    //
    //         curves_array[i].cp1y += curves_array[i].cp1yvy;
    //         curves_array[i].cp1x += curves_array[i].cp1xvx;
    //         curves_array[i].cp2x += curves_array[i].cp2xvx;
    //     }
    //     requestAnimFrame(awdCanvasDraw);
    // }
    //
    // function awdCanvas(){
    //     awdCanvasResize();
    //     awdCanvasInit();
    //     awdCanvasDraw();
    // }

    ///** 滑块的内容 **/

    function awdContentSlider() {
        $('.slide-item').first().addClass('active');

        var slide_timeout,
            slide_in_timeout;

        var $bg = $('#bg');
        var $menu = $('#awd-site-nav');
        var menu_elem = $menu.find('a');
        var menu_elem_active = $menu.find('a.active');

        menu_elem.on('click', function (e) {
            e.preventDefault();

            clearTimeout(slide_timeout);

            var position = $(this).offset();
            var elem = $(this);
            var goToSlide = elem.data('slide');
            var goToSlideBg = $bg.find('.bg-' + goToSlide);

            $bg.find('.awd-site-bg').removeClass('active');
            $('#awd-site-wrap').removeClass('bg-' + $menu.find('a.active').data('slide')).addClass("bg-" + goToSlide);
            goToSlideBg.css({
                "left": position.left + (elem.outerWidth() / 2) - 50,
                "top": position.top + (elem.outerHeight() / 2) - 50
            });
            goToSlideBg.addClass('active');

            if ($(window).width() < 769) {
                $menu.removeClass('active');
                $(".menu-toggle").removeClass('opened');
            }

            if (!elem.hasClass('active')) {

                menu_elem.removeClass('active');
                elem.addClass('active');

                slide_timeout = setTimeout(function () {
                    var goToSlideContent = $('.slide-item[data-slide-id=' + goToSlide + ']');
                    if (goToSlideContent) {
                        $('.slide-item').removeClass('active');
                        goToSlideContent.addClass('active');

                        if (!$('body').hasClass('mobile')) {

                            if (goToSlideContent.hasClass('active')) {

                                clearTimeout(slide_in_timeout);

                                $('.start .slide-item .animated').each(function () {
                                    var elem = $(this);
                                    var animation = elem.data('animation');
                                    elem.removeClass(animation + " visible");
                                });

                                $('.active').find('.animated').each(function () {

                                    var elem = $(this);
                                    var animation = elem.data('animation');

                                    if (!elem.hasClass('visible')) {
                                        var animationDelay = elem.data('animation-delay');
                                        if (animationDelay) {
                                            slide_in_timeout = setTimeout(function () {
                                                elem.addClass(animation + " visible");
                                            }, animationDelay);
                                        } else {
                                            elem.addClass(animation + " visible");
                                        }
                                    }
                                });
                            }

                        }

                    }
                }, 0);
            }

        });

        //* 键盘事件 */

        $(document).keydown(function (e) {
            var currentSlide = menu_elem_active.data('slide');
            var allSlides = menu_elem.length;

            if (e.keyCode == 37 || e.keyCode == 40) { // left

                var prevSlide = menu_elem_active.prev().data('slide');

                if (prevSlide == 0) {
                    $menu.find('a[data-slide=' + allSlides + ']').trigger("click");
                } else {
                    $menu.find('a[data-slide=' + prevSlide + ']').trigger("click");
                }

            }
            else if (e.keyCode == 39 || e.keyCode == 38) { // right

                var nextSlide = menu_elem_active.next().data('slide');
                var maxSlides = allSlides + 1;

                if (nextSlide == maxSlides) {
                    $menu.find('a[data-slide="home"]').trigger("click");
                } else {
                    $menu.find('a[data-slide=' + nextSlide + ']').trigger("click");
                }

            }
        });

        //* 跳转幻灯片 */

        $('a.go-slide').on('click', function (e) {
            e.preventDefault();
            var elem = $(this);
            var goToSlide = elem.data('slide');

            $menu.find('a[data-slide=' + goToSlide + ']').trigger("click");

        });

    }

    ///** 倒计时 **/

    function awdCountdown() {

        $('#clock').countdown(awd_countdownDate).on('update.countdown', function (event) {
            var $this = $(this).html(event.strftime(''
                + '<div class="counter-container"><div class="counter-date"><div class="counter-box first"><span>day%!d</span><div class="number">%-D</div></div></div>'
                + '<div class="counter-time"><div class="counter-box"><div class="number">%H:%M</div></div>'
                + '<div class="counter-box last"><div class="number">%S</div><span>seconds</span></div></div></div>'
            ));
        });
    }

    ///** 输入验证(没写完) **/

    ///** 注册表单（摘自网络） **/

    // function awdSubscribe() {
    //     if (awd_subscribe == 1 || awd_subscribe == 2) {
    //         awdSubscribeForm();
    //     } else if (awd_subscribe == 3) {
    //         awdMailchimp();
    //     }
    // }

    //* mailchimp（摘自网络） */

    // function awdMailchimp() {
    //
    //     var $form = $('#apply-form');
    //     var $applyEmail = $('#apply-email');
    //
    //     $form.ajaxChimp({
    //         callback: awdMailchimpStatus,
    //         language: 'eng',
    //         type: 'POST',
    //         url: awd_mailchimpUrl
    //     });
    //
    //     function awdMailchimpStatus(resp) {
    //
    //         if (resp.result === 'error') {
    //             $applyEmail.focus();
    //             $('.apply-notice').addClass('visible');
    //         }
    //         else if (resp.result === 'success') {
    //             $form[0].reset();
    //             $applyEmail.blur();
    //             $('.apply-notice').addClass('visible');
    //         }
    //     }
    // }
    //
    // //* php(摘自网络) */
    //
    // function awdapplyForm() {
    //
    //     var $form = $('#apply-form');
    //     var $applyEmail = $('#apply-email');
    //     if (awd_apply == 1) {
    //         var url = 'assets/php/to-mail.php';
    //     } else if (awd_apply == 2) {
    //         var url = 'assets/php/to-file.php';
    //     }
    //
    //     $applyEmail.prop('type', 'text');
    //
    //     $form.on('submit', function (e) {
    //
    //         var applyEmailVal = $applyEmail.val();
    //         var $applyNotice = $('.apply-notice');
    //         var $submitButton = $form.find('button[type="submit"]');
    //
    //         e.preventDefault();
    //
    //         $submitButton.prop('disabled', true);
    //
    //         if (!awdFormValidation(applyEmailVal)) {
    //             $applyNotice.stop(true).hide().addClass('visible').html(awd_applyError).fadeIn();
    //             $submitButton.prop('disabled', false);
    //             $applyEmail.focus();
    //         }
    //         else {
    //             $.ajax({
    //                 type: 'POST',
    //                 url: url,
    //                 data: {
    //                     email: applyEmailVal,
    //                     emailAddress: awd_applyEmail
    //                 },
    //                 success: function () {
    //                     $applyNotice.stop(true).hide().addClass('visible').html(awd_applySuccess).fadeIn();
    //
    //                     $submitButton.prop('disabled', false);
    //                     $form[0].reset();
    //                     $applyEmail.blur();
    //
    //                 }
    //             });
    //         }
    //         return false;
    //
    //     });
    //
    // }


    //** 表单提交（摘自网络） **/

    // function awdContactForm() {
    //
    //     var $form = $('#contact-form');
    //
    //     $form.on('submit', function (e) {
    //
    //         var input = $(this).find('input, textarea');
    //         var requiredFields = $(this).find('.required');
    //         var emailField = $('.contact-form-email');
    //         var contactNameVal = $('.contact-form-name').val();
    //         var contactSubjectVal = $('.contact-form-subject').val();
    //         var contactEmailVal = emailField.val();
    //         var contactMessageVal = $('.contact-form-message').val();
    //         var contactNotice = $('.contact-notice');
    //
    //         e.preventDefault();
    //
    //         if (contactNameVal == '' || contactEmailVal == '' || contactMessageVal == '' || contactSubjectVal == '') {
    //             contactNotice.stop(true).hide().html(awd_contactInputError).fadeIn();
    //             requiredFields.each(function () {
    //                 $(this).addClass("input-error");
    //             });
    //
    //         } else if (!awdFormValidation(contactEmailVal)) {
    //             contactNotice.stop(true).hide().html(awd_contactEmailError).fadeIn();
    //             emailField.addClass("input-error");
    //             $('#contact-email').focus();
    //         }
    //         else {
    //             $.ajax({
    //                 type: 'POST',
    //                 url: 'assets/php/contact.php',
    //                 data: {
    //                     name: contactNameVal,
    //                     email: contactEmailVal,
    //                     message: contactMessageVal,
    //                     subject: contactSubjectVal,
    //                     emailAddress: awd_contactEmail
    //                 },
    //                 success: function () {
    //                     contactNotice.stop(true).hide().html(awd_contactSuccess).fadeIn();
    //                     $form[0].reset();
    //                     input.blur();
    //                 }
    //             });
    //         }
    //         return false;
    //
    //     });
    //
    // }

    ///** 动画元素 **/

    function awdAnimate() {
        if (!$('body').hasClass('mobile')) {

            /* 开始动画加载 */
            $(window).load(function () {
                $('.start .animated').each(function () {
                    var elem = $(this);
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        var animation = elem.data('animation');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + " visible");
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + " visible");
                        }
                    }
                });
            });

        }
    }


    ///** 自定义滚动 **/

    function awdScrollbar() {

        $('.sections-block').perfectScrollbar({
            suppressScrollX: true
        });

    }

    ///** 文件 **/

    $(document).on('ready', function () {

        if (awd_bordered === true) {
            $('body').addClass('bordered');
        }

        awdMenu();
        awdContentSlider();

        if (awd_countdown === true) {
            awdCountdown();
        }

        if (awd_animated === true) {
            $('body').addClass('start');
            awdAnimate();
        }
        awdSubscribe();
        awdContactForm();
        awdScrollbar();

        if (awd_bg_animated === true) {
            awdCanvas();
            $(window).resize(function(){
                awdCanvasResize();
            });
        }


    });


})(jQuery);