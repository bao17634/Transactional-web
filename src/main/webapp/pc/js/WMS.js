/**
 * Created by Administrator on 2018/4/26.
 */
if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
    "use strict";
    var e = jQuery.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(), function (t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e)if (void 0 !== t.style[i])return {end: e[i]};
        return !1
    }

    t.fn.emulateTransitionEnd = function (e) {
        var i = !1, o = this;
        t(this).one("bsTransitionEnd", function () {
            i = !0
        });
        return setTimeout(function () {
            i || t(o).trigger(t.support.transition.end)
        }, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                if (t(e.target).is(this))return e.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), function (t) {
    "use strict";
    var e = '[data-dismiss="alert"]', i = function (i) {
        t(i).on("click", e, this.close)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.close = function (e) {
        function o() {
            a.detach().trigger("closed.bs.alert").remove()
        }

        var n = t(this), s = n.attr("data-target");
        s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t("#" === s ? [] : s);
        e && e.preventDefault(), a.length || (a = n.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o())
    };
    var o = t.fn.alert;
    t.fn.alert = function (e) {
        return this.each(function () {
            var o = t(this), n = o.data("bs.alert");
            n || o.data("bs.alert", n = new i(this)), "string" == typeof e && n[e].call(o)
        })
    }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function () {
        return t.fn.alert = o, this
    }, t(document).on("click.bs.alert.data-api", e, i.prototype.close)
}(jQuery), function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), n = o.data("bs.button"), s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this, s)), "toggle" == e ? n.toggle() : e && n.setState(e)
        })
    }

    var i = function (e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1
    };
    i.VERSION = "3.3.7", i.DEFAULTS = {loadingText: "loading..."}, i.prototype.setState = function (e) {
        var i = "disabled", o = this.$element, n = o.is("input") ? "val" : "html", s = o.data();
        e += "Text", null == s.resetText && o.data("resetText", o[n]()), setTimeout(t.proxy(function () {
            o[n](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i).prop(i, !1))
        }, this), 0)
    }, i.prototype.toggle = function () {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), t && i.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function () {
        return t.fn.button = o, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
        var o = t(i.target).closest(".btn");
        e.call(o, "toggle"), t(i.target).is('input[type="radio"], input[type="checkbox"]') || (i.preventDefault(), o.is("input,button") ? o.trigger("focus") : o.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), n = o.data("bs.carousel"),
                s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this, s)), "number" == typeof e ? n.to(e) : a ? n[a]() : s.interval && n.pause().cycle()
        })
    }

    var i = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function (t, e) {
        var i = this.getItemIndex(e);
        if (("prev" == t && 0 === i || "next" == t && i == this.$items.length - 1) && !this.options.wrap)return e;
        var o = (i + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(o)
    }, i.prototype.to = function (t) {
        var e = this, i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0))return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function () {
        if (!this.sliding)return this.slide("next")
    }, i.prototype.prev = function () {
        if (!this.sliding)return this.slide("prev")
    }, i.prototype.slide = function (e, o) {
        var n = this.$element.find(".item.active"), s = o || this.getItemForDirection(e, n), a = this.interval,
            r = "next" == e ? "left" : "right", l = this;
        if (s.hasClass("active"))return this.sliding = !1;
        var h = s[0], d = t.Event("slide.bs.carousel", {relatedTarget: h, direction: r});
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var p = t(this.$indicators.children()[this.getItemIndex(s)]);
                p && p.addClass("active")
            }
            var c = t.Event("slid.bs.carousel", {relatedTarget: h, direction: r});
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), s[0].offsetWidth, n.addClass(r), s.addClass(r), n.one("bsTransitionEnd", function () {
                s.removeClass([e, r].join(" ")).addClass("active"), n.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function () {
                    l.$element.trigger(c)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(c)), a && this.cycle(), this
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = o, this
    };
    var n = function (i) {
        var o, n = t(this), s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var a = t.extend({}, s.data(), n.data()), r = n.attr("data-slide-to");
            r && (a.interval = !1), e.call(s, a), r && s.data("bs.carousel").to(r), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), function (t) {
    "use strict";
    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o)
    }

    function i(e) {
        return this.each(function () {
            var i = t(this), n = i.data("bs.collapse"),
                s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && s.toggle && /show|hide/.test(e) && (s.toggle = !1), n || i.data("bs.collapse", n = new o(this, s)), "string" == typeof e && n[e]()
        })
    }

    var o = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    o.VERSION = "3.3.7", o.TRANSITION_DURATION = 350, o.DEFAULTS = {toggle: !0}, o.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    }, o.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse")) && e.transitioning)) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s), !s.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"), e || n.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var r = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition)return r.call(this);
                    var l = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l])
                }
            }
        }
    }, o.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this)
            }
        }
    }, o.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, o.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n)
        }, this)).end()
    }, o.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var n = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = n, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n), a = s.data("bs.collapse") ? "toggle" : n.data();
        i.call(s, a)
    })
}(jQuery), function (t) {
    "use strict";
    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent()
    }

    function i(i) {
        i && 3 === i.which || (t(o).remove(), t(n).each(function () {
            var o = t(this), n = e(o), s = {relatedTarget: this};
            n.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(n[0], i.target) || (n.trigger(i = t.Event("hide.bs.dropdown", s)), i.isDefaultPrevented() || (o.attr("aria-expanded", "false"), n.removeClass("open").trigger(t.Event("hidden.bs.dropdown", s)))))
        }))
    }

    var o = ".dropdown-backdrop", n = '[data-toggle="dropdown"]', s = function (e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    s.VERSION = "3.3.7", s.prototype.toggle = function (o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = e(n), a = s.hasClass("open");
            if (i(), !a) {
                "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var r = {relatedTarget: this};
                if (s.trigger(o = t.Event("show.bs.dropdown", r)), o.isDefaultPrevented())return;
                n.trigger("focus").attr("aria-expanded", "true"), s.toggleClass("open").trigger(t.Event("shown.bs.dropdown", r))
            }
            return !1
        }
    }, s.prototype.keydown = function (i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var o = t(this);
            if (i.preventDefault(), i.stopPropagation(), !o.is(".disabled, :disabled")) {
                var s = e(o), a = s.hasClass("open");
                if (!a && 27 != i.which || a && 27 == i.which)return 27 == i.which && s.find(n).trigger("focus"), o.trigger("click");
                var r = s.find(".dropdown-menu li:not(.disabled):visible a");
                if (r.length) {
                    var l = r.index(i.target);
                    38 == i.which && l > 0 && l--, 40 == i.which && l < r.length - 1 && l++, ~l || (l = 0), r.eq(l).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = function (e) {
        return this.each(function () {
            var i = t(this), o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new s(this)), "string" == typeof e && o[e].call(i)
        })
    }, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", n, s.prototype.toggle).on("keydown.bs.dropdown.data-api", n, s.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", s.prototype.keydown)
}(jQuery), function (t) {
    "use strict";
    function e(e, o) {
        return this.each(function () {
            var n = t(this), s = n.data("bs.modal"), a = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this, a)), "string" == typeof e ? s[e](o) : a.show && s.show(o)
        })
    }

    var i = function (e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function (e) {
        var o = this, n = t.Event("show.bs.modal", {relatedTarget: e});
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            o.$element.one("mouseup.dismiss.bs.modal", function (e) {
                t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.adjustDialog(), n && o.$element[0].offsetWidth, o.$element.addClass("in"), o.enforceFocus();
            var s = t.Event("shown.bs.modal", {relatedTarget: e});
            n ? o.$dialog.one("bsTransitionEnd", function () {
                o.$element.trigger("focus").trigger(s)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s)
        }))
    }, i.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function () {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function (e) {
        var o = this, n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e)return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function () {
                o.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    }, i.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function () {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, i.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
        return t.fn.modal = o, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
        var o = t(this), n = o.attr("href"), s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            a = s.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(n) && n}, s.data(), o.data());
        o.is("a") && i.preventDefault(), s.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function () {
                o.is(":visible") && o.trigger("focus")
            })
        }), e.call(s, a, this)
    })
}(jQuery), function (t) {
    "use strict";
    var e = function (t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    e.VERSION = "3.3.7", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, e.prototype.init = function (e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector)throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var a = n[s];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" : "focusin", l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, e.prototype.getDefaults = function () {
        return e.DEFAULTS
    }, e.prototype.getOptions = function (e) {
        return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, e.prototype.getDelegateOptions = function () {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function (t, o) {
            i[t] != o && (e[t] = o)
        }), e
    }, e.prototype.enter = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, e.prototype.isInStateTrue = function () {
        for (var t in this.inState)if (this.inState[t])return !0;
        return !1
    }, e.prototype.leave = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), !i.isInStateTrue())return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, e.prototype.show = function () {
        var i = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(i);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (i.isDefaultPrevented() || !o)return;
            var n = this, s = this.tip(), a = this.getUID(this.type);
            this.setContent(), s.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && s.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i, h = l.test(r);
            h && (r = r.replace(l, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition(), p = s[0].offsetWidth, c = s[0].offsetHeight;
            if (h) {
                var f = r, u = this.getPosition(this.$viewport);
                r = "bottom" == r && d.bottom + c > u.bottom ? "top" : "top" == r && d.top - c < u.top ? "bottom" : "right" == r && d.right + p > u.width ? "left" : "left" == r && d.left - p < u.left ? "right" : r, s.removeClass(f).addClass(r)
            }
            var g = this.getCalculatedOffset(r, d, p, c);
            this.applyPlacement(g, r);
            var m = function () {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", m).emulateTransitionEnd(e.TRANSITION_DURATION) : m()
        }
    }, e.prototype.applyPlacement = function (e, i) {
        var o = this.tip(), n = o[0].offsetWidth, s = o[0].offsetHeight, a = parseInt(o.css("margin-top"), 10),
            r = parseInt(o.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(r) && (r = 0), e.top += a, e.left += r, t.offset.setOffset(o[0], t.extend({
            using: function (t) {
                o.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth, h = o[0].offsetHeight;
        "top" == i && h != s && (e.top = e.top + s - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i), c = p ? 2 * d.left - n + l : 2 * d.top - s + h,
            f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(c, o[0][f], p)
    }, e.prototype.replaceArrow = function (t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, e.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, e.prototype.hide = function (i) {
        function o() {
            "in" != n.hoverState && s.detach(), n.$element && n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), i && i()
        }

        var n = this, s = t(this.$tip), a = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(a), !a.isDefaultPrevented())return s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(e.TRANSITION_DURATION) : o(), this.hoverState = null, this
    }, e.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function () {
        return this.getTitle()
    }, e.prototype.getPosition = function (e) {
        var i = (e = e || this.$element)[0], o = "BODY" == i.tagName, n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {width: n.right - n.left, height: n.bottom - n.top}));
        var s = window.SVGElement && i instanceof window.SVGElement, a = o ? {top: 0, left: 0} : s ? null : e.offset(),
            r = {scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()},
            l = o ? {width: t(window).width(), height: t(window).height()} : null;
        return t.extend({}, n, r, l, a)
    }, e.prototype.getCalculatedOffset = function (t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {top: e.top + e.height / 2 - o / 2, left: e.left - i} : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }, e.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
        var n = {top: 0, left: 0};
        if (!this.$viewport)return n;
        var s = this.options.viewport && this.options.viewport.padding || 0, a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - s - a.scroll, l = e.top + s - a.scroll + o;
            r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l)
        } else {
            var h = e.left - s, d = e.left + s + i;
            h < a.left ? n.left = a.left - h : d > a.right && (n.left = a.left + a.width - d)
        }
        return n
    }, e.prototype.getTitle = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, e.prototype.getUID = function (t) {
        do {
            t += ~~(1e6 * Math.random())
        } while (document.getElementById(t));
        return t
    }, e.prototype.tip = function () {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length))throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, e.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, e.prototype.enable = function () {
        this.enabled = !0
    }, e.prototype.disable = function () {
        this.enabled = !1
    }, e.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, e.prototype.toggle = function (e) {
        var i = this;
        e && ((i = t(e.currentTarget).data("bs." + this.type)) || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, e.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function (i) {
        return this.each(function () {
            var o = t(this), n = o.data("bs.tooltip"), s = "object" == typeof i && i;
            !n && /destroy|hide/.test(i) || (n || o.data("bs.tooltip", n = new e(this, s)), "string" == typeof i && n[i]())
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = i, this
    }
}(jQuery), function (t) {
    "use strict";
    var e = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip)throw new Error("Popover requires tooltip.js");
    e.VERSION = "3.3.7", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function () {
        return e.DEFAULTS
    }, e.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, e.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, e.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, e.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = t.fn.popover;
    t.fn.popover = function (i) {
        return this.each(function () {
            var o = t(this), n = o.data("bs.popover"), s = "object" == typeof i && i;
            !n && /destroy|hide/.test(i) || (n || o.data("bs.popover", n = new e(this, s)), "string" == typeof i && n[i]())
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function () {
        return t.fn.popover = i, this
    }
}(jQuery), function (t) {
    "use strict";
    function e(i, o) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function () {
            var o = t(this), n = o.data("bs.scrollspy"), s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this, s)), "string" == typeof i && n[i]()
        })
    }

    e.VERSION = "3.3.7", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = this, i = "offset", o = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var e = t(this), n = e.data("target") || e.attr("href"), s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [[s[i]().top + o, n]] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(),
            o = this.options.offset + i - this.$scrollElement.height(), n = this.offsets, s = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o)return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0])return this.activeTarget = null, this.clear();
        for (t = n.length; t--;)a != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = o, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]()
        })
    }

    var i = function (e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"), s = t.Event("hide.bs.tab", {relatedTarget: e[0]}),
                a = t.Event("show.bs.tab", {relatedTarget: n[0]});
            if (n.trigger(s), e.trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var r = t(o);
                this.activate(e.closest("li"), i), this.activate(r, r.parent(), function () {
                    n.trigger({type: "hidden.bs.tab", relatedTarget: e[0]}), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function (e, o, n) {
        function s() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), n && n()
        }

        var a = o.find("> .active"),
            r = n && t.support.transition && (a.length && a.hasClass("fade") || !!o.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), a.removeClass("in")
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
        return t.fn.tab = o, this
    };
    var n = function (i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery), function (t) {
    "use strict";
    function e(e) {
        return this.each(function () {
            var o = t(this), n = o.data("bs.affix"), s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this, s)), "string" == typeof e && n[e]()
        })
    }

    var i = function (e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.7", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function (t, e, i, o) {
        var n = this.$target.scrollTop(), s = this.$element.offset(), a = this.$target.height();
        if (null != i && "top" == this.affixed)return n < i && "top";
        if ("bottom" == this.affixed)return null != i ? !(n + this.unpin <= s.top) && "bottom" : !(n + a <= t - o) && "bottom";
        var r = null == this.affixed, l = r ? n : s.top, h = r ? a : e;
        return null != i && n <= i ? "top" : null != o && l + h >= t - o && "bottom"
    }, i.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset)return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(), e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), o = this.options.offset, n = o.top, s = o.bottom,
                a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof o && (s = n = o), "function" == typeof n && (n = o.top(this.$element)), "function" == typeof s && (s = o.bottom(this.$element));
            var r = this.getState(a, e, n, s);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r : ""), h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented())return;
                this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == r && this.$element.offset({top: a - e - s})
        }
    };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
        return t.fn.affix = o, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var i = t(this), o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o)
        })
    })
}(jQuery);
!function (e, n) {
    var o = e();
    e.fn.dropdownHover = function (t) {
        return "ontouchstart" in document ? this : (o = o.add(this.parent()), this.each(function () {
            function r() {
                d.parents(".navbar").find(".navbar-toggle").is(":visible") || (n.clearTimeout(a), n.clearTimeout(i), i = n.setTimeout(function () {
                    o.find(":focus").blur(), !0 === c.instantlyCloseOthers && o.removeClass("open"), n.clearTimeout(i), d.attr("aria-expanded", "true"), s.addClass("open"), d.trigger(h)
                }, c.hoverDelay))
            }

            var a, i, d = e(this), s = d.parent(), u = {delay: 500, hoverDelay: 0, instantlyCloseOthers: !0}, l = {
                delay: e(this).data("delay"),
                hoverDelay: e(this).data("hover-delay"),
                instantlyCloseOthers: e(this).data("close-others")
            }, h = "show.bs.dropdown", c = e.extend(!0, {}, u, t, l);
            s.hover(function (e) {
                return !s.hasClass("open") && !d.is(e.target) || void r()
            }, function () {
                n.clearTimeout(i), a = n.setTimeout(function () {
                    d.attr("aria-expanded", "false"), s.removeClass("open"), d.trigger("hide.bs.dropdown")
                }, c.delay)
            }), d.hover(function (e) {
                return !s.hasClass("open") && !s.is(e.target) || void r()
            }), s.find(".dropdown-submenu").each(function () {
                var o, t = e(this);
                t.hover(function () {
                    n.clearTimeout(o), t.children(".dropdown-menu").show(), t.siblings().children(".dropdown-menu").hide()
                }, function () {
                    var e = t.children(".dropdown-menu");
                    o = n.setTimeout(function () {
                        e.hide()
                    }, c.delay)
                })
            })
        }))
    }, e(document).ready(function () {
        e('[data-hover="dropdown"]').dropdownHover()
    })
}(jQuery, window);
!function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function (e) {
    "use strict";
    function t(t) {
        return !t.nodeName || -1 !== e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
    }

    function o(t) {
        return e.isFunction(t) || e.isPlainObject(t) ? t : {top: t, left: t}
    }

    var n = e.scrollTo = function (t, o, n) {
        return e(window).scrollTo(t, o, n)
    };
    return n.defaults = {axis: "xy", duration: 0, limit: !0}, e.fn.scrollTo = function (r, i, s) {
        "object" == typeof i && (s = i, i = 0), "function" == typeof s && (s = {onAfter: s}), "max" === r && (r = 9e9), s = e.extend({}, n.defaults, s), i = i || s.duration;
        var a = s.queue && s.axis.length > 1;
        return a && (i /= 2), s.offset = o(s.offset), s.over = o(s.over), this.each(function () {
            function f(t) {
                var o = e.extend({}, s, {
                    queue: !0, duration: i, complete: t && function () {
                        t.call(l, m, s)
                    }
                });
                d.animate(p, o)
            }

            if (null !== r) {
                var u, c = t(this), l = c ? this.contentWindow || window : this, d = e(l), m = r, p = {};
                switch (typeof m) {
                    case"number":
                    case"string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(m)) {
                            m = o(m);
                            break
                        }
                        if (!(m = c ? e(m) : e(m, l)).length)return;
                    case"object":
                        (m.is || m.style) && (u = (m = e(m)).offset())
                }
                var h = e.isFunction(s.offset) && s.offset(l, m) || s.offset;
                e.each(s.axis.split(""), function (e, t) {
                    var o = "x" === t ? "Left" : "Top", r = o.toLowerCase(), i = "scroll" + o, x = d[i](),
                        v = n.max(l, t);
                    if (u) p[i] = u[r] + (c ? 0 : x - d.offset()[r]), s.margin && (p[i] -= parseInt(m.css("margin" + o), 10) || 0, p[i] -= parseInt(m.css("border" + o + "Width"), 10) || 0), p[i] += h[r] || 0, s.over[r] && (p[i] += m["x" === t ? "width" : "height"]() * s.over[r]); else {
                        var w = m[r];
                        p[i] = w.slice && "%" === w.slice(-1) ? parseFloat(w) / 100 * v : w
                    }
                    s.limit && /^\d+$/.test(p[i]) && (p[i] = p[i] <= 0 ? 0 : Math.min(p[i], v)), !e && s.axis.length > 1 && (x === p[i] ? p = {} : a && (f(s.onAfterFirst), p = {}))
                }), f(s.onAfter)
            }
        })
    }, n.max = function (o, n) {
        var r = "x" === n ? "Width" : "Height", i = "scroll" + r;
        if (!t(o))return o[i] - e(o)[r.toLowerCase()]();
        var s = "client" + r, a = o.ownerDocument || o.document, f = a.documentElement, u = a.body;
        return Math.max(f[i], u[i]) - Math.min(f[s], u[s])
    }, e.Tween.propHooks.scrollLeft = e.Tween.propHooks.scrollTop = {
        get: function (t) {
            return e(t.elem)[t.prop]()
        }, set: function (t) {
            var o = this.get(t);
            if (t.options.interrupt && t._last && t._last !== o)return e(t.elem).stop();
            var n = Math.round(t.now);
            o !== n && (e(t.elem)[t.prop](n), t._last = this.get(t))
        }
    }, n
});
!function (e) {
    var t = !0;
    e.flexslider = function (a, n) {
        var i = e(a);
        i.vars = e.extend({}, e.flexslider.defaults, n);
        var s, r = i.vars.namespace, o = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            l = ("ontouchstart" in window || o || window.DocumentTouch && document instanceof DocumentTouch) && i.vars.touch,
            c = "click touchend MSPointerUp keyup", d = "", u = "vertical" === i.vars.direction, v = i.vars.reverse,
            p = i.vars.itemWidth > 0, m = "fade" === i.vars.animation, f = "" !== i.vars.asNavFor, g = {};
        e.data(a, "flexslider", i), g = {
            init: function () {
                i.animating = !1, i.currentSlide = parseInt(i.vars.startAt ? i.vars.startAt : 0, 10), isNaN(i.currentSlide) && (i.currentSlide = 0), i.animatingTo = i.currentSlide, i.atEnd = 0 === i.currentSlide || i.currentSlide === i.last, i.containerSelector = i.vars.selector.substr(0, i.vars.selector.search(" ")), i.slides = e(i.vars.selector, i), i.container = e(i.containerSelector, i), i.count = i.slides.length, i.syncExists = e(i.vars.sync).length > 0, "slide" === i.vars.animation && (i.vars.animation = "swing"), i.prop = u ? "top" : "marginLeft", i.args = {}, i.manualPause = !1, i.stopped = !1, i.started = !1, i.startTimeout = null, i.transitions = !i.vars.video && !m && i.vars.useCSS && function () {
                        var e = document.createElement("div"),
                            t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                        for (var a in t)if (void 0 !== e.style[t[a]])return i.pfx = t[a].replace("Perspective", "").toLowerCase(), i.prop = "-" + i.pfx + "-transform", !0;
                        return !1
                    }(), i.ensureAnimationEnd = "", "" !== i.vars.controlsContainer && (i.controlsContainer = e(i.vars.controlsContainer).length > 0 && e(i.vars.controlsContainer)), "" !== i.vars.manualControls && (i.manualControls = e(i.vars.manualControls).length > 0 && e(i.vars.manualControls)), "" !== i.vars.customDirectionNav && (i.customDirectionNav = 2 === e(i.vars.customDirectionNav).length && e(i.vars.customDirectionNav)), i.vars.randomize && (i.slides.sort(function () {
                    return Math.round(Math.random()) - .5
                }), i.container.empty().append(i.slides)), i.doMath(), i.setup("init"), i.vars.controlNav && g.controlNav.setup(), i.vars.directionNav && g.directionNav.setup(), i.vars.keyboard && (1 === e(i.containerSelector).length || i.vars.multipleKeyboard) && e(document).bind("keyup", function (e) {
                    var t = e.keyCode;
                    if (!i.animating && (39 === t || 37 === t)) {
                        var a = 39 === t ? i.getTarget("next") : 37 === t && i.getTarget("prev");
                        i.flexAnimate(a, i.vars.pauseOnAction)
                    }
                }), i.vars.mousewheel && i.bind("mousewheel", function (e, t, a, n) {
                    e.preventDefault();
                    var s = 0 > t ? i.getTarget("next") : i.getTarget("prev");
                    i.flexAnimate(s, i.vars.pauseOnAction)
                }), i.vars.pausePlay && g.pausePlay.setup(), i.vars.slideshow && i.vars.pauseInvisible && g.pauseInvisible.init(), i.vars.slideshow && (i.vars.pauseOnHover && i.hover(function () {
                    i.manualPlay || i.manualPause || i.pause()
                }, function () {
                    i.manualPause || i.manualPlay || i.stopped || i.play()
                }), i.vars.pauseInvisible && g.pauseInvisible.isHidden() || (i.vars.initDelay > 0 ? i.startTimeout = setTimeout(i.play, i.vars.initDelay) : i.play())), f && g.asNav.setup(), l && i.vars.touch && g.touch(), (!m || m && i.vars.smoothHeight) && e(window).bind("resize orientationchange focus", g.resize), i.find("img").attr("draggable", "false"), setTimeout(function () {
                    i.vars.start(i)
                }, 200)
            }, asNav: {
                setup: function () {
                    i.asNav = !0, i.animatingTo = Math.floor(i.currentSlide / i.move), i.currentItem = i.currentSlide, i.slides.removeClass(r + "active-slide").eq(i.currentItem).addClass(r + "active-slide"), o ? (a._slider = i, i.slides.each(function () {
                        var t = this;
                        t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", function (e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), t.addEventListener("MSGestureTap", function (t) {
                            t.preventDefault();
                            var a = e(this), n = a.index();
                            e(i.vars.asNavFor).data("flexslider").animating || a.hasClass("active") || (i.direction = i.currentItem < n ? "next" : "prev", i.flexAnimate(n, i.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : i.slides.on(c, function (t) {
                        t.preventDefault();
                        var a = e(this), n = a.index();
                        0 >= a.offset().left - e(i).scrollLeft() && a.hasClass(r + "active-slide") ? i.flexAnimate(i.getTarget("prev"), !0) : e(i.vars.asNavFor).data("flexslider").animating || a.hasClass(r + "active-slide") || (i.direction = i.currentItem < n ? "next" : "prev", i.flexAnimate(n, i.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            }, controlNav: {
                setup: function () {
                    i.manualControls ? g.controlNav.setupManual() : g.controlNav.setupPaging()
                }, setupPaging: function () {
                    var t, a, n = "thumbnails" === i.vars.controlNav ? "control-thumbs" : "control-paging", s = 1;
                    if (i.controlNavScaffold = e('<ol class="' + r + "control-nav " + r + n + '"></ol>'), i.pagingCount > 1)for (var o = 0; o < i.pagingCount; o++) {
                        void 0 === (a = i.slides.eq(o)).attr("data-thumb-alt") && a.attr("data-thumb-alt", "");
                        var l = "" !== a.attr("data-thumb-alt") ? l = ' alt="' + a.attr("data-thumb-alt") + '"' : "";
                        if (t = "thumbnails" === i.vars.controlNav ? '<img src="' + a.attr("data-thumb") + '"' + l + "/>" : '<a href="#">' + s + "</a>", "thumbnails" === i.vars.controlNav && !0 === i.vars.thumbCaptions) {
                            var u = a.attr("data-thumbcaption");
                            "" !== u && void 0 !== u && (t += '<span class="' + r + 'caption">' + u + "</span>")
                        }
                        i.controlNavScaffold.append("<li>" + t + "</li>"), s++
                    }
                    i.controlsContainer ? e(i.controlsContainer).append(i.controlNavScaffold) : i.append(i.controlNavScaffold), g.controlNav.set(), g.controlNav.active(), i.controlNavScaffold.delegate("a, img", c, function (t) {
                        if (t.preventDefault(), "" === d || d === t.type) {
                            var a = e(this), n = i.controlNav.index(a);
                            a.hasClass(r + "active") || (i.direction = n > i.currentSlide ? "next" : "prev", i.flexAnimate(n, i.vars.pauseOnAction))
                        }
                        "" === d && (d = t.type), g.setToClearWatchedEvent()
                    })
                }, setupManual: function () {
                    i.controlNav = i.manualControls, g.controlNav.active(), i.controlNav.bind(c, function (t) {
                        if (t.preventDefault(), "" === d || d === t.type) {
                            var a = e(this), n = i.controlNav.index(a);
                            a.hasClass(r + "active") || (n > i.currentSlide ? i.direction = "next" : i.direction = "prev", i.flexAnimate(n, i.vars.pauseOnAction))
                        }
                        "" === d && (d = t.type), g.setToClearWatchedEvent()
                    })
                }, set: function () {
                    var t = "thumbnails" === i.vars.controlNav ? "img" : "a";
                    i.controlNav = e("." + r + "control-nav li " + t, i.controlsContainer ? i.controlsContainer : i)
                }, active: function () {
                    i.controlNav.removeClass(r + "active").eq(i.animatingTo).addClass(r + "active")
                }, update: function (t, a) {
                    i.pagingCount > 1 && "add" === t ? i.controlNavScaffold.append(e('<li><a href="#">' + i.count + "</a></li>")) : 1 === i.pagingCount ? i.controlNavScaffold.find("li").remove() : i.controlNav.eq(a).closest("li").remove(), g.controlNav.set(), i.pagingCount > 1 && i.pagingCount !== i.controlNav.length ? i.update(a, t) : g.controlNav.active()
                }
            }, directionNav: {
                setup: function () {
                    var t = e('<ul class="' + r + 'direction-nav"><li class="' + r + 'nav-prev"><a class="' + r + 'prev" href="#">' + i.vars.prevText + '</a></li><li class="' + r + 'nav-next"><a class="' + r + 'next" href="#">' + i.vars.nextText + "</a></li></ul>");
                    i.customDirectionNav ? i.directionNav = i.customDirectionNav : i.controlsContainer ? (e(i.controlsContainer).append(t), i.directionNav = e("." + r + "direction-nav li a", i.controlsContainer)) : (i.append(t), i.directionNav = e("." + r + "direction-nav li a", i)), g.directionNav.update(), i.directionNav.bind(c, function (t) {
                        t.preventDefault();
                        var a;
                        ("" === d || d === t.type) && (a = e(this).hasClass(r + "next") ? i.getTarget("next") : i.getTarget("prev"), i.flexAnimate(a, i.vars.pauseOnAction)), "" === d && (d = t.type), g.setToClearWatchedEvent()
                    })
                }, update: function () {
                    var e = r + "disabled";
                    1 === i.pagingCount ? i.directionNav.addClass(e).attr("tabindex", "-1") : i.vars.animationLoop ? i.directionNav.removeClass(e).removeAttr("tabindex") : 0 === i.animatingTo ? i.directionNav.removeClass(e).filter("." + r + "prev").addClass(e).attr("tabindex", "-1") : i.animatingTo === i.last ? i.directionNav.removeClass(e).filter("." + r + "next").addClass(e).attr("tabindex", "-1") : i.directionNav.removeClass(e).removeAttr("tabindex")
                }
            }, pausePlay: {
                setup: function () {
                    var t = e('<div class="' + r + 'pauseplay"><a href="#"></a></div>');
                    i.controlsContainer ? (i.controlsContainer.append(t), i.pausePlay = e("." + r + "pauseplay a", i.controlsContainer)) : (i.append(t), i.pausePlay = e("." + r + "pauseplay a", i)), g.pausePlay.update(i.vars.slideshow ? r + "pause" : r + "play"), i.pausePlay.bind(c, function (t) {
                        t.preventDefault(), ("" === d || d === t.type) && (e(this).hasClass(r + "pause") ? (i.manualPause = !0, i.manualPlay = !1, i.pause()) : (i.manualPause = !1, i.manualPlay = !0, i.play())), "" === d && (d = t.type), g.setToClearWatchedEvent()
                    })
                }, update: function (e) {
                    "play" === e ? i.pausePlay.removeClass(r + "pause").addClass(r + "play").html(i.vars.playText) : i.pausePlay.removeClass(r + "play").addClass(r + "pause").html(i.vars.pauseText)
                }
            }, touch: function () {
                var e, t, n, s, r, l, c, d, f, g = !1, h = 0, S = 0, y = 0;
                o ? (a.style.msTouchAction = "none", a._gesture = new MSGesture, a._gesture.target = a, a.addEventListener("MSPointerDown", function (e) {
                    e.stopPropagation(), i.animating ? e.preventDefault() : (i.pause(), a._gesture.addPointer(e.pointerId), y = 0, s = u ? i.h : i.w, l = Number(new Date), n = p && v && i.animatingTo === i.last ? 0 : p && v ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : p && i.currentSlide === i.last ? i.limit : p ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide : v ? (i.last - i.currentSlide + i.cloneOffset) * s : (i.currentSlide + i.cloneOffset) * s)
                }, !1), a._slider = i, a.addEventListener("MSGestureChange", function (e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        var i = -e.translationX, o = -e.translationY;
                        return y += u ? o : i, r = y, g = u ? Math.abs(y) < Math.abs(-i) : Math.abs(y) < Math.abs(-o), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
                            a._gesture.stop()
                        }) : void((!g || Number(new Date) - l > 500) && (e.preventDefault(), !m && t.transitions && (t.vars.animationLoop || (r = y / (0 === t.currentSlide && 0 > y || t.currentSlide === t.last && y > 0 ? Math.abs(y) / s + 2 : 1)), t.setProps(n + r, "setTouch"))))
                    }
                }, !1), a.addEventListener("MSGestureEnd", function (a) {
                    a.stopPropagation();
                    var i = a.target._slider;
                    if (i) {
                        if (i.animatingTo === i.currentSlide && !g && null !== r) {
                            var o = v ? -r : r, c = o > 0 ? i.getTarget("next") : i.getTarget("prev");
                            i.canAdvance(c) && (Number(new Date) - l < 550 && Math.abs(o) > 50 || Math.abs(o) > s / 2) ? i.flexAnimate(c, i.vars.pauseOnAction) : m || i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0)
                        }
                        e = null, t = null, r = null, n = null, y = 0
                    }
                }, !1)) : (c = function (r) {
                    i.animating ? r.preventDefault() : (window.navigator.msPointerEnabled || 1 === r.touches.length) && (i.pause(), s = u ? i.h : i.w, l = Number(new Date), h = r.touches[0].pageX, S = r.touches[0].pageY, n = p && v && i.animatingTo === i.last ? 0 : p && v ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : p && i.currentSlide === i.last ? i.limit : p ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide : v ? (i.last - i.currentSlide + i.cloneOffset) * s : (i.currentSlide + i.cloneOffset) * s, e = u ? S : h, t = u ? h : S, a.addEventListener("touchmove", d, !1), a.addEventListener("touchend", f, !1))
                }, d = function (a) {
                    h = a.touches[0].pageX, S = a.touches[0].pageY, r = u ? e - S : e - h;
                    (!(g = u ? Math.abs(r) < Math.abs(h - t) : Math.abs(r) < Math.abs(S - t)) || Number(new Date) - l > 500) && (a.preventDefault(), !m && i.transitions && (i.vars.animationLoop || (r /= 0 === i.currentSlide && 0 > r || i.currentSlide === i.last && r > 0 ? Math.abs(r) / s + 2 : 1), i.setProps(n + r, "setTouch")))
                }, f = function (o) {
                    if (a.removeEventListener("touchmove", d, !1), i.animatingTo === i.currentSlide && !g && null !== r) {
                        var c = v ? -r : r, u = c > 0 ? i.getTarget("next") : i.getTarget("prev");
                        i.canAdvance(u) && (Number(new Date) - l < 550 && Math.abs(c) > 50 || Math.abs(c) > s / 2) ? i.flexAnimate(u, i.vars.pauseOnAction) : m || i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0)
                    }
                    a.removeEventListener("touchend", f, !1), e = null, t = null, r = null, n = null
                }, a.addEventListener("touchstart", c, !1))
            }, resize: function () {
                !i.animating && i.is(":visible") && (p || i.doMath(), m ? g.smoothHeight() : p ? (i.slides.width(i.computedW), i.update(i.pagingCount), i.setProps()) : u ? (i.viewport.height(i.h), i.setProps(i.h, "setTotal")) : (i.vars.smoothHeight && g.smoothHeight(), i.newSlides.width(i.computedW), i.setProps(i.computedW, "setTotal")))
            }, smoothHeight: function (e) {
                if (!u || m) {
                    var t = m ? i : i.viewport;
                    e ? t.animate({height: i.slides.eq(i.animatingTo).innerHeight()}, e) : t.innerHeight(i.slides.eq(i.animatingTo).innerHeight())
                }
            }, sync: function (t) {
                var a = e(i.vars.sync).data("flexslider"), n = i.animatingTo;
                switch (t) {
                    case"animate":
                        a.flexAnimate(n, i.vars.pauseOnAction, !1, !0);
                        break;
                    case"play":
                        a.playing || a.asNav || a.play();
                        break;
                    case"pause":
                        a.pause()
                }
            }, uniqueID: function (t) {
                return t.filter("[id]").add(t.find("[id]")).each(function () {
                    var t = e(this);
                    t.attr("id", t.attr("id") + "_clone")
                }), t
            }, pauseInvisible: {
                visProp: null, init: function () {
                    var e = g.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function () {
                            g.pauseInvisible.isHidden() ? i.startTimeout ? clearTimeout(i.startTimeout) : i.pause() : i.started ? i.play() : i.vars.initDelay > 0 ? setTimeout(i.play, i.vars.initDelay) : i.play()
                        })
                    }
                }, isHidden: function () {
                    var e = g.pauseInvisible.getHiddenProp();
                    return !!e && document[e]
                }, getHiddenProp: function () {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document)return "hidden";
                    for (var t = 0; t < e.length; t++)if (e[t] + "Hidden" in document)return e[t] + "Hidden";
                    return null
                }
            }, setToClearWatchedEvent: function () {
                clearTimeout(s), s = setTimeout(function () {
                    d = ""
                }, 3e3)
            }
        }, i.flexAnimate = function (t, a, n, s, o) {
            if (i.vars.animationLoop || t === i.currentSlide || (i.direction = t > i.currentSlide ? "next" : "prev"), f && 1 === i.pagingCount && (i.direction = i.currentItem < t ? "next" : "prev"), !i.animating && (i.canAdvance(t, o) || n) && i.is(":visible")) {
                if (f && s) {
                    var c = e(i.vars.asNavFor).data("flexslider");
                    if (i.atEnd = 0 === t || t === i.count - 1, c.flexAnimate(t, !0, !1, !0, o), i.direction = i.currentItem < t ? "next" : "prev", c.direction = i.direction, Math.ceil((t + 1) / i.visible) - 1 === i.currentSlide || 0 === t)return i.currentItem = t, i.slides.removeClass(r + "active-slide").eq(t).addClass(r + "active-slide"), !1;
                    i.currentItem = t, i.slides.removeClass(r + "active-slide").eq(t).addClass(r + "active-slide"), t = Math.floor(t / i.visible)
                }
                if (i.animating = !0, i.animatingTo = t, a && i.pause(), i.vars.before(i), i.syncExists && !o && g.sync("animate"), i.vars.controlNav && g.controlNav.active(), p || i.slides.removeClass(r + "active-slide").eq(t).addClass(r + "active-slide"), i.atEnd = 0 === t || t === i.last, i.vars.directionNav && g.directionNav.update(), t === i.last && (i.vars.end(i), i.vars.animationLoop || i.pause()), m) l ? (i.slides.eq(i.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), i.slides.eq(t).css({
                    opacity: 1,
                    zIndex: 2
                }), i.wrapup(y)) : (i.slides.eq(i.currentSlide).css({zIndex: 1}).animate({opacity: 0}, i.vars.animationSpeed, i.vars.easing), i.slides.eq(t).css({zIndex: 2}).animate({opacity: 1}, i.vars.animationSpeed, i.vars.easing, i.wrapup)); else {
                    var d, h, S, y = u ? i.slides.filter(":first").height() : i.computedW;
                    p ? (d = i.vars.itemMargin, S = (i.itemW + d) * i.move * i.animatingTo, h = S > i.limit && 1 !== i.visible ? i.limit : S) : h = 0 === i.currentSlide && t === i.count - 1 && i.vars.animationLoop && "next" !== i.direction ? v ? (i.count + i.cloneOffset) * y : 0 : i.currentSlide === i.last && 0 === t && i.vars.animationLoop && "prev" !== i.direction ? v ? 0 : (i.count + 1) * y : v ? (i.count - 1 - t + i.cloneOffset) * y : (t + i.cloneOffset) * y, i.setProps(h, "", i.vars.animationSpeed), i.transitions ? (i.vars.animationLoop && i.atEnd || (i.animating = !1, i.currentSlide = i.animatingTo), i.container.unbind("webkitTransitionEnd transitionend"), i.container.bind("webkitTransitionEnd transitionend", function () {
                        clearTimeout(i.ensureAnimationEnd), i.wrapup(y)
                    }), clearTimeout(i.ensureAnimationEnd), i.ensureAnimationEnd = setTimeout(function () {
                        i.wrapup(y)
                    }, i.vars.animationSpeed + 100)) : i.container.animate(i.args, i.vars.animationSpeed, i.vars.easing, function () {
                        i.wrapup(y)
                    })
                }
                i.vars.smoothHeight && g.smoothHeight(i.vars.animationSpeed)
            }
        }, i.wrapup = function (e) {
            m || p || (0 === i.currentSlide && i.animatingTo === i.last && i.vars.animationLoop ? i.setProps(e, "jumpEnd") : i.currentSlide === i.last && 0 === i.animatingTo && i.vars.animationLoop && i.setProps(e, "jumpStart")), i.animating = !1, i.currentSlide = i.animatingTo, i.vars.after(i)
        }, i.animateSlides = function () {
            !i.animating && t && i.flexAnimate(i.getTarget("next"))
        }, i.pause = function () {
            clearInterval(i.animatedSlides), i.animatedSlides = null, i.playing = !1, i.vars.pausePlay && g.pausePlay.update("play"), i.syncExists && g.sync("pause")
        }, i.play = function () {
            i.playing && clearInterval(i.animatedSlides), i.animatedSlides = i.animatedSlides || setInterval(i.animateSlides, i.vars.slideshowSpeed), i.started = i.playing = !0, i.vars.pausePlay && g.pausePlay.update("pause"), i.syncExists && g.sync("play")
        }, i.stop = function () {
            i.pause(), i.stopped = !0
        }, i.canAdvance = function (e, t) {
            var a = f ? i.pagingCount - 1 : i.last;
            return !!t || (!(!f || i.currentItem !== i.count - 1 || 0 !== e || "prev" !== i.direction) || (!f || 0 !== i.currentItem || e !== i.pagingCount - 1 || "next" === i.direction) && (!(e === i.currentSlide && !f) && (!!i.vars.animationLoop || (!i.atEnd || 0 !== i.currentSlide || e !== a || "next" === i.direction) && (!i.atEnd || i.currentSlide !== a || 0 !== e || "next" !== i.direction))))
        }, i.getTarget = function (e) {
            return i.direction = e, "next" === e ? i.currentSlide === i.last ? 0 : i.currentSlide + 1 : 0 === i.currentSlide ? i.last : i.currentSlide - 1
        }, i.setProps = function (e, t, a) {
            var n = function () {
                var a = e || (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo;
                return -1 * function () {
                        if (p)return "setTouch" === t ? e : v && i.animatingTo === i.last ? 0 : v ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo : i.animatingTo === i.last ? i.limit : a;
                        switch (t) {
                            case"setTotal":
                                return v ? (i.count - 1 - i.currentSlide + i.cloneOffset) * e : (i.currentSlide + i.cloneOffset) * e;
                            case"setTouch":
                                return e;
                            case"jumpEnd":
                                return v ? e : i.count * e;
                            case"jumpStart":
                                return v ? i.count * e : e;
                            default:
                                return e
                        }
                    }() + "px"
            }();
            i.transitions && (n = u ? "translate3d(0," + n + ",0)" : "translate3d(" + n + ",0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", i.container.css("-" + i.pfx + "-transition-duration", a), i.container.css("transition-duration", a)), i.args[i.prop] = n, (i.transitions || void 0 === a) && i.container.css(i.args), i.container.css("transform", n)
        }, i.setup = function (t) {
            if (m) i.slides.css({
                width: "100%",
                float: "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === t && (l ? i.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + i.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(i.currentSlide).css({opacity: 1, zIndex: 2}) : 0 == i.vars.fadeFirstSlide ? i.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(i.currentSlide).css({zIndex: 2}).css({opacity: 1}) : i.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(i.currentSlide).css({zIndex: 2}).animate({opacity: 1}, i.vars.animationSpeed, i.vars.easing)), i.vars.smoothHeight && g.smoothHeight(); else {
                var a, n;
                "init" === t && (i.viewport = e('<div class="' + r + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(i).append(i.container), i.cloneCount = 0, i.cloneOffset = 0, v && (n = e.makeArray(i.slides).reverse(), i.slides = e(n), i.container.empty().append(i.slides))), i.vars.animationLoop && !p && (i.cloneCount = 2, i.cloneOffset = 1, "init" !== t && i.container.find(".clone").remove(), i.container.append(g.uniqueID(i.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(g.uniqueID(i.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), i.newSlides = e(i.vars.selector, i), a = v ? i.count - 1 - i.currentSlide + i.cloneOffset : i.currentSlide + i.cloneOffset, u && !p ? (i.container.height(200 * (i.count + i.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
                    i.newSlides.css({display: "block"}), i.doMath(), i.viewport.height(i.h), i.setProps(a * i.h, "init")
                }, "init" === t ? 100 : 0)) : (i.container.width(200 * (i.count + i.cloneCount) + "%"), i.setProps(a * i.computedW, "init"), setTimeout(function () {
                    i.doMath(), i.newSlides.css({
                        width: i.computedW,
                        marginRight: i.computedM,
                        float: "left",
                        display: "block"
                    }), i.vars.smoothHeight && g.smoothHeight()
                }, "init" === t ? 100 : 0))
            }
            p || i.slides.removeClass(r + "active-slide").eq(i.currentSlide).addClass(r + "active-slide"), i.vars.init(i)
        }, i.doMath = function () {
            var e = i.slides.first(), t = i.vars.itemMargin, a = i.vars.minItems, n = i.vars.maxItems;
            i.w = void 0 === i.viewport ? i.width() : i.viewport.width(), i.h = e.height(), i.boxPadding = e.outerWidth() - e.width(), p ? (i.itemT = i.vars.itemWidth + t, i.itemM = t, i.minW = a ? a * i.itemT : i.w, i.maxW = n ? n * i.itemT - t : i.w, i.itemW = i.minW > i.w ? (i.w - t * (a - 1)) / a : i.maxW < i.w ? (i.w - t * (n - 1)) / n : i.vars.itemWidth > i.w ? i.w : i.vars.itemWidth, i.visible = Math.floor(i.w / i.itemW), i.move = i.vars.move > 0 && i.vars.move < i.visible ? i.vars.move : i.visible, i.pagingCount = Math.ceil((i.count - i.visible) / i.move + 1), i.last = i.pagingCount - 1, i.limit = 1 === i.pagingCount ? 0 : i.vars.itemWidth > i.w ? i.itemW * (i.count - 1) + t * (i.count - 1) : (i.itemW + t) * i.count - i.w - t) : (i.itemW = i.w, i.itemM = t, i.pagingCount = i.count, i.last = i.count - 1), i.computedW = i.itemW - i.boxPadding, i.computedM = i.itemM
        }, i.update = function (e, t) {
            i.doMath(), p || (e < i.currentSlide ? i.currentSlide += 1 : e <= i.currentSlide && 0 !== e && (i.currentSlide -= 1), i.animatingTo = i.currentSlide), i.vars.controlNav && !i.manualControls && ("add" === t && !p || i.pagingCount > i.controlNav.length ? g.controlNav.update("add") : ("remove" === t && !p || i.pagingCount < i.controlNav.length) && (p && i.currentSlide > i.last && (i.currentSlide -= 1, i.animatingTo -= 1), g.controlNav.update("remove", i.last))), i.vars.directionNav && g.directionNav.update()
        }, i.addSlide = function (t, a) {
            var n = e(t);
            i.count += 1, i.last = i.count - 1, u && v ? void 0 !== a ? i.slides.eq(i.count - a).after(n) : i.container.prepend(n) : void 0 !== a ? i.slides.eq(a).before(n) : i.container.append(n), i.update(a, "add"), i.slides = e(i.vars.selector + ":not(.clone)", i), i.setup(), i.vars.added(i)
        }, i.removeSlide = function (t) {
            var a = isNaN(t) ? i.slides.index(e(t)) : t;
            i.count -= 1, i.last = i.count - 1, isNaN(t) ? e(t, i.slides).remove() : u && v ? i.slides.eq(i.last).remove() : i.slides.eq(t).remove(), i.doMath(), i.update(a, "remove"), i.slides = e(i.vars.selector + ":not(.clone)", i), i.setup(), i.vars.removed(i)
        }, g.init()
    }, e(window).blur(function (e) {
        t = !1
    }).focus(function (e) {
        t = !0
    }), e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function () {
        },
        before: function () {
        },
        after: function () {
        },
        end: function () {
        },
        added: function () {
        },
        removed: function () {
        },
        init: function () {
        }
    }, e.fn.flexslider = function (t) {
        if (void 0 === t && (t = {}), "object" == typeof t)return this.each(function () {
            var a = e(this), n = t.selector ? t.selector : ".slides > li", i = a.find(n);
            1 === i.length && !1 === t.allowOneSlide || 0 === i.length ? (i.fadeIn(400), t.start && t.start(a)) : void 0 === a.data("flexslider") && new e.flexslider(this, t)
        });
        var a = e(this).data("flexslider");
        switch (t) {
            case"play":
                a.play();
                break;
            case"pause":
                a.pause();
                break;
            case"stop":
                a.stop();
                break;
            case"next":
                a.flexAnimate(a.getTarget("next"), !0);
                break;
            case"prev":
            case"previous":
                a.flexAnimate(a.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof t && a.flexAnimate(t, !0)
        }
    }
}(jQuery);
$(document).ready(function () {
    function a(a) {
        $(a.target).prev(".panel-heading").find(".panel-title a").toggleClass("active").find("i.fa").toggleClass("fa-plus-square fa-minus-square")
    }

    $(".navbar-toggle").on("click", function () {
        $(this).toggleClass("active")
    }), $("body").scrollspy({target: "#page-nav-wrapper", offset: 100}), $(".scrollto").on("click", function (a) {
        var o = this.hash;
        a.preventDefault(), $("body").scrollTo(o, 800, {offset: -62, axis: "y"})
    }), $(".scrollto-no-offset").on("click", function (a) {
        var o = this.hash;
        a.preventDefault(), $("body").scrollTo(o, 800, {offset: 0, axis: "y"})
    }), $(window).on("scroll", function () {
        if ($("#page-nav-wrapper").removeClass("fixed"), $("#page-nav-wrapper").length) {
            var a = $(this).scrollTop();
            $("#page-nav-wrapper").offset().top > a ? ($("#page-nav-wrapper").removeClass("fixed"), $("body").removeClass("sticky-page-nav")) : ($("#page-nav-wrapper").addClass("fixed"), $("body").addClass("sticky-page-nav"))
        }
    }), $("#modal-video .close").on("click", function () {
        $("#modal-video iframe").attr("src", $("#modal-video iframe").attr("src"))
    }), $(".panel").on("hidden.bs.collapse", a), $(".panel").on("shown.bs.collapse", a), $("#signup-link").on("click", function (a) {
        $("#login-modal").modal("toggle"), $("#signup-modal").modal(), a.preventDefault()
    }), $("#login-link").on("click", function (a) {
        $("#signup-modal").modal("toggle"), $("#login-modal").modal(), a.preventDefault()
    }), $("#back-to-login-link").on("click", function (a) {
        $("#resetpass-modal").modal("toggle"), $("#login-modal").modal(), a.preventDefault()
    }), $("#resetpass-link").on("click", function (a) {
        $("#login-modal").modal("hide"), a.preventDefault()
    }), $("#testimonials-carousel").carousel({interval: 8e3})
});
!function () {
    "use strict";
    var e, a = function (t, s) {
        function r(e) {
            return Math.floor(e)
        }

        function i() {
            var e = y.params.autoplay, a = y.slides.eq(y.activeIndex);
            a.attr("data-swiper-autoplay") && (e = a.attr("data-swiper-autoplay") || y.params.autoplay), y.autoplayTimeoutId = setTimeout(function () {
                y.params.loop ? (y.fixLoop(), y._slideNext(), y.emit("onAutoplay", y)) : y.isEnd ? s.autoplayStopOnLast ? y.stopAutoplay() : (y._slideTo(0), y.emit("onAutoplay", y)) : (y._slideNext(), y.emit("onAutoplay", y))
            }, e)
        }

        function n(a, t) {
            var s = e(a.target);
            if (!s.is(t))if ("string" == typeof t) s = s.parents(t); else if (t.nodeType) {
                var r;
                return s.parents().each(function (e, a) {
                    a === t && (r = t)
                }), r ? t : void 0
            }
            if (0 !== s.length)return s[0]
        }

        function o(e, a) {
            a = a || {};
            var t = new (window.MutationObserver || window.WebkitMutationObserver)(function (e) {
                e.forEach(function (e) {
                    y.onResize(!0), y.emit("onObserverUpdate", y, e)
                })
            });
            t.observe(e, {
                attributes: void 0 === a.attributes || a.attributes,
                childList: void 0 === a.childList || a.childList,
                characterData: void 0 === a.characterData || a.characterData
            }), y.observers.push(t)
        }

        function l(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!y.params.allowSwipeToNext && (y.isHorizontal() && 39 === a || !y.isHorizontal() && 40 === a))return !1;
            if (!y.params.allowSwipeToPrev && (y.isHorizontal() && 37 === a || !y.isHorizontal() && 38 === a))return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (y.container.parents("." + y.params.slideClass).length > 0 && 0 === y.container.parents("." + y.params.slideActiveClass).length)return;
                    var s = {left: window.pageXOffset, top: window.pageYOffset}, r = window.innerWidth,
                        i = window.innerHeight, n = y.container.offset();
                    y.rtl && (n.left = n.left - y.container[0].scrollLeft);
                    for (var o = [[n.left, n.top], [n.left + y.width, n.top], [n.left, n.top + y.height], [n.left + y.width, n.top + y.height]], l = 0; l < o.length; l++) {
                        var p = o[l];
                        p[0] >= s.left && p[0] <= s.left + r && p[1] >= s.top && p[1] <= s.top + i && (t = !0)
                    }
                    if (!t)return
                }
                y.isHorizontal() ? (37 !== a && 39 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !y.rtl || 37 === a && y.rtl) && y.slideNext(), (37 === a && !y.rtl || 39 === a && y.rtl) && y.slidePrev()) : (38 !== a && 40 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && y.slideNext(), 38 === a && y.slidePrev()), y.emit("onKeyPress", y, a)
            }
        }

        function p(e) {
            var a = 0, t = 0, s = 0, r = 0;
            return "detail" in e && (t = e.detail), "wheelDelta" in e && (t = -e.wheelDelta / 120), "wheelDeltaY" in e && (t = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (a = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (a = t, t = 0), s = 10 * a, r = 10 * t, "deltaY" in e && (r = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || r) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, r *= 40) : (s *= 800, r *= 800)), s && !a && (a = s < 1 ? -1 : 1), r && !t && (t = r < 1 ? -1 : 1), {
                spinX: a,
                spinY: t,
                pixelX: s,
                pixelY: r
            }
        }

        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = 0, t = y.rtl ? -1 : 1, s = p(e);
            if (y.params.mousewheelForceToAxis)if (y.isHorizontal()) {
                if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY)))return;
                a = s.pixelX * t
            } else {
                if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX)))return;
                a = s.pixelY
            } else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * t : -s.pixelY;
            if (0 !== a) {
                if (y.params.mousewheelInvert && (a = -a), y.params.freeMode) {
                    var r = y.getWrapperTranslate() + a * y.params.mousewheelSensitivity, i = y.isBeginning,
                        n = y.isEnd;
                    if (r >= y.minTranslate() && (r = y.minTranslate()), r <= y.maxTranslate() && (r = y.maxTranslate()), y.setWrapperTransition(0), y.setWrapperTranslate(r), y.updateProgress(), y.updateActiveIndex(), (!i && y.isBeginning || !n && y.isEnd) && y.updateClasses(), y.params.freeModeSticky ? (clearTimeout(y.mousewheel.timeout), y.mousewheel.timeout = setTimeout(function () {
                            y.slideReset()
                        }, 300)) : y.params.lazyLoading && y.lazy && y.lazy.load(), y.emit("onScroll", y, e), y.params.autoplay && y.params.autoplayDisableOnInteraction && y.stopAutoplay(), 0 === r || r === y.maxTranslate())return
                } else {
                    if ((new window.Date).getTime() - y.mousewheel.lastScrollTime > 60)if (a < 0)if (y.isEnd && !y.params.loop || y.animating) {
                        if (y.params.mousewheelReleaseOnEdges)return !0
                    } else y.slideNext(), y.emit("onScroll", y, e); else if (y.isBeginning && !y.params.loop || y.animating) {
                        if (y.params.mousewheelReleaseOnEdges)return !0
                    } else y.slidePrev(), y.emit("onScroll", y, e);
                    y.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function m(a, t) {
            a = e(a);
            var s, r, i, n = y.rtl ? -1 : 1;
            s = a.attr("data-swiper-parallax") || "0", r = a.attr("data-swiper-parallax-x"), i = a.attr("data-swiper-parallax-y"), r || i ? (r = r || "0", i = i || "0") : y.isHorizontal() ? (r = s, i = "0") : (i = s, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t + "%" : i * t + "px", a.transform("translate3d(" + r + ", " + i + ",0px)")
        }

        function u(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }

        if (!(this instanceof a))return new a(t, s);
        var c = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
            flip: {slideShadows: !0, limitRotation: !0},
            cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
            fade: {crossFade: !1},
            parallax: !1,
            zoom: !1,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: !0,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: "container",
            hashnav: !1,
            hashnavWatchState: !1,
            history: !1,
            replaceState: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            normalizeSlideIndex: !0,
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            paginationClickableClass: "swiper-pagination-clickable",
            paginationModifierClass: "swiper-pagination-",
            lazyLoadingClass: "swiper-lazy",
            lazyStatusLoadingClass: "swiper-lazy-loading",
            lazyStatusLoadedClass: "swiper-lazy-loaded",
            lazyPreloaderClass: "swiper-lazy-preloader",
            notificationClass: "swiper-notification",
            preloaderClass: "preloader",
            zoomContainerClass: "swiper-zoom-container",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, g = s && s.virtualTranslate;
        s = s || {};
        var h = {};
        for (var v in s)if ("object" != typeof s[v] || null === s[v] || s[v].nodeType || s[v] === window || s[v] === document || "undefined" != typeof Dom7 && s[v] instanceof Dom7 || "undefined" != typeof jQuery && s[v] instanceof jQuery) h[v] = s[v]; else {
            h[v] = {};
            for (var f in s[v])h[v][f] = s[v][f]
        }
        for (var w in c)if (void 0 === s[w]) s[w] = c[w]; else if ("object" == typeof s[w])for (var x in c[w])void 0 === s[w][x] && (s[w][x] = c[w][x]);
        var y = this;
        if (y.params = s, y.originalParams = h, y.classNames = [], void 0 !== e && "undefined" != typeof Dom7 && (e = Dom7), (void 0 !== e || (e = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (y.$ = e, y.currentBreakpoint = void 0, y.getActiveBreakpoint = function () {
                if (!y.params.breakpoints)return !1;
                var e, a = !1, t = [];
                for (e in y.params.breakpoints)y.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function (e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var s = 0; s < t.length; s++)(e = t[s]) >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, y.setBreakpoint = function () {
                var e = y.getActiveBreakpoint();
                if (e && y.currentBreakpoint !== e) {
                    var a = e in y.params.breakpoints ? y.params.breakpoints[e] : y.originalParams,
                        t = y.params.loop && a.slidesPerView !== y.params.slidesPerView;
                    for (var s in a)y.params[s] = a[s];
                    y.currentBreakpoint = e, t && y.destroyLoop && y.reLoop(!0)
                }
            }, y.params.breakpoints && y.setBreakpoint(), y.container = e(t), 0 !== y.container.length)) {
            if (y.container.length > 1) {
                var T = [];
                return y.container.each(function () {
                    T.push(new a(this, s))
                }), T
            }
            y.container[0].swiper = y, y.container.data("swiper", y), y.classNames.push(y.params.containerModifierClass + y.params.direction), y.params.freeMode && y.classNames.push(y.params.containerModifierClass + "free-mode"), y.support.flexbox || (y.classNames.push(y.params.containerModifierClass + "no-flexbox"), y.params.slidesPerColumn = 1), y.params.autoHeight && y.classNames.push(y.params.containerModifierClass + "autoheight"), (y.params.parallax || y.params.watchSlidesVisibility) && (y.params.watchSlidesProgress = !0), y.params.touchReleaseOnEdges && (y.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(y.params.effect) >= 0 && (y.support.transforms3d ? (y.params.watchSlidesProgress = !0, y.classNames.push(y.params.containerModifierClass + "3d")) : y.params.effect = "slide"), "slide" !== y.params.effect && y.classNames.push(y.params.containerModifierClass + y.params.effect), "cube" === y.params.effect && (y.params.resistanceRatio = 0, y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.centeredSlides = !1, y.params.spaceBetween = 0, y.params.virtualTranslate = !0), "fade" !== y.params.effect && "flip" !== y.params.effect || (y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.watchSlidesProgress = !0, y.params.spaceBetween = 0, void 0 === g && (y.params.virtualTranslate = !0)), y.params.grabCursor && y.support.touch && (y.params.grabCursor = !1), y.wrapper = y.container.children("." + y.params.wrapperClass), y.params.pagination && (y.paginationContainer = e(y.params.pagination), y.params.uniqueNavElements && "string" == typeof y.params.pagination && y.paginationContainer.length > 1 && 1 === y.container.find(y.params.pagination).length && (y.paginationContainer = y.container.find(y.params.pagination)), "bullets" === y.params.paginationType && y.params.paginationClickable ? y.paginationContainer.addClass(y.params.paginationModifierClass + "clickable") : y.params.paginationClickable = !1, y.paginationContainer.addClass(y.params.paginationModifierClass + y.params.paginationType)), (y.params.nextButton || y.params.prevButton) && (y.params.nextButton && (y.nextButton = e(y.params.nextButton), y.params.uniqueNavElements && "string" == typeof y.params.nextButton && y.nextButton.length > 1 && 1 === y.container.find(y.params.nextButton).length && (y.nextButton = y.container.find(y.params.nextButton))), y.params.prevButton && (y.prevButton = e(y.params.prevButton), y.params.uniqueNavElements && "string" == typeof y.params.prevButton && y.prevButton.length > 1 && 1 === y.container.find(y.params.prevButton).length && (y.prevButton = y.container.find(y.params.prevButton)))), y.isHorizontal = function () {
                return "horizontal" === y.params.direction
            }, y.rtl = y.isHorizontal() && ("rtl" === y.container[0].dir.toLowerCase() || "rtl" === y.container.css("direction")), y.rtl && y.classNames.push(y.params.containerModifierClass + "rtl"), y.rtl && (y.wrongRTL = "-webkit-box" === y.wrapper.css("display")), y.params.slidesPerColumn > 1 && y.classNames.push(y.params.containerModifierClass + "multirow"), y.device.android && y.classNames.push(y.params.containerModifierClass + "android"), y.container.addClass(y.classNames.join(" ")), y.translate = 0, y.progress = 0, y.velocity = 0, y.lockSwipeToNext = function () {
                y.params.allowSwipeToNext = !1, !1 === y.params.allowSwipeToPrev && y.params.grabCursor && y.unsetGrabCursor()
            }, y.lockSwipeToPrev = function () {
                y.params.allowSwipeToPrev = !1, !1 === y.params.allowSwipeToNext && y.params.grabCursor && y.unsetGrabCursor()
            }, y.lockSwipes = function () {
                y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !1, y.params.grabCursor && y.unsetGrabCursor()
            }, y.unlockSwipeToNext = function () {
                y.params.allowSwipeToNext = !0, !0 === y.params.allowSwipeToPrev && y.params.grabCursor && y.setGrabCursor()
            }, y.unlockSwipeToPrev = function () {
                y.params.allowSwipeToPrev = !0, !0 === y.params.allowSwipeToNext && y.params.grabCursor && y.setGrabCursor()
            }, y.unlockSwipes = function () {
                y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !0, y.params.grabCursor && y.setGrabCursor()
            }, y.setGrabCursor = function (e) {
                y.container[0].style.cursor = "move", y.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", y.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", y.container[0].style.cursor = e ? "grabbing" : "grab"
            }, y.unsetGrabCursor = function () {
                y.container[0].style.cursor = ""
            }, y.params.grabCursor && y.setGrabCursor(), y.imagesToLoad = [], y.imagesLoaded = 0, y.loadImage = function (e, a, t, s, r, i) {
                function n() {
                    i && i()
                }

                var o;
                e.complete && r ? n() : a ? (o = new window.Image, o.onload = n, o.onerror = n, s && (o.sizes = s), t && (o.srcset = t), a && (o.src = a)) : n()
            }, y.preloadImages = function () {
                y.imagesToLoad = y.container.find("img");
                for (var e = 0; e < y.imagesToLoad.length; e++)y.loadImage(y.imagesToLoad[e], y.imagesToLoad[e].currentSrc || y.imagesToLoad[e].getAttribute("src"), y.imagesToLoad[e].srcset || y.imagesToLoad[e].getAttribute("srcset"), y.imagesToLoad[e].sizes || y.imagesToLoad[e].getAttribute("sizes"), !0, function () {
                    void 0 !== y && null !== y && y && (void 0 !== y.imagesLoaded && y.imagesLoaded++, y.imagesLoaded === y.imagesToLoad.length && (y.params.updateOnImagesReady && y.update(), y.emit("onImagesReady", y)))
                })
            }, y.autoplayTimeoutId = void 0, y.autoplaying = !1, y.autoplayPaused = !1, y.startAutoplay = function () {
                return void 0 === y.autoplayTimeoutId && !!y.params.autoplay && !y.autoplaying && (y.autoplaying = !0, y.emit("onAutoplayStart", y), void i())
            }, y.stopAutoplay = function (e) {
                y.autoplayTimeoutId && (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplaying = !1, y.autoplayTimeoutId = void 0, y.emit("onAutoplayStop", y))
            }, y.pauseAutoplay = function (e) {
                y.autoplayPaused || (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplayPaused = !0, 0 === e ? (y.autoplayPaused = !1, i()) : y.wrapper.transitionEnd(function () {
                    y && (y.autoplayPaused = !1, y.autoplaying ? i() : y.stopAutoplay())
                }))
            }, y.minTranslate = function () {
                return -y.snapGrid[0]
            }, y.maxTranslate = function () {
                return -y.snapGrid[y.snapGrid.length - 1]
            }, y.updateAutoHeight = function () {
                var e, a = [], t = 0;
                if ("auto" !== y.params.slidesPerView && y.params.slidesPerView > 1)for (e = 0; e < Math.ceil(y.params.slidesPerView); e++) {
                    var s = y.activeIndex + e;
                    if (s > y.slides.length)break;
                    a.push(y.slides.eq(s)[0])
                } else a.push(y.slides.eq(y.activeIndex)[0]);
                for (e = 0; e < a.length; e++)if (void 0 !== a[e]) {
                    var r = a[e].offsetHeight;
                    t = r > t ? r : t
                }
                t && y.wrapper.css("height", t + "px")
            }, y.updateContainerSize = function () {
                var e, a;
                e = void 0 !== y.params.width ? y.params.width : y.container[0].clientWidth, a = void 0 !== y.params.height ? y.params.height : y.container[0].clientHeight, 0 === e && y.isHorizontal() || 0 === a && !y.isHorizontal() || (e = e - parseInt(y.container.css("padding-left"), 10) - parseInt(y.container.css("padding-right"), 10), a = a - parseInt(y.container.css("padding-top"), 10) - parseInt(y.container.css("padding-bottom"), 10), y.width = e, y.height = a, y.size = y.isHorizontal() ? y.width : y.height)
            }, y.updateSlidesSize = function () {
                y.slides = y.wrapper.children("." + y.params.slideClass), y.snapGrid = [], y.slidesGrid = [], y.slidesSizesGrid = [];
                var e, a = y.params.spaceBetween, t = -y.params.slidesOffsetBefore, s = 0, i = 0;
                if (void 0 !== y.size) {
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * y.size), y.virtualSize = -a, y.rtl ? y.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : y.slides.css({marginRight: "", marginBottom: ""});
                    var n;
                    y.params.slidesPerColumn > 1 && (n = Math.floor(y.slides.length / y.params.slidesPerColumn) === y.slides.length / y.params.slidesPerColumn ? y.slides.length : Math.ceil(y.slides.length / y.params.slidesPerColumn) * y.params.slidesPerColumn, "auto" !== y.params.slidesPerView && "row" === y.params.slidesPerColumnFill && (n = Math.max(n, y.params.slidesPerView * y.params.slidesPerColumn)));
                    var o, l = y.params.slidesPerColumn, p = n / l,
                        d = p - (y.params.slidesPerColumn * p - y.slides.length);
                    for (e = 0; e < y.slides.length; e++) {
                        o = 0;
                        var m = y.slides.eq(e);
                        if (y.params.slidesPerColumn > 1) {
                            var u, c, g;
                            "column" === y.params.slidesPerColumnFill ? (c = Math.floor(e / l), g = e - c * l, (c > d || c === d && g === l - 1) && ++g >= l && (g = 0, c++), u = c + g * n / l, m.css({
                                "-webkit-box-ordinal-group": u,
                                "-moz-box-ordinal-group": u,
                                "-ms-flex-order": u,
                                "-webkit-order": u,
                                order: u
                            })) : (g = Math.floor(e / p), c = e - g * p), m.css("margin-" + (y.isHorizontal() ? "top" : "left"), 0 !== g && y.params.spaceBetween && y.params.spaceBetween + "px").attr("data-swiper-column", c).attr("data-swiper-row", g)
                        }
                        "none" !== m.css("display") && ("auto" === y.params.slidesPerView ? (o = y.isHorizontal() ? m.outerWidth(!0) : m.outerHeight(!0), y.params.roundLengths && (o = r(o))) : (o = (y.size - (y.params.slidesPerView - 1) * a) / y.params.slidesPerView, y.params.roundLengths && (o = r(o)), y.isHorizontal() ? y.slides[e].style.width = o + "px" : y.slides[e].style.height = o + "px"), y.slides[e].swiperSlideSize = o, y.slidesSizesGrid.push(o), y.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === s && 0 !== e && (t = t - y.size / 2 - a), 0 === e && (t = t - y.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % y.params.slidesPerGroup == 0 && y.snapGrid.push(t), y.slidesGrid.push(t)) : (i % y.params.slidesPerGroup == 0 && y.snapGrid.push(t), y.slidesGrid.push(t), t = t + o + a), y.virtualSize += o + a, s = o, i++)
                    }
                    y.virtualSize = Math.max(y.virtualSize, y.size) + y.params.slidesOffsetAfter;
                    var h;
                    if (y.rtl && y.wrongRTL && ("slide" === y.params.effect || "coverflow" === y.params.effect) && y.wrapper.css({width: y.virtualSize + y.params.spaceBetween + "px"}), y.support.flexbox && !y.params.setWrapperSize || (y.isHorizontal() ? y.wrapper.css({width: y.virtualSize + y.params.spaceBetween + "px"}) : y.wrapper.css({height: y.virtualSize + y.params.spaceBetween + "px"})), y.params.slidesPerColumn > 1 && (y.virtualSize = (o + y.params.spaceBetween) * n, y.virtualSize = Math.ceil(y.virtualSize / y.params.slidesPerColumn) - y.params.spaceBetween, y.isHorizontal() ? y.wrapper.css({width: y.virtualSize + y.params.spaceBetween + "px"}) : y.wrapper.css({height: y.virtualSize + y.params.spaceBetween + "px"}), y.params.centeredSlides)) {
                        for (h = [], e = 0; e < y.snapGrid.length; e++)y.snapGrid[e] < y.virtualSize + y.snapGrid[0] && h.push(y.snapGrid[e]);
                        y.snapGrid = h
                    }
                    if (!y.params.centeredSlides) {
                        for (h = [], e = 0; e < y.snapGrid.length; e++)y.snapGrid[e] <= y.virtualSize - y.size && h.push(y.snapGrid[e]);
                        y.snapGrid = h, Math.floor(y.virtualSize - y.size) - Math.floor(y.snapGrid[y.snapGrid.length - 1]) > 1 && y.snapGrid.push(y.virtualSize - y.size)
                    }
                    0 === y.snapGrid.length && (y.snapGrid = [0]), 0 !== y.params.spaceBetween && (y.isHorizontal() ? y.rtl ? y.slides.css({marginLeft: a + "px"}) : y.slides.css({marginRight: a + "px"}) : y.slides.css({marginBottom: a + "px"})), y.params.watchSlidesProgress && y.updateSlidesOffset()
                }
            }, y.updateSlidesOffset = function () {
                for (var e = 0; e < y.slides.length; e++)y.slides[e].swiperSlideOffset = y.isHorizontal() ? y.slides[e].offsetLeft : y.slides[e].offsetTop
            }, y.currentSlidesPerView = function () {
                var e, a, t = 1;
                if (y.params.centeredSlides) {
                    var s, r = y.slides[y.activeIndex].swiperSlideSize;
                    for (e = y.activeIndex + 1; e < y.slides.length; e++)y.slides[e] && !s && (r += y.slides[e].swiperSlideSize, t++, r > y.size && (s = !0));
                    for (a = y.activeIndex - 1; a >= 0; a--)y.slides[a] && !s && (r += y.slides[a].swiperSlideSize, t++, r > y.size && (s = !0))
                } else for (e = y.activeIndex + 1; e < y.slides.length; e++)y.slidesGrid[e] - y.slidesGrid[y.activeIndex] < y.size && t++;
                return t
            }, y.updateSlidesProgress = function (e) {
                if (void 0 === e && (e = y.translate || 0), 0 !== y.slides.length) {
                    void 0 === y.slides[0].swiperSlideOffset && y.updateSlidesOffset();
                    var a = -e;
                    y.rtl && (a = e), y.slides.removeClass(y.params.slideVisibleClass);
                    for (var t = 0; t < y.slides.length; t++) {
                        var s = y.slides[t],
                            r = (a + (y.params.centeredSlides ? y.minTranslate() : 0) - s.swiperSlideOffset) / (s.swiperSlideSize + y.params.spaceBetween);
                        if (y.params.watchSlidesVisibility) {
                            var i = -(a - s.swiperSlideOffset), n = i + y.slidesSizesGrid[t];
                            (i >= 0 && i < y.size || n > 0 && n <= y.size || i <= 0 && n >= y.size) && y.slides.eq(t).addClass(y.params.slideVisibleClass)
                        }
                        s.progress = y.rtl ? -r : r
                    }
                }
            }, y.updateProgress = function (e) {
                void 0 === e && (e = y.translate || 0);
                var a = y.maxTranslate() - y.minTranslate(), t = y.isBeginning, s = y.isEnd;
                0 === a ? (y.progress = 0, y.isBeginning = y.isEnd = !0) : (y.progress = (e - y.minTranslate()) / a, y.isBeginning = y.progress <= 0, y.isEnd = y.progress >= 1), y.isBeginning && !t && y.emit("onReachBeginning", y), y.isEnd && !s && y.emit("onReachEnd", y), y.params.watchSlidesProgress && y.updateSlidesProgress(e), y.emit("onProgress", y, y.progress)
            }, y.updateActiveIndex = function () {
                var e, a, t, s = y.rtl ? y.translate : -y.translate;
                for (a = 0; a < y.slidesGrid.length; a++)void 0 !== y.slidesGrid[a + 1] ? s >= y.slidesGrid[a] && s < y.slidesGrid[a + 1] - (y.slidesGrid[a + 1] - y.slidesGrid[a]) / 2 ? e = a : s >= y.slidesGrid[a] && s < y.slidesGrid[a + 1] && (e = a + 1) : s >= y.slidesGrid[a] && (e = a);
                y.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), (t = Math.floor(e / y.params.slidesPerGroup)) >= y.snapGrid.length && (t = y.snapGrid.length - 1), e !== y.activeIndex && (y.snapIndex = t, y.previousIndex = y.activeIndex, y.activeIndex = e, y.updateClasses(), y.updateRealIndex())
            }, y.updateRealIndex = function () {
                y.realIndex = parseInt(y.slides.eq(y.activeIndex).attr("data-swiper-slide-index") || y.activeIndex, 10)
            }, y.updateClasses = function () {
                y.slides.removeClass(y.params.slideActiveClass + " " + y.params.slideNextClass + " " + y.params.slidePrevClass + " " + y.params.slideDuplicateActiveClass + " " + y.params.slideDuplicateNextClass + " " + y.params.slideDuplicatePrevClass);
                var a = y.slides.eq(y.activeIndex);
                a.addClass(y.params.slideActiveClass), s.loop && (a.hasClass(y.params.slideDuplicateClass) ? y.wrapper.children("." + y.params.slideClass + ":not(." + y.params.slideDuplicateClass + ')[data-swiper-slide-index="' + y.realIndex + '"]').addClass(y.params.slideDuplicateActiveClass) : y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass + '[data-swiper-slide-index="' + y.realIndex + '"]').addClass(y.params.slideDuplicateActiveClass));
                var t = a.next("." + y.params.slideClass).addClass(y.params.slideNextClass);
                y.params.loop && 0 === t.length && (t = y.slides.eq(0)).addClass(y.params.slideNextClass);
                var r = a.prev("." + y.params.slideClass).addClass(y.params.slidePrevClass);
                if (y.params.loop && 0 === r.length && (r = y.slides.eq(-1)).addClass(y.params.slidePrevClass), s.loop && (t.hasClass(y.params.slideDuplicateClass) ? y.wrapper.children("." + y.params.slideClass + ":not(." + y.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(y.params.slideDuplicateNextClass) : y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(y.params.slideDuplicateNextClass), r.hasClass(y.params.slideDuplicateClass) ? y.wrapper.children("." + y.params.slideClass + ":not(." + y.params.slideDuplicateClass + ')[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(y.params.slideDuplicatePrevClass) : y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass + '[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(y.params.slideDuplicatePrevClass)), y.paginationContainer && y.paginationContainer.length > 0) {
                    var i,
                        n = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length;
                    if (y.params.loop ? ((i = Math.ceil((y.activeIndex - y.loopedSlides) / y.params.slidesPerGroup)) > y.slides.length - 1 - 2 * y.loopedSlides && (i -= y.slides.length - 2 * y.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== y.params.paginationType && (i = n + i)) : i = void 0 !== y.snapIndex ? y.snapIndex : y.activeIndex || 0, "bullets" === y.params.paginationType && y.bullets && y.bullets.length > 0 && (y.bullets.removeClass(y.params.bulletActiveClass), y.paginationContainer.length > 1 ? y.bullets.each(function () {
                            e(this).index() === i && e(this).addClass(y.params.bulletActiveClass)
                        }) : y.bullets.eq(i).addClass(y.params.bulletActiveClass)), "fraction" === y.params.paginationType && (y.paginationContainer.find("." + y.params.paginationCurrentClass).text(i + 1), y.paginationContainer.find("." + y.params.paginationTotalClass).text(n)), "progress" === y.params.paginationType) {
                        var o = (i + 1) / n, l = o, p = 1;
                        y.isHorizontal() || (p = o, l = 1), y.paginationContainer.find("." + y.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + p + ")").transition(y.params.speed)
                    }
                    "custom" === y.params.paginationType && y.params.paginationCustomRender && (y.paginationContainer.html(y.params.paginationCustomRender(y, i + 1, n)), y.emit("onPaginationRendered", y, y.paginationContainer[0]))
                }
                y.params.loop || (y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.isBeginning ? (y.prevButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.prevButton)) : (y.prevButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.prevButton))), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.isEnd ? (y.nextButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.nextButton)) : (y.nextButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.nextButton))))
            }, y.updatePagination = function () {
                if (y.params.pagination && y.paginationContainer && y.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === y.params.paginationType) {
                        for (var a = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length, t = 0; t < a; t++)e += y.params.paginationBulletRender ? y.params.paginationBulletRender(y, t, y.params.bulletClass) : "<" + y.params.paginationElement + ' class="' + y.params.bulletClass + '"></' + y.params.paginationElement + ">";
                        y.paginationContainer.html(e), y.bullets = y.paginationContainer.find("." + y.params.bulletClass), y.params.paginationClickable && y.params.a11y && y.a11y && y.a11y.initPagination()
                    }
                    "fraction" === y.params.paginationType && (e = y.params.paginationFractionRender ? y.params.paginationFractionRender(y, y.params.paginationCurrentClass, y.params.paginationTotalClass) : '<span class="' + y.params.paginationCurrentClass + '"></span> / <span class="' + y.params.paginationTotalClass + '"></span>', y.paginationContainer.html(e)), "progress" === y.params.paginationType && (e = y.params.paginationProgressRender ? y.params.paginationProgressRender(y, y.params.paginationProgressbarClass) : '<span class="' + y.params.paginationProgressbarClass + '"></span>', y.paginationContainer.html(e)), "custom" !== y.params.paginationType && y.emit("onPaginationRendered", y, y.paginationContainer[0])
                }
            }, y.update = function (e) {
                function a() {
                    y.rtl, y.translate, t = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate()), y.setWrapperTranslate(t), y.updateActiveIndex(), y.updateClasses()
                }

                if (y) {
                    y.updateContainerSize(), y.updateSlidesSize(), y.updateProgress(), y.updatePagination(), y.updateClasses(), y.params.scrollbar && y.scrollbar && y.scrollbar.set();
                    var t;
                    e ? (y.controller && y.controller.spline && (y.controller.spline = void 0), y.params.freeMode ? (a(), y.params.autoHeight && y.updateAutoHeight()) : (("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0)) || a()) : y.params.autoHeight && y.updateAutoHeight()
                }
            }, y.onResize = function (e) {
                y.params.onBeforeResize && y.params.onBeforeResize(y), y.params.breakpoints && y.setBreakpoint();
                var a = y.params.allowSwipeToPrev, t = y.params.allowSwipeToNext;
                y.params.allowSwipeToPrev = y.params.allowSwipeToNext = !0, y.updateContainerSize(), y.updateSlidesSize(), ("auto" === y.params.slidesPerView || y.params.freeMode || e) && y.updatePagination(), y.params.scrollbar && y.scrollbar && y.scrollbar.set(), y.controller && y.controller.spline && (y.controller.spline = void 0);
                var s = !1;
                if (y.params.freeMode) {
                    var r = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate());
                    y.setWrapperTranslate(r), y.updateActiveIndex(), y.updateClasses(), y.params.autoHeight && y.updateAutoHeight()
                } else y.updateClasses(), s = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0);
                y.params.lazyLoading && !s && y.lazy && y.lazy.load(), y.params.allowSwipeToPrev = a, y.params.allowSwipeToNext = t, y.params.onAfterResize && y.params.onAfterResize(y)
            }, y.touchEventsDesktop = {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
            }, window.navigator.pointerEnabled ? y.touchEventsDesktop = {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled && (y.touchEventsDesktop = {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                }), y.touchEvents = {
                start: y.support.touch || !y.params.simulateTouch ? "touchstart" : y.touchEventsDesktop.start,
                move: y.support.touch || !y.params.simulateTouch ? "touchmove" : y.touchEventsDesktop.move,
                end: y.support.touch || !y.params.simulateTouch ? "touchend" : y.touchEventsDesktop.end
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === y.params.touchEventsTarget ? y.container : y.wrapper).addClass("swiper-wp8-" + y.params.direction), y.initEvents = function (e) {
                var a = e ? "off" : "on", t = e ? "removeEventListener" : "addEventListener",
                    r = "container" === y.params.touchEventsTarget ? y.container[0] : y.wrapper[0],
                    i = y.support.touch ? r : document, n = !!y.params.nested;
                if (y.browser.ie) r[t](y.touchEvents.start, y.onTouchStart, !1), i[t](y.touchEvents.move, y.onTouchMove, n), i[t](y.touchEvents.end, y.onTouchEnd, !1); else {
                    if (y.support.touch) {
                        var o = !("touchstart" !== y.touchEvents.start || !y.support.passiveListener || !y.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                        r[t](y.touchEvents.start, y.onTouchStart, o), r[t](y.touchEvents.move, y.onTouchMove, n), r[t](y.touchEvents.end, y.onTouchEnd, o)
                    }
                    (s.simulateTouch && !y.device.ios && !y.device.android || s.simulateTouch && !y.support.touch && y.device.ios) && (r[t]("mousedown", y.onTouchStart, !1), document[t]("mousemove", y.onTouchMove, n), document[t]("mouseup", y.onTouchEnd, !1))
                }
                window[t]("resize", y.onResize), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.nextButton[a]("click", y.onClickNext), y.params.a11y && y.a11y && y.nextButton[a]("keydown", y.a11y.onEnterKey)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.prevButton[a]("click", y.onClickPrev), y.params.a11y && y.a11y && y.prevButton[a]("keydown", y.a11y.onEnterKey)), y.params.pagination && y.params.paginationClickable && (y.paginationContainer[a]("click", "." + y.params.bulletClass, y.onClickIndex), y.params.a11y && y.a11y && y.paginationContainer[a]("keydown", "." + y.params.bulletClass, y.a11y.onEnterKey)), (y.params.preventClicks || y.params.preventClicksPropagation) && r[t]("click", y.preventClicks, !0)
            }, y.attachEvents = function () {
                y.initEvents()
            }, y.detachEvents = function () {
                y.initEvents(!0)
            }, y.allowClick = !0, y.preventClicks = function (e) {
                y.allowClick || (y.params.preventClicks && e.preventDefault(), y.params.preventClicksPropagation && y.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, y.onClickNext = function (e) {
                e.preventDefault(), y.isEnd && !y.params.loop || y.slideNext()
            }, y.onClickPrev = function (e) {
                e.preventDefault(), y.isBeginning && !y.params.loop || y.slidePrev()
            }, y.onClickIndex = function (a) {
                a.preventDefault();
                var t = e(this).index() * y.params.slidesPerGroup;
                y.params.loop && (t += y.loopedSlides), y.slideTo(t)
            }, y.updateClickedSlide = function (a) {
                var t = n(a, "." + y.params.slideClass), s = !1;
                if (t)for (var r = 0; r < y.slides.length; r++)y.slides[r] === t && (s = !0);
                if (!t || !s)return y.clickedSlide = void 0, void(y.clickedIndex = void 0);
                if (y.clickedSlide = t, y.clickedIndex = e(t).index(), y.params.slideToClickedSlide && void 0 !== y.clickedIndex && y.clickedIndex !== y.activeIndex) {
                    var i, o = y.clickedIndex,
                        l = "auto" === y.params.slidesPerView ? y.currentSlidesPerView() : y.params.slidesPerView;
                    if (y.params.loop) {
                        if (y.animating)return;
                        i = parseInt(e(y.clickedSlide).attr("data-swiper-slide-index"), 10), y.params.centeredSlides ? o < y.loopedSlides - l / 2 || o > y.slides.length - y.loopedSlides + l / 2 ? (y.fixLoop(), o = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + y.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                            y.slideTo(o)
                        }, 0)) : y.slideTo(o) : o > y.slides.length - l ? (y.fixLoop(), o = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + y.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                            y.slideTo(o)
                        }, 0)) : y.slideTo(o)
                    } else y.slideTo(o)
                }
            };
            var b, C, S, z, M, P, E, I, k, D, L = "input, select, textarea, button, video", B = Date.now(), H = [];
            y.animating = !1, y.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
            var G, X;
            y.onTouchStart = function (a) {
                if (a.originalEvent && (a = a.originalEvent), (G = "touchstart" === a.type) || !("which" in a) || 3 !== a.which) {
                    if (y.params.noSwiping && n(a, "." + y.params.noSwipingClass))return void(y.allowClick = !0);
                    if (!y.params.swipeHandler || n(a, y.params.swipeHandler)) {
                        var t = y.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                            s = y.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;
                        if (!(y.device.ios && y.params.iOSEdgeSwipeDetection && t <= y.params.iOSEdgeSwipeThreshold)) {
                            if (b = !0, C = !1, S = !0, M = void 0, X = void 0, y.touches.startX = t, y.touches.startY = s, z = Date.now(), y.allowClick = !0, y.updateContainerSize(), y.swipeDirection = void 0, y.params.threshold > 0 && (I = !1), "touchstart" !== a.type) {
                                var r = !0;
                                e(a.target).is(L) && (r = !1), document.activeElement && e(document.activeElement).is(L) && document.activeElement.blur(), r && a.preventDefault()
                            }
                            y.emit("onTouchStart", y, a)
                        }
                    }
                }
            }, y.onTouchMove = function (a) {
                if (a.originalEvent && (a = a.originalEvent), !G || "mousemove" !== a.type) {
                    if (a.preventedByNestedSwiper)return y.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, void(y.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY);
                    if (y.params.onlyExternal)return y.allowClick = !1, void(b && (y.touches.startX = y.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, y.touches.startY = y.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, z = Date.now()));
                    if (G && y.params.touchReleaseOnEdges && !y.params.loop)if (y.isHorizontal()) {
                        if (y.touches.currentX < y.touches.startX && y.translate <= y.maxTranslate() || y.touches.currentX > y.touches.startX && y.translate >= y.minTranslate())return
                    } else if (y.touches.currentY < y.touches.startY && y.translate <= y.maxTranslate() || y.touches.currentY > y.touches.startY && y.translate >= y.minTranslate())return;
                    if (G && document.activeElement && a.target === document.activeElement && e(a.target).is(L))return C = !0, void(y.allowClick = !1);
                    if (S && y.emit("onTouchMove", y, a), !(a.targetTouches && a.targetTouches.length > 1)) {
                        if (y.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, y.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, void 0 === M) {
                            var t;
                            y.isHorizontal() && y.touches.currentY === y.touches.startY || !y.isHorizontal() && y.touches.currentX === y.touches.startX ? M = !1 : (t = 180 * Math.atan2(Math.abs(y.touches.currentY - y.touches.startY), Math.abs(y.touches.currentX - y.touches.startX)) / Math.PI, M = y.isHorizontal() ? t > y.params.touchAngle : 90 - t > y.params.touchAngle)
                        }
                        if (M && y.emit("onTouchMoveOpposite", y, a), void 0 === X && (y.touches.currentX === y.touches.startX && y.touches.currentY === y.touches.startY || (X = !0)), b) {
                            if (M)return void(b = !1);
                            if (X) {
                                y.allowClick = !1, y.emit("onSliderMove", y, a), a.preventDefault(), y.params.touchMoveStopPropagation && !y.params.nested && a.stopPropagation(), C || (s.loop && y.fixLoop(), E = y.getWrapperTranslate(), y.setWrapperTransition(0), y.animating && y.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), y.params.autoplay && y.autoplaying && (y.params.autoplayDisableOnInteraction ? y.stopAutoplay() : y.pauseAutoplay()), D = !1, !y.params.grabCursor || !0 !== y.params.allowSwipeToNext && !0 !== y.params.allowSwipeToPrev || y.setGrabCursor(!0)), C = !0;
                                var r = y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY;
                                r *= y.params.touchRatio, y.rtl && (r = -r), y.swipeDirection = r > 0 ? "prev" : "next", P = r + E;
                                var i = !0;
                                if (r > 0 && P > y.minTranslate() ? (i = !1, y.params.resistance && (P = y.minTranslate() - 1 + Math.pow(-y.minTranslate() + E + r, y.params.resistanceRatio))) : r < 0 && P < y.maxTranslate() && (i = !1, y.params.resistance && (P = y.maxTranslate() + 1 - Math.pow(y.maxTranslate() - E - r, y.params.resistanceRatio))), i && (a.preventedByNestedSwiper = !0), !y.params.allowSwipeToNext && "next" === y.swipeDirection && P < E && (P = E), !y.params.allowSwipeToPrev && "prev" === y.swipeDirection && P > E && (P = E), y.params.threshold > 0) {
                                    if (!(Math.abs(r) > y.params.threshold || I))return void(P = E);
                                    if (!I)return I = !0, y.touches.startX = y.touches.currentX, y.touches.startY = y.touches.currentY, P = E, void(y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY)
                                }
                                y.params.followFinger && ((y.params.freeMode || y.params.watchSlidesProgress) && y.updateActiveIndex(), y.params.freeMode && (0 === H.length && H.push({
                                    position: y.touches[y.isHorizontal() ? "startX" : "startY"],
                                    time: z
                                }), H.push({
                                    position: y.touches[y.isHorizontal() ? "currentX" : "currentY"],
                                    time: (new window.Date).getTime()
                                })), y.updateProgress(P), y.setWrapperTranslate(P))
                            }
                        }
                    }
                }
            }, y.onTouchEnd = function (a) {
                if (a.originalEvent && (a = a.originalEvent), S && y.emit("onTouchEnd", y, a), S = !1, b) {
                    y.params.grabCursor && C && b && (!0 === y.params.allowSwipeToNext || !0 === y.params.allowSwipeToPrev) && y.setGrabCursor(!1);
                    var t = Date.now(), s = t - z;
                    if (y.allowClick && (y.updateClickedSlide(a), y.emit("onTap", y, a), s < 300 && t - B > 300 && (k && clearTimeout(k), k = setTimeout(function () {
                            y && (y.params.paginationHide && y.paginationContainer.length > 0 && !e(a.target).hasClass(y.params.bulletClass) && y.paginationContainer.toggleClass(y.params.paginationHiddenClass), y.emit("onClick", y, a))
                        }, 300)), s < 300 && t - B < 300 && (k && clearTimeout(k), y.emit("onDoubleTap", y, a))), B = Date.now(), setTimeout(function () {
                            y && (y.allowClick = !0)
                        }, 0), !b || !C || !y.swipeDirection || 0 === y.touches.diff || P === E)return void(b = C = !1);
                    b = C = !1;
                    var r;
                    if (r = y.params.followFinger ? y.rtl ? y.translate : -y.translate : -P, y.params.freeMode) {
                        if (r < -y.minTranslate())return void y.slideTo(y.activeIndex);
                        if (r > -y.maxTranslate())return void(y.slides.length < y.snapGrid.length ? y.slideTo(y.snapGrid.length - 1) : y.slideTo(y.slides.length - 1));
                        if (y.params.freeModeMomentum) {
                            if (H.length > 1) {
                                var i = H.pop(), n = H.pop(), o = i.position - n.position, l = i.time - n.time;
                                y.velocity = o / l, y.velocity = y.velocity / 2, Math.abs(y.velocity) < y.params.freeModeMinimumVelocity && (y.velocity = 0), (l > 150 || (new window.Date).getTime() - i.time > 300) && (y.velocity = 0)
                            } else y.velocity = 0;
                            y.velocity = y.velocity * y.params.freeModeMomentumVelocityRatio, H.length = 0;
                            var p = 1e3 * y.params.freeModeMomentumRatio, d = y.velocity * p, m = y.translate + d;
                            y.rtl && (m = -m);
                            var u, c = !1, g = 20 * Math.abs(y.velocity) * y.params.freeModeMomentumBounceRatio;
                            if (m < y.maxTranslate()) y.params.freeModeMomentumBounce ? (m + y.maxTranslate() < -g && (m = y.maxTranslate() - g), u = y.maxTranslate(), c = !0, D = !0) : m = y.maxTranslate(); else if (m > y.minTranslate()) y.params.freeModeMomentumBounce ? (m - y.minTranslate() > g && (m = y.minTranslate() + g), u = y.minTranslate(), c = !0, D = !0) : m = y.minTranslate(); else if (y.params.freeModeSticky) {
                                var h, v = 0;
                                for (v = 0; v < y.snapGrid.length; v += 1)if (y.snapGrid[v] > -m) {
                                    h = v;
                                    break
                                }
                                m = Math.abs(y.snapGrid[h] - m) < Math.abs(y.snapGrid[h - 1] - m) || "next" === y.swipeDirection ? y.snapGrid[h] : y.snapGrid[h - 1], y.rtl || (m = -m)
                            }
                            if (0 !== y.velocity) p = y.rtl ? Math.abs((-m - y.translate) / y.velocity) : Math.abs((m - y.translate) / y.velocity); else if (y.params.freeModeSticky)return void y.slideReset();
                            y.params.freeModeMomentumBounce && c ? (y.updateProgress(u), y.setWrapperTransition(p), y.setWrapperTranslate(m), y.onTransitionStart(), y.animating = !0, y.wrapper.transitionEnd(function () {
                                y && D && (y.emit("onMomentumBounce", y), y.setWrapperTransition(y.params.speed), y.setWrapperTranslate(u), y.wrapper.transitionEnd(function () {
                                    y && y.onTransitionEnd()
                                }))
                            })) : y.velocity ? (y.updateProgress(m), y.setWrapperTransition(p), y.setWrapperTranslate(m), y.onTransitionStart(), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function () {
                                y && y.onTransitionEnd()
                            }))) : y.updateProgress(m), y.updateActiveIndex()
                        }
                        return void((!y.params.freeModeMomentum || s >= y.params.longSwipesMs) && (y.updateProgress(), y.updateActiveIndex()))
                    }
                    var f, w = 0, x = y.slidesSizesGrid[0];
                    for (f = 0; f < y.slidesGrid.length; f += y.params.slidesPerGroup)void 0 !== y.slidesGrid[f + y.params.slidesPerGroup] ? r >= y.slidesGrid[f] && r < y.slidesGrid[f + y.params.slidesPerGroup] && (w = f, x = y.slidesGrid[f + y.params.slidesPerGroup] - y.slidesGrid[f]) : r >= y.slidesGrid[f] && (w = f, x = y.slidesGrid[y.slidesGrid.length - 1] - y.slidesGrid[y.slidesGrid.length - 2]);
                    var T = (r - y.slidesGrid[w]) / x;
                    if (s > y.params.longSwipesMs) {
                        if (!y.params.longSwipes)return void y.slideTo(y.activeIndex);
                        "next" === y.swipeDirection && (T >= y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w)), "prev" === y.swipeDirection && (T > 1 - y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w))
                    } else {
                        if (!y.params.shortSwipes)return void y.slideTo(y.activeIndex);
                        "next" === y.swipeDirection && y.slideTo(w + y.params.slidesPerGroup), "prev" === y.swipeDirection && y.slideTo(w)
                    }
                }
            }, y._slideTo = function (e, a) {
                return y.slideTo(e, a, !0, !0)
            }, y.slideTo = function (e, a, t, s) {
                void 0 === t && (t = !0), void 0 === e && (e = 0), e < 0 && (e = 0), y.snapIndex = Math.floor(e / y.params.slidesPerGroup), y.snapIndex >= y.snapGrid.length && (y.snapIndex = y.snapGrid.length - 1);
                var r = -y.snapGrid[y.snapIndex];
                if (y.params.autoplay && y.autoplaying && (s || !y.params.autoplayDisableOnInteraction ? y.pauseAutoplay(a) : y.stopAutoplay()), y.updateProgress(r), y.params.normalizeSlideIndex)for (var i = 0; i < y.slidesGrid.length; i++)-Math.floor(100 * r) >= Math.floor(100 * y.slidesGrid[i]) && (e = i);
                return !(!y.params.allowSwipeToNext && r < y.translate && r < y.minTranslate() || !y.params.allowSwipeToPrev && r > y.translate && r > y.maxTranslate() && (y.activeIndex || 0) !== e || (void 0 === a && (a = y.params.speed), y.previousIndex = y.activeIndex || 0, y.activeIndex = e, y.updateRealIndex(), y.rtl && -r === y.translate || !y.rtl && r === y.translate ? (y.params.autoHeight && y.updateAutoHeight(), y.updateClasses(), "slide" !== y.params.effect && y.setWrapperTranslate(r), 1) : (y.updateClasses(), y.onTransitionStart(t), 0 === a || y.browser.lteIE9 ? (y.setWrapperTranslate(r), y.setWrapperTransition(0), y.onTransitionEnd(t)) : (y.setWrapperTranslate(r), y.setWrapperTransition(a), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function () {
                    y && y.onTransitionEnd(t)
                }))), 0)))
            }, y.onTransitionStart = function (e) {
                void 0 === e && (e = !0), y.params.autoHeight && y.updateAutoHeight(), y.lazy && y.lazy.onTransitionStart(), e && (y.emit("onTransitionStart", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeStart", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextStart", y) : y.emit("onSlidePrevStart", y)))
            }, y.onTransitionEnd = function (e) {
                y.animating = !1, y.setWrapperTransition(0), void 0 === e && (e = !0), y.lazy && y.lazy.onTransitionEnd(), e && (y.emit("onTransitionEnd", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeEnd", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextEnd", y) : y.emit("onSlidePrevEnd", y))), y.params.history && y.history && y.history.setHistory(y.params.history, y.activeIndex), y.params.hashnav && y.hashnav && y.hashnav.setHash()
            }, y.slideNext = function (e, a, t) {
                return y.params.loop ? !y.animating && (y.fixLoop(), y.container[0].clientLeft, y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t)) : y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t)
            }, y._slideNext = function (e) {
                return y.slideNext(!0, e, !0)
            }, y.slidePrev = function (e, a, t) {
                return y.params.loop ? !y.animating && (y.fixLoop(), y.container[0].clientLeft, y.slideTo(y.activeIndex - 1, a, e, t)) : y.slideTo(y.activeIndex - 1, a, e, t)
            }, y._slidePrev = function (e) {
                return y.slidePrev(!0, e, !0)
            }, y.slideReset = function (e, a, t) {
                return y.slideTo(y.activeIndex, a, e)
            }, y.disableTouchControl = function () {
                return y.params.onlyExternal = !0, !0
            }, y.enableTouchControl = function () {
                return y.params.onlyExternal = !1, !0
            }, y.setWrapperTransition = function (e, a) {
                y.wrapper.transition(e), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTransition(e), y.params.parallax && y.parallax && y.parallax.setTransition(e), y.params.scrollbar && y.scrollbar && y.scrollbar.setTransition(e), y.params.control && y.controller && y.controller.setTransition(e, a), y.emit("onSetTransition", y, e)
            }, y.setWrapperTranslate = function (e, a, t) {
                var s = 0, i = 0;
                y.isHorizontal() ? s = y.rtl ? -e : e : i = e, y.params.roundLengths && (s = r(s), i = r(i)), y.params.virtualTranslate || (y.support.transforms3d ? y.wrapper.transform("translate3d(" + s + "px, " + i + "px, 0px)") : y.wrapper.transform("translate(" + s + "px, " + i + "px)")), y.translate = y.isHorizontal() ? s : i;
                var n = y.maxTranslate() - y.minTranslate();
                (0 === n ? 0 : (e - y.minTranslate()) / n) !== y.progress && y.updateProgress(e), a && y.updateActiveIndex(), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTranslate(y.translate), y.params.parallax && y.parallax && y.parallax.setTranslate(y.translate), y.params.scrollbar && y.scrollbar && y.scrollbar.setTranslate(y.translate), y.params.control && y.controller && y.controller.setTranslate(y.translate, t), y.emit("onSetTranslate", y, y.translate)
            }, y.getTranslate = function (e, a) {
                var t, s, r, i;
                return void 0 === a && (a = "x"), y.params.virtualTranslate ? y.rtl ? -y.translate : y.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? ((s = r.transform || r.webkitTransform).split(",").length > 6 && (s = s.split(", ").map(function (e) {
                    return e.replace(",", ".")
                }).join(", ")), i = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), y.rtl && s && (s = -s), s || 0)
            }, y.getWrapperTranslate = function (e) {
                return void 0 === e && (e = y.isHorizontal() ? "x" : "y"), y.getTranslate(y.wrapper[0], e)
            }, y.observers = [], y.initObservers = function () {
                if (y.params.observeParents)for (var e = y.container.parents(), a = 0; a < e.length; a++)o(e[a]);
                o(y.container[0], {childList: !1}), o(y.wrapper[0], {attributes: !1})
            }, y.disconnectObservers = function () {
                for (var e = 0; e < y.observers.length; e++)y.observers[e].disconnect();
                y.observers = []
            }, y.createLoop = function () {
                y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove();
                var a = y.wrapper.children("." + y.params.slideClass);
                "auto" !== y.params.slidesPerView || y.params.loopedSlides || (y.params.loopedSlides = a.length), y.loopedSlides = parseInt(y.params.loopedSlides || y.params.slidesPerView, 10), y.loopedSlides = y.loopedSlides + y.params.loopAdditionalSlides, y.loopedSlides > a.length && (y.loopedSlides = a.length);
                var t, s = [], r = [];
                for (a.each(function (t, i) {
                    var n = e(this);
                    t < y.loopedSlides && r.push(i), t < a.length && t >= a.length - y.loopedSlides && s.push(i), n.attr("data-swiper-slide-index", t)
                }), t = 0; t < r.length; t++)y.wrapper.append(e(r[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass));
                for (t = s.length - 1; t >= 0; t--)y.wrapper.prepend(e(s[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass))
            }, y.destroyLoop = function () {
                y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove(), y.slides.removeAttr("data-swiper-slide-index")
            }, y.reLoop = function (e) {
                var a = y.activeIndex - y.loopedSlides;
                y.destroyLoop(), y.createLoop(), y.updateSlidesSize(), e && y.slideTo(a + y.loopedSlides, 0, !1)
            }, y.fixLoop = function () {
                var e;
                y.activeIndex < y.loopedSlides ? (e = y.slides.length - 3 * y.loopedSlides + y.activeIndex, e += y.loopedSlides, y.slideTo(e, 0, !1, !0)) : ("auto" === y.params.slidesPerView && y.activeIndex >= 2 * y.loopedSlides || y.activeIndex > y.slides.length - 2 * y.params.slidesPerView) && (e = -y.slides.length + y.activeIndex + y.loopedSlides, e += y.loopedSlides, y.slideTo(e, 0, !1, !0))
            }, y.appendSlide = function (e) {
                if (y.params.loop && y.destroyLoop(), "object" == typeof e && e.length)for (var a = 0; a < e.length; a++)e[a] && y.wrapper.append(e[a]); else y.wrapper.append(e);
                y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0)
            }, y.prependSlide = function (e) {
                y.params.loop && y.destroyLoop();
                var a = y.activeIndex + 1;
                if ("object" == typeof e && e.length) {
                    for (var t = 0; t < e.length; t++)e[t] && y.wrapper.prepend(e[t]);
                    a = y.activeIndex + e.length
                } else y.wrapper.prepend(e);
                y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.slideTo(a, 0, !1)
            }, y.removeSlide = function (e) {
                y.params.loop && (y.destroyLoop(), y.slides = y.wrapper.children("." + y.params.slideClass));
                var a, t = y.activeIndex;
                if ("object" == typeof e && e.length) {
                    for (var s = 0; s < e.length; s++)a = e[s], y.slides[a] && y.slides.eq(a).remove(), a < t && t--;
                    t = Math.max(t, 0)
                } else a = e, y.slides[a] && y.slides.eq(a).remove(), a < t && t--, t = Math.max(t, 0);
                y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.params.loop ? y.slideTo(t + y.loopedSlides, 0, !1) : y.slideTo(t, 0, !1)
            }, y.removeAllSlides = function () {
                for (var e = [], a = 0; a < y.slides.length; a++)e.push(a);
                y.removeSlide(e)
            }, y.effects = {
                fade: {
                    setTranslate: function () {
                        for (var e = 0; e < y.slides.length; e++) {
                            var a = y.slides.eq(e), t = -a[0].swiperSlideOffset;
                            y.params.virtualTranslate || (t -= y.translate);
                            var s = 0;
                            y.isHorizontal() || (s = t, t = 0);
                            var r = y.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                            a.css({opacity: r}).transform("translate3d(" + t + "px, " + s + "px, 0px)")
                        }
                    }, setTransition: function (e) {
                        if (y.slides.transition(e), y.params.virtualTranslate && 0 !== e) {
                            var a = !1;
                            y.slides.transitionEnd(function () {
                                if (!a && y) {
                                    a = !0, y.animating = !1;
                                    for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++)y.wrapper.trigger(e[t])
                                }
                            })
                        }
                    }
                }, flip: {
                    setTranslate: function () {
                        for (var a = 0; a < y.slides.length; a++) {
                            var t = y.slides.eq(a), s = t[0].progress;
                            y.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));
                            var r = -180 * s, i = 0, n = -t[0].swiperSlideOffset, o = 0;
                            if (y.isHorizontal() ? y.rtl && (r = -r) : (o = n, n = 0, i = -r, r = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + y.slides.length, y.params.flip.slideShadows) {
                                var l = y.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                    p = y.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                0 === l.length && (l = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), t.append(l)), 0 === p.length && (p = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(p)), l.length && (l[0].style.opacity = Math.max(-s, 0)), p.length && (p[0].style.opacity = Math.max(s, 0))
                            }
                            t.transform("translate3d(" + n + "px, " + o + "px, 0px) rotateX(" + i + "deg) rotateY(" + r + "deg)")
                        }
                    }, setTransition: function (a) {
                        if (y.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a), y.params.virtualTranslate && 0 !== a) {
                            var t = !1;
                            y.slides.eq(y.activeIndex).transitionEnd(function () {
                                if (!t && y && e(this).hasClass(y.params.slideActiveClass)) {
                                    t = !0, y.animating = !1;
                                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < a.length; s++)y.wrapper.trigger(a[s])
                                }
                            })
                        }
                    }
                }, cube: {
                    setTranslate: function () {
                        var a, t = 0;
                        y.params.cube.shadow && (y.isHorizontal() ? (0 === (a = y.wrapper.find(".swiper-cube-shadow")).length && (a = e('<div class="swiper-cube-shadow"></div>'), y.wrapper.append(a)), a.css({height: y.width + "px"})) : 0 === (a = y.container.find(".swiper-cube-shadow")).length && (a = e('<div class="swiper-cube-shadow"></div>'), y.container.append(a)));
                        for (var s = 0; s < y.slides.length; s++) {
                            var r = y.slides.eq(s), i = 90 * s, n = Math.floor(i / 360);
                            y.rtl && (i = -i, n = Math.floor(-i / 360));
                            var o = Math.max(Math.min(r[0].progress, 1), -1), l = 0, p = 0, d = 0;
                            s % 4 == 0 ? (l = 4 * -n * y.size, d = 0) : (s - 1) % 4 == 0 ? (l = 0, d = 4 * -n * y.size) : (s - 2) % 4 == 0 ? (l = y.size + 4 * n * y.size, d = y.size) : (s - 3) % 4 == 0 && (l = -y.size, d = 3 * y.size + 4 * y.size * n), y.rtl && (l = -l), y.isHorizontal() || (p = l, l = 0);
                            var m = "rotateX(" + (y.isHorizontal() ? 0 : -i) + "deg) rotateY(" + (y.isHorizontal() ? i : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                            if (o <= 1 && o > -1 && (t = 90 * s + 90 * o, y.rtl && (t = 90 * -s - 90 * o)), r.transform(m), y.params.cube.slideShadows) {
                                var u = y.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                                    c = y.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                                0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), r.append(u)), 0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(c)), u.length && (u[0].style.opacity = Math.max(-o, 0)), c.length && (c[0].style.opacity = Math.max(o, 0))
                            }
                        }
                        if (y.wrapper.css({
                                "-webkit-transform-origin": "50% 50% -" + y.size / 2 + "px",
                                "-moz-transform-origin": "50% 50% -" + y.size / 2 + "px",
                                "-ms-transform-origin": "50% 50% -" + y.size / 2 + "px",
                                "transform-origin": "50% 50% -" + y.size / 2 + "px"
                            }), y.params.cube.shadow)if (y.isHorizontal()) a.transform("translate3d(0px, " + (y.width / 2 + y.params.cube.shadowOffset) + "px, " + -y.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + y.params.cube.shadowScale + ")"); else {
                            var g = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                h = 1.5 - (Math.sin(2 * g * Math.PI / 360) / 2 + Math.cos(2 * g * Math.PI / 360) / 2),
                                v = y.params.cube.shadowScale, f = y.params.cube.shadowScale / h,
                                w = y.params.cube.shadowOffset;
                            a.transform("scale3d(" + v + ", 1, " + f + ") translate3d(0px, " + (y.height / 2 + w) + "px, " + -y.height / 2 / f + "px) rotateX(-90deg)")
                        }
                        var x = y.isSafari || y.isUiWebView ? -y.size / 2 : 0;
                        y.wrapper.transform("translate3d(0px,0," + x + "px) rotateX(" + (y.isHorizontal() ? 0 : t) + "deg) rotateY(" + (y.isHorizontal() ? -t : 0) + "deg)")
                    }, setTransition: function (e) {
                        y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), y.params.cube.shadow && !y.isHorizontal() && y.container.find(".swiper-cube-shadow").transition(e)
                    }
                }, coverflow: {
                    setTranslate: function () {
                        for (var a = y.translate, t = y.isHorizontal() ? -a + y.width / 2 : -a + y.height / 2, s = y.isHorizontal() ? y.params.coverflow.rotate : -y.params.coverflow.rotate, r = y.params.coverflow.depth, i = 0, n = y.slides.length; i < n; i++) {
                            var o = y.slides.eq(i), l = y.slidesSizesGrid[i],
                                p = (t - o[0].swiperSlideOffset - l / 2) / l * y.params.coverflow.modifier,
                                d = y.isHorizontal() ? s * p : 0, m = y.isHorizontal() ? 0 : s * p,
                                u = -r * Math.abs(p), c = y.isHorizontal() ? 0 : y.params.coverflow.stretch * p,
                                g = y.isHorizontal() ? y.params.coverflow.stretch * p : 0;
                            Math.abs(g) < .001 && (g = 0), Math.abs(c) < .001 && (c = 0), Math.abs(u) < .001 && (u = 0), Math.abs(d) < .001 && (d = 0), Math.abs(m) < .001 && (m = 0);
                            var h = "translate3d(" + g + "px," + c + "px," + u + "px)  rotateX(" + m + "deg) rotateY(" + d + "deg)";
                            if (o.transform(h), o[0].style.zIndex = 1 - Math.abs(Math.round(p)), y.params.coverflow.slideShadows) {
                                var v = y.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                    f = y.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                0 === v.length && (v = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === f.length && (f = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(f)), v.length && (v[0].style.opacity = p > 0 ? p : 0), f.length && (f[0].style.opacity = -p > 0 ? -p : 0)
                            }
                        }
                        y.browser.ie && (y.wrapper[0].style.perspectiveOrigin = t + "px 50%")
                    }, setTransition: function (e) {
                        y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                    }
                }
            }, y.lazy = {
                initialImageLoaded: !1, loadImageInSlide: function (a, t) {
                    if (void 0 !== a && (void 0 === t && (t = !0), 0 !== y.slides.length)) {
                        var s = y.slides.eq(a),
                            r = s.find("." + y.params.lazyLoadingClass + ":not(." + y.params.lazyStatusLoadedClass + "):not(." + y.params.lazyStatusLoadingClass + ")");
                        !s.hasClass(y.params.lazyLoadingClass) || s.hasClass(y.params.lazyStatusLoadedClass) || s.hasClass(y.params.lazyStatusLoadingClass) || (r = r.add(s[0])), 0 !== r.length && r.each(function () {
                            var a = e(this);
                            a.addClass(y.params.lazyStatusLoadingClass);
                            var r = a.attr("data-background"), i = a.attr("data-src"), n = a.attr("data-srcset"),
                                o = a.attr("data-sizes");
                            y.loadImage(a[0], i || r, n, o, !1, function () {
                                if (void 0 !== y && null !== y && y) {
                                    if (r ? (a.css("background-image", 'url("' + r + '")'), a.removeAttr("data-background")) : (n && (a.attr("srcset", n), a.removeAttr("data-srcset")), o && (a.attr("sizes", o), a.removeAttr("data-sizes")), i && (a.attr("src", i), a.removeAttr("data-src"))), a.addClass(y.params.lazyStatusLoadedClass).removeClass(y.params.lazyStatusLoadingClass), s.find("." + y.params.lazyPreloaderClass + ", ." + y.params.preloaderClass).remove(), y.params.loop && t) {
                                        var e = s.attr("data-swiper-slide-index");
                                        if (s.hasClass(y.params.slideDuplicateClass)) {
                                            var l = y.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + y.params.slideDuplicateClass + ")");
                                            y.lazy.loadImageInSlide(l.index(), !1)
                                        } else {
                                            var p = y.wrapper.children("." + y.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                            y.lazy.loadImageInSlide(p.index(), !1)
                                        }
                                    }
                                    y.emit("onLazyImageReady", y, s[0], a[0])
                                }
                            }), y.emit("onLazyImageLoad", y, s[0], a[0])
                        })
                    }
                }, load: function () {
                    var a, t = y.params.slidesPerView;
                    if ("auto" === t && (t = 0), y.lazy.initialImageLoaded || (y.lazy.initialImageLoaded = !0), y.params.watchSlidesVisibility) y.wrapper.children("." + y.params.slideVisibleClass).each(function () {
                        y.lazy.loadImageInSlide(e(this).index())
                    }); else if (t > 1)for (a = y.activeIndex; a < y.activeIndex + t; a++)y.slides[a] && y.lazy.loadImageInSlide(a); else y.lazy.loadImageInSlide(y.activeIndex);
                    if (y.params.lazyLoadingInPrevNext)if (t > 1 || y.params.lazyLoadingInPrevNextAmount && y.params.lazyLoadingInPrevNextAmount > 1) {
                        var s = y.params.lazyLoadingInPrevNextAmount, r = t,
                            i = Math.min(y.activeIndex + r + Math.max(s, r), y.slides.length),
                            n = Math.max(y.activeIndex - Math.max(r, s), 0);
                        for (a = y.activeIndex + t; a < i; a++)y.slides[a] && y.lazy.loadImageInSlide(a);
                        for (a = n; a < y.activeIndex; a++)y.slides[a] && y.lazy.loadImageInSlide(a)
                    } else {
                        var o = y.wrapper.children("." + y.params.slideNextClass);
                        o.length > 0 && y.lazy.loadImageInSlide(o.index());
                        var l = y.wrapper.children("." + y.params.slidePrevClass);
                        l.length > 0 && y.lazy.loadImageInSlide(l.index())
                    }
                }, onTransitionStart: function () {
                    y.params.lazyLoading && (y.params.lazyLoadingOnTransitionStart || !y.params.lazyLoadingOnTransitionStart && !y.lazy.initialImageLoaded) && y.lazy.load()
                }, onTransitionEnd: function () {
                    y.params.lazyLoading && !y.params.lazyLoadingOnTransitionStart && y.lazy.load()
                }
            }, y.scrollbar = {
                isTouched: !1,
                setDragPosition: function (e) {
                    var a = y.scrollbar,
                        t = (y.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - a.track.offset()[y.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                        s = -y.minTranslate() * a.moveDivider, r = -y.maxTranslate() * a.moveDivider;
                    t < s ? t = s : t > r && (t = r), t = -t / a.moveDivider, y.updateProgress(t), y.setWrapperTranslate(t, !0)
                },
                dragStart: function (e) {
                    var a = y.scrollbar;
                    a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), y.params.scrollbarHide && a.track.css("opacity", 1), y.wrapper.transition(100), a.drag.transition(100), y.emit("onScrollbarDragStart", y)
                },
                dragMove: function (e) {
                    var a = y.scrollbar;
                    a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), y.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), y.emit("onScrollbarDragMove", y))
                },
                dragEnd: function (e) {
                    var a = y.scrollbar;
                    a.isTouched && (a.isTouched = !1, y.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
                        a.track.css("opacity", 0), a.track.transition(400)
                    }, 1e3)), y.emit("onScrollbarDragEnd", y), y.params.scrollbarSnapOnRelease && y.slideReset())
                },
                draggableEvents: !1 !== y.params.simulateTouch || y.support.touch ? y.touchEvents : y.touchEventsDesktop,
                enableDraggable: function () {
                    var a = y.scrollbar, t = y.support.touch ? a.track : document;
                    e(a.track).on(a.draggableEvents.start, a.dragStart), e(t).on(a.draggableEvents.move, a.dragMove), e(t).on(a.draggableEvents.end, a.dragEnd)
                },
                disableDraggable: function () {
                    var a = y.scrollbar, t = y.support.touch ? a.track : document;
                    e(a.track).off(a.draggableEvents.start, a.dragStart), e(t).off(a.draggableEvents.move, a.dragMove), e(t).off(a.draggableEvents.end, a.dragEnd)
                },
                set: function () {
                    if (y.params.scrollbar) {
                        var a = y.scrollbar;
                        a.track = e(y.params.scrollbar), y.params.uniqueNavElements && "string" == typeof y.params.scrollbar && a.track.length > 1 && 1 === y.container.find(y.params.scrollbar).length && (a.track = y.container.find(y.params.scrollbar)), a.drag = a.track.find(".swiper-scrollbar-drag"), 0 === a.drag.length && (a.drag = e('<div class="swiper-scrollbar-drag"></div>'), a.track.append(a.drag)), a.drag[0].style.width = "", a.drag[0].style.height = "", a.trackSize = y.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight, a.divider = y.size / y.virtualSize, a.moveDivider = a.divider * (a.trackSize / y.size), a.dragSize = a.trackSize * a.divider, y.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px" : a.drag[0].style.height = a.dragSize + "px", a.divider >= 1 ? a.track[0].style.display = "none" : a.track[0].style.display = "", y.params.scrollbarHide && (a.track[0].style.opacity = 0)
                    }
                },
                setTranslate: function () {
                    if (y.params.scrollbar) {
                        var e, a = y.scrollbar, t = (y.translate, a.dragSize);
                        e = (a.trackSize - a.dragSize) * y.progress, y.rtl && y.isHorizontal() ? (e = -e) > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e) : e < 0 ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), y.isHorizontal() ? (y.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (y.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), y.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
                            a.track[0].style.opacity = 0, a.track.transition(400)
                        }, 1e3))
                    }
                },
                setTransition: function (e) {
                    y.params.scrollbar && y.scrollbar.drag.transition(e)
                }
            }, y.controller = {
                LinearSpline: function (e, a) {
                    var t = function () {
                        var e, a, t;
                        return function (s, r) {
                            for (a = -1, e = s.length; e - a > 1;)s[t = e + a >> 1] <= r ? a = t : e = t;
                            return e
                        }
                    }();
                    this.x = e, this.y = a, this.lastIndex = e.length - 1;
                    var s, r;
                    this.x.length, this.interpolate = function (e) {
                        return e ? (r = t(this.x, e), s = r - 1, (e - this.x[s]) * (this.y[r] - this.y[s]) / (this.x[r] - this.x[s]) + this.y[s]) : 0
                    }
                }, getInterpolateFunction: function (e) {
                    y.controller.spline || (y.controller.spline = y.params.loop ? new y.controller.LinearSpline(y.slidesGrid, e.slidesGrid) : new y.controller.LinearSpline(y.snapGrid, e.snapGrid))
                }, setTranslate: function (e, t) {
                    function s(a) {
                        e = a.rtl && "horizontal" === a.params.direction ? -y.translate : y.translate, "slide" === y.params.controlBy && (y.controller.getInterpolateFunction(a), i = -y.controller.spline.interpolate(-e)), i && "container" !== y.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (y.maxTranslate() - y.minTranslate()), i = (e - y.minTranslate()) * r + a.minTranslate()), y.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, y), a.updateActiveIndex()
                    }

                    var r, i, n = y.params.control;
                    if (Array.isArray(n))for (var o = 0; o < n.length; o++)n[o] !== t && n[o] instanceof a && s(n[o]); else n instanceof a && t !== n && s(n)
                }, setTransition: function (e, t) {
                    function s(a) {
                        a.setWrapperTransition(e, y), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
                            i && (a.params.loop && "slide" === y.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                        }))
                    }

                    var r, i = y.params.control;
                    if (Array.isArray(i))for (r = 0; r < i.length; r++)i[r] !== t && i[r] instanceof a && s(i[r]); else i instanceof a && t !== i && s(i)
                }
            }, y.hashnav = {
                onHashCange: function (e, a) {
                    var t = document.location.hash.replace("#", "");
                    t !== y.slides.eq(y.activeIndex).attr("data-hash") && y.slideTo(y.wrapper.children("." + y.params.slideClass + '[data-hash="' + t + '"]').index())
                }, attachEvents: function (a) {
                    var t = a ? "off" : "on";
                    e(window)[t]("hashchange", y.hashnav.onHashCange)
                }, setHash: function () {
                    if (y.hashnav.initialized && y.params.hashnav)if (y.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + y.slides.eq(y.activeIndex).attr("data-hash") || ""); else {
                        var e = y.slides.eq(y.activeIndex), a = e.attr("data-hash") || e.attr("data-history");
                        document.location.hash = a || ""
                    }
                }, init: function () {
                    if (y.params.hashnav && !y.params.history) {
                        y.hashnav.initialized = !0;
                        var e = document.location.hash.replace("#", "");
                        if (e)for (var a = 0, t = y.slides.length; a < t; a++) {
                            var s = y.slides.eq(a);
                            if ((s.attr("data-hash") || s.attr("data-history")) === e && !s.hasClass(y.params.slideDuplicateClass)) {
                                var r = s.index();
                                y.slideTo(r, 0, y.params.runCallbacksOnInit, !0)
                            }
                        }
                        y.params.hashnavWatchState && y.hashnav.attachEvents()
                    }
                }, destroy: function () {
                    y.params.hashnavWatchState && y.hashnav.attachEvents(!0)
                }
            }, y.history = {
                init: function () {
                    if (y.params.history) {
                        if (!window.history || !window.history.pushState)return y.params.history = !1, void(y.params.hashnav = !0);
                        y.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, y.params.runCallbacksOnInit), y.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                    }
                }, setHistoryPopState: function () {
                    y.history.paths = y.history.getPathValues(), y.history.scrollToSlide(y.params.speed, y.history.paths.value, !1)
                }, getPathValues: function () {
                    var e = window.location.pathname.slice(1).split("/"), a = e.length;
                    return {key: e[a - 2], value: e[a - 1]}
                }, setHistory: function (e, a) {
                    if (y.history.initialized && y.params.history) {
                        var t = y.slides.eq(a), s = this.slugify(t.attr("data-history"));
                        window.location.pathname.includes(e) || (s = e + "/" + s), y.params.replaceState ? window.history.replaceState(null, null, s) : window.history.pushState(null, null, s)
                    }
                }, slugify: function (e) {
                    return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                }, scrollToSlide: function (e, a, t) {
                    if (a)for (var s = 0, r = y.slides.length; s < r; s++) {
                        var i = y.slides.eq(s);
                        if (this.slugify(i.attr("data-history")) === a && !i.hasClass(y.params.slideDuplicateClass)) {
                            var n = i.index();
                            y.slideTo(n, e, t)
                        }
                    } else y.slideTo(0, e, t)
                }
            }, y.disableKeyboardControl = function () {
                y.params.keyboardControl = !1, e(document).off("keydown", l)
            }, y.enableKeyboardControl = function () {
                y.params.keyboardControl = !0, e(document).on("keydown", l)
            }, y.mousewheel = {
                event: !1,
                lastScrollTime: (new window.Date).getTime()
            }, y.params.mousewheelControl && (y.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
                var e = "onwheel" in document;
                if (!e) {
                    var a = document.createElement("div");
                    a.setAttribute("onwheel", "return;"), e = "function" == typeof a.onwheel
                }
                return !e && document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", "") && (e = document.implementation.hasFeature("Events.wheel", "3.0")), e
            }() ? "wheel" : "mousewheel"), y.disableMousewheelControl = function () {
                if (!y.mousewheel.event)return !1;
                var a = y.container;
                return "container" !== y.params.mousewheelEventsTarged && (a = e(y.params.mousewheelEventsTarged)), a.off(y.mousewheel.event, d), y.params.mousewheelControl = !1, !0
            }, y.enableMousewheelControl = function () {
                if (!y.mousewheel.event)return !1;
                var a = y.container;
                return "container" !== y.params.mousewheelEventsTarged && (a = e(y.params.mousewheelEventsTarged)), a.on(y.mousewheel.event, d), y.params.mousewheelControl = !0, !0
            }, y.parallax = {
                setTranslate: function () {
                    y.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        m(this, y.progress)
                    }), y.slides.each(function () {
                        var a = e(this);
                        a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            m(this, Math.min(Math.max(a[0].progress, -1), 1))
                        })
                    })
                }, setTransition: function (a) {
                    void 0 === a && (a = y.params.speed), y.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        var t = e(this), s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || a;
                        0 === a && (s = 0), t.transition(s)
                    })
                }
            }, y.zoom = {
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    slide: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    image: void 0,
                    imageWrap: void 0,
                    zoomMax: y.params.zoomMax
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0},
                getDistanceBetweenTouches: function (e) {
                    if (e.targetTouches.length < 2)return 1;
                    var a = e.targetTouches[0].pageX, t = e.targetTouches[0].pageY, s = e.targetTouches[1].pageX,
                        r = e.targetTouches[1].pageY;
                    return Math.sqrt(Math.pow(s - a, 2) + Math.pow(r - t, 2))
                },
                onGestureStart: function (a) {
                    var t = y.zoom;
                    if (!y.support.gestures) {
                        if ("touchstart" !== a.type || "touchstart" === a.type && a.targetTouches.length < 2)return;
                        t.gesture.scaleStart = t.getDistanceBetweenTouches(a)
                    }
                    t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = e(this), 0 === t.gesture.slide.length && (t.gesture.slide = y.slides.eq(y.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + y.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-swiper-zoom") || y.params.zoomMax, 0 !== t.gesture.imageWrap.length) ? (t.gesture.image.transition(0), t.isScaling = !0) : t.gesture.image = void 0
                },
                onGestureChange: function (e) {
                    var a = y.zoom;
                    if (!y.support.gestures) {
                        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)return;
                        a.gesture.scaleMove = a.getDistanceBetweenTouches(e)
                    }
                    a.gesture.image && 0 !== a.gesture.image.length && (y.support.gestures ? a.scale = e.scale * a.currentScale : a.scale = a.gesture.scaleMove / a.gesture.scaleStart * a.currentScale, a.scale > a.gesture.zoomMax && (a.scale = a.gesture.zoomMax - 1 + Math.pow(a.scale - a.gesture.zoomMax + 1, .5)), a.scale < y.params.zoomMin && (a.scale = y.params.zoomMin + 1 - Math.pow(y.params.zoomMin - a.scale + 1, .5)), a.gesture.image.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
                },
                onGestureEnd: function (e) {
                    var a = y.zoom;
                    !y.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || a.gesture.image && 0 !== a.gesture.image.length && (a.scale = Math.max(Math.min(a.scale, a.gesture.zoomMax), y.params.zoomMin), a.gesture.image.transition(y.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (a.gesture.slide = void 0))
                },
                onTouchStart: function (e, a) {
                    var t = e.zoom;
                    t.gesture.image && 0 !== t.gesture.image.length && (t.image.isTouched || ("android" === e.device.os && a.preventDefault(), t.image.isTouched = !0, t.image.touchesStart.x = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, t.image.touchesStart.y = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY))
                },
                onTouchMove: function (e) {
                    var a = y.zoom;
                    if (a.gesture.image && 0 !== a.gesture.image.length && (y.allowClick = !1, a.image.isTouched && a.gesture.slide)) {
                        a.image.isMoved || (a.image.width = a.gesture.image[0].offsetWidth, a.image.height = a.gesture.image[0].offsetHeight, a.image.startX = y.getTranslate(a.gesture.imageWrap[0], "x") || 0, a.image.startY = y.getTranslate(a.gesture.imageWrap[0], "y") || 0, a.gesture.slideWidth = a.gesture.slide[0].offsetWidth, a.gesture.slideHeight = a.gesture.slide[0].offsetHeight, a.gesture.imageWrap.transition(0), y.rtl && (a.image.startX = -a.image.startX), y.rtl && (a.image.startY = -a.image.startY));
                        var t = a.image.width * a.scale, s = a.image.height * a.scale;
                        if (!(t < a.gesture.slideWidth && s < a.gesture.slideHeight)) {
                            if (a.image.minX = Math.min(a.gesture.slideWidth / 2 - t / 2, 0), a.image.maxX = -a.image.minX, a.image.minY = Math.min(a.gesture.slideHeight / 2 - s / 2, 0), a.image.maxY = -a.image.minY, a.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.image.isMoved && !a.isScaling) {
                                if (y.isHorizontal() && Math.floor(a.image.minX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x < a.image.touchesStart.x || Math.floor(a.image.maxX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x > a.image.touchesStart.x)return void(a.image.isTouched = !1);
                                if (!y.isHorizontal() && Math.floor(a.image.minY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y < a.image.touchesStart.y || Math.floor(a.image.maxY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y > a.image.touchesStart.y)return void(a.image.isTouched = !1)
                            }
                            e.preventDefault(), e.stopPropagation(), a.image.isMoved = !0, a.image.currentX = a.image.touchesCurrent.x - a.image.touchesStart.x + a.image.startX, a.image.currentY = a.image.touchesCurrent.y - a.image.touchesStart.y + a.image.startY, a.image.currentX < a.image.minX && (a.image.currentX = a.image.minX + 1 - Math.pow(a.image.minX - a.image.currentX + 1, .8)), a.image.currentX > a.image.maxX && (a.image.currentX = a.image.maxX - 1 + Math.pow(a.image.currentX - a.image.maxX + 1, .8)), a.image.currentY < a.image.minY && (a.image.currentY = a.image.minY + 1 - Math.pow(a.image.minY - a.image.currentY + 1, .8)), a.image.currentY > a.image.maxY && (a.image.currentY = a.image.maxY - 1 + Math.pow(a.image.currentY - a.image.maxY + 1, .8)), a.velocity.prevPositionX || (a.velocity.prevPositionX = a.image.touchesCurrent.x), a.velocity.prevPositionY || (a.velocity.prevPositionY = a.image.touchesCurrent.y), a.velocity.prevTime || (a.velocity.prevTime = Date.now()), a.velocity.x = (a.image.touchesCurrent.x - a.velocity.prevPositionX) / (Date.now() - a.velocity.prevTime) / 2, a.velocity.y = (a.image.touchesCurrent.y - a.velocity.prevPositionY) / (Date.now() - a.velocity.prevTime) / 2, Math.abs(a.image.touchesCurrent.x - a.velocity.prevPositionX) < 2 && (a.velocity.x = 0), Math.abs(a.image.touchesCurrent.y - a.velocity.prevPositionY) < 2 && (a.velocity.y = 0), a.velocity.prevPositionX = a.image.touchesCurrent.x, a.velocity.prevPositionY = a.image.touchesCurrent.y, a.velocity.prevTime = Date.now(), a.gesture.imageWrap.transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)")
                        }
                    }
                },
                onTouchEnd: function (e, a) {
                    var t = e.zoom;
                    if (t.gesture.image && 0 !== t.gesture.image.length) {
                        if (!t.image.isTouched || !t.image.isMoved)return t.image.isTouched = !1, void(t.image.isMoved = !1);
                        t.image.isTouched = !1, t.image.isMoved = !1;
                        var s = 300, r = 300, i = t.velocity.x * s, n = t.image.currentX + i, o = t.velocity.y * r,
                            l = t.image.currentY + o;
                        0 !== t.velocity.x && (s = Math.abs((n - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (r = Math.abs((l - t.image.currentY) / t.velocity.y));
                        var p = Math.max(s, r);
                        t.image.currentX = n, t.image.currentY = l;
                        var d = t.image.width * t.scale, m = t.image.height * t.scale;
                        t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - m / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(p).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                    }
                },
                onTransitionEnd: function (e) {
                    var a = e.zoom;
                    a.gesture.slide && e.previousIndex !== e.activeIndex && (a.gesture.image.transform("translate3d(0,0,0) scale(1)"), a.gesture.imageWrap.transform("translate3d(0,0,0)"), a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0, a.scale = a.currentScale = 1)
                },
                toggleZoom: function (a, t) {
                    var s = a.zoom;
                    if (s.gesture.slide || (s.gesture.slide = a.clickedSlide ? e(a.clickedSlide) : a.slides.eq(a.activeIndex), s.gesture.image = s.gesture.slide.find("img, svg, canvas"), s.gesture.imageWrap = s.gesture.image.parent("." + a.params.zoomContainerClass)), s.gesture.image && 0 !== s.gesture.image.length) {
                        var r, i, n, o, l, p, d, m, u, c, g, h, v, f, w, x, y, T;
                        void 0 === s.image.touchesStart.x && t ? (r = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, i = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (r = s.image.touchesStart.x, i = s.image.touchesStart.y), s.scale && 1 !== s.scale ? (s.scale = s.currentScale = 1, s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), s.gesture.slide = void 0) : (s.scale = s.currentScale = s.gesture.imageWrap.attr("data-swiper-zoom") || a.params.zoomMax, t ? (y = s.gesture.slide[0].offsetWidth, T = s.gesture.slide[0].offsetHeight, n = s.gesture.slide.offset().left, o = s.gesture.slide.offset().top, l = n + y / 2 - r, p = o + T / 2 - i, u = s.gesture.image[0].offsetWidth, c = s.gesture.image[0].offsetHeight, g = u * s.scale, h = c * s.scale, v = Math.min(y / 2 - g / 2, 0), f = Math.min(T / 2 - h / 2, 0), w = -v, x = -f, d = l * s.scale, m = p * s.scale, d < v && (d = v), d > w && (d = w), m < f && (m = f), m > x && (m = x)) : (d = 0, m = 0), s.gesture.imageWrap.transition(300).transform("translate3d(" + d + "px, " + m + "px,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")"))
                    }
                },
                attachEvents: function (a) {
                    var t = a ? "off" : "on";
                    if (y.params.zoom) {
                        var s = (y.slides, !("touchstart" !== y.touchEvents.start || !y.support.passiveListener || !y.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        });
                        y.support.gestures ? (y.slides[t]("gesturestart", y.zoom.onGestureStart, s), y.slides[t]("gesturechange", y.zoom.onGestureChange, s), y.slides[t]("gestureend", y.zoom.onGestureEnd, s)) : "touchstart" === y.touchEvents.start && (y.slides[t](y.touchEvents.start, y.zoom.onGestureStart, s), y.slides[t](y.touchEvents.move, y.zoom.onGestureChange, s), y.slides[t](y.touchEvents.end, y.zoom.onGestureEnd, s)), y[t]("touchStart", y.zoom.onTouchStart), y.slides.each(function (a, s) {
                            e(s).find("." + y.params.zoomContainerClass).length > 0 && e(s)[t](y.touchEvents.move, y.zoom.onTouchMove)
                        }), y[t]("touchEnd", y.zoom.onTouchEnd), y[t]("transitionEnd", y.zoom.onTransitionEnd), y.params.zoomToggle && y.on("doubleTap", y.zoom.toggleZoom)
                    }
                },
                init: function () {
                    y.zoom.attachEvents()
                },
                destroy: function () {
                    y.zoom.attachEvents(!0)
                }
            }, y._plugins = [];
            for (var Y in y.plugins) {
                var A = y.plugins[Y](y, y.params[Y]);
                A && y._plugins.push(A)
            }
            return y.callPlugins = function (e) {
                for (var a = 0; a < y._plugins.length; a++)e in y._plugins[a] && y._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, y.emitterEventListeners = {}, y.emit = function (e) {
                y.params[e] && y.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (y.emitterEventListeners[e])for (a = 0; a < y.emitterEventListeners[e].length; a++)y.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                y.callPlugins && y.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, y.on = function (e, a) {
                return e = u(e), y.emitterEventListeners[e] || (y.emitterEventListeners[e] = []), y.emitterEventListeners[e].push(a), y
            }, y.off = function (e, a) {
                var t;
                if (e = u(e), void 0 === a)return y.emitterEventListeners[e] = [], y;
                if (y.emitterEventListeners[e] && 0 !== y.emitterEventListeners[e].length) {
                    for (t = 0; t < y.emitterEventListeners[e].length; t++)y.emitterEventListeners[e][t] === a && y.emitterEventListeners[e].splice(t, 1);
                    return y
                }
            }, y.once = function (e, a) {
                e = u(e);
                var t = function () {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), y.off(e, t)
                };
                return y.on(e, t), y
            }, y.a11y = {
                makeFocusable: function (e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function (e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function (e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function (e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function (e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function (a) {
                    13 === a.keyCode && (e(a.target).is(y.params.nextButton) ? (y.onClickNext(a), y.isEnd ? y.a11y.notify(y.params.lastSlideMessage) : y.a11y.notify(y.params.nextSlideMessage)) : e(a.target).is(y.params.prevButton) && (y.onClickPrev(a), y.isBeginning ? y.a11y.notify(y.params.firstSlideMessage) : y.a11y.notify(y.params.prevSlideMessage)), e(a.target).is("." + y.params.bulletClass) && e(a.target)[0].click())
                },
                liveRegion: e('<span class="' + y.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function (e) {
                    var a = y.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function () {
                    y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.a11y.makeFocusable(y.nextButton), y.a11y.addRole(y.nextButton, "button"), y.a11y.addLabel(y.nextButton, y.params.nextSlideMessage)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.a11y.makeFocusable(y.prevButton), y.a11y.addRole(y.prevButton, "button"), y.a11y.addLabel(y.prevButton, y.params.prevSlideMessage)), e(y.container).append(y.a11y.liveRegion)
                },
                initPagination: function () {
                    y.params.pagination && y.params.paginationClickable && y.bullets && y.bullets.length && y.bullets.each(function () {
                        var a = e(this);
                        y.a11y.makeFocusable(a), y.a11y.addRole(a, "button"), y.a11y.addLabel(a, y.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                    })
                },
                destroy: function () {
                    y.a11y.liveRegion && y.a11y.liveRegion.length > 0 && y.a11y.liveRegion.remove()
                }
            }, y.init = function () {
                y.params.loop && y.createLoop(), y.updateContainerSize(), y.updateSlidesSize(), y.updatePagination(), y.params.scrollbar && y.scrollbar && (y.scrollbar.set(), y.params.scrollbarDraggable && y.scrollbar.enableDraggable()), "slide" !== y.params.effect && y.effects[y.params.effect] && (y.params.loop || y.updateProgress(), y.effects[y.params.effect].setTranslate()), y.params.loop ? y.slideTo(y.params.initialSlide + y.loopedSlides, 0, y.params.runCallbacksOnInit) : (y.slideTo(y.params.initialSlide, 0, y.params.runCallbacksOnInit), 0 === y.params.initialSlide && (y.parallax && y.params.parallax && y.parallax.setTranslate(), y.lazy && y.params.lazyLoading && (y.lazy.load(), y.lazy.initialImageLoaded = !0))), y.attachEvents(), y.params.observer && y.support.observer && y.initObservers(), y.params.preloadImages && !y.params.lazyLoading && y.preloadImages(), y.params.zoom && y.zoom && y.zoom.init(), y.params.autoplay && y.startAutoplay(), y.params.keyboardControl && y.enableKeyboardControl && y.enableKeyboardControl(), y.params.mousewheelControl && y.enableMousewheelControl && y.enableMousewheelControl(), y.params.hashnavReplaceState && (y.params.replaceState = y.params.hashnavReplaceState), y.params.history && y.history && y.history.init(), y.params.hashnav && y.hashnav && y.hashnav.init(), y.params.a11y && y.a11y && y.a11y.init(), y.emit("onInit", y)
            }, y.cleanupStyles = function () {
                y.container.removeClass(y.classNames.join(" ")).removeAttr("style"), y.wrapper.removeAttr("style"), y.slides && y.slides.length && y.slides.removeClass([y.params.slideVisibleClass, y.params.slideActiveClass, y.params.slideNextClass, y.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), y.paginationContainer && y.paginationContainer.length && y.paginationContainer.removeClass(y.params.paginationHiddenClass), y.bullets && y.bullets.length && y.bullets.removeClass(y.params.bulletActiveClass), y.params.prevButton && e(y.params.prevButton).removeClass(y.params.buttonDisabledClass), y.params.nextButton && e(y.params.nextButton).removeClass(y.params.buttonDisabledClass), y.params.scrollbar && y.scrollbar && (y.scrollbar.track && y.scrollbar.track.length && y.scrollbar.track.removeAttr("style"), y.scrollbar.drag && y.scrollbar.drag.length && y.scrollbar.drag.removeAttr("style"))
            }, y.destroy = function (e, a) {
                y.detachEvents(), y.stopAutoplay(), y.params.scrollbar && y.scrollbar && y.params.scrollbarDraggable && y.scrollbar.disableDraggable(), y.params.loop && y.destroyLoop(), a && y.cleanupStyles(), y.disconnectObservers(), y.params.zoom && y.zoom && y.zoom.destroy(), y.params.keyboardControl && y.disableKeyboardControl && y.disableKeyboardControl(), y.params.mousewheelControl && y.disableMousewheelControl && y.disableMousewheelControl(), y.params.a11y && y.a11y && y.a11y.destroy(), y.params.history && !y.params.replaceState && window.removeEventListener("popstate", y.history.setHistoryPopState), y.params.hashnav && y.hashnav && y.hashnav.destroy(), y.emit("onDestroy"), !1 !== e && (y = null)
            }, y.init(), y
        }
    };
    a.prototype = {
        isSafari: function () {
            var e = window.navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function (e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
            lteIE9: function () {
                var e = document.createElement("div");
                return e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e", 1 === e.getElementsByTagName("i").length
            }()
        },
        device: function () {
            var e = window.navigator.userAgent, a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/), s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                r = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {ios: t || r || s, android: a}
        }(),
        support: {
            touch: window.Modernizr && !0 === Modernizr.touch || !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
            transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function () {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(),
            flexbox: function () {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)if (a[t] in e)return !0
            }(),
            observer: "MutationObserver" in window || "WebkitMutationObserver" in window,
            passiveListener: function () {
                var e = !1;
                try {
                    var a = Object.defineProperty({}, "passive", {
                        get: function () {
                            e = !0
                        }
                    });
                    window.addEventListener("testPassiveListener", null, a)
                } catch (e) {
                }
                return e
            }(),
            gestures: "ongesturestart" in window
        },
        plugins: {}
    };
    for (var t = ["jQuery", "Zepto", "Dom7"], s = 0; s < t.length; s++)window[t[s]] && function (e) {
        e.fn.swiper = function (t) {
            var s;
            return e(this).each(function () {
                var e = new a(this, t);
                s || (s = e)
            }), s
        }
    }(window[t[s]]);
    var r;
    (r = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7) && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function (e) {
        function a(i) {
            if (i.target === this)for (e.call(this, i), t = 0; t < s.length; t++)r.off(s[t], a)
        }

        var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            r = this;
        if (e)for (t = 0; t < s.length; t++)r.on(s[t], a);
        return this
    }), "transform" in r.fn || (r.fn.transform = function (e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in r.fn || (r.fn.transition = function (e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    }), "outerWidth" in r.fn || (r.fn.outerWidth = function (e) {
        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
    })), window.Swiper = a
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
        "use strict";
        return window.Swiper
    });
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
        var s = function (t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i
        }, r = function (t, e, i) {
            var s, r, n = t.cycle;
            for (s in n)r = n[s], t[s] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
            delete t.cycle
        }, n = function (t, e, s) {
            i.call(this, t, e, s), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = n.prototype.render
        }, a = 1e-10, o = i._internals, l = o.isSelector, h = o.isArray, _ = n.prototype = i.to({}, .1, {}), u = [];
        n.version = "1.19.1", _.constructor = n, _.kill()._gc = !1, n.killTweensOf = n.killDelayedCallsTo = i.killTweensOf, n.getTweensOf = i.getTweensOf, n.lagSmoothing = i.lagSmoothing, n.ticker = i.ticker, n.render = i.render, _.invalidate = function () {
            return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
        }, _.updateTo = function (t, e) {
            var s, r = this.ratio, n = this.vars.immediateRender || t.immediateRender;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (s in t)this.vars[s] = t[s];
            if (this._initted || n)if (e) this._initted = !1, n && this.render(0, !0, !0); else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                var a = this._totalTime;
                this.render(0, !0, !1), this._initted = !1, this.render(a, !0, !1)
            } else if (this._initted = !1, this._init(), this._time > 0 || n)for (var o, l = 1 / (1 - r), h = this._firstPT; h;)o = h.s + h.c, h.c *= l, h.s = o - h.c, h = h._next;
            return this
        }, _.render = function (t, e, i) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var s, r, n, l, h, _, u, f, c = this._dirty ? this.totalDuration() : this._totalDuration, p = this._time,
                d = this._totalTime, m = this._cycle, g = this._duration, v = this._rawPrevTime;
            if (t >= c - 1e-7 && t >= 0 ? (this._totalTime = c, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = g, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === g && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > v || 0 >= t && t >= -1e-7 || v === a && "isPause" !== this.data) && v !== t && (i = !0, v > a && (r = "onReverseComplete")), this._rawPrevTime = f = !e || t || v === t ? t : a)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== d || 0 === g && v > 0) && (r = "onReverseComplete", s = this._reversed), 0 > t && (this._active = !1, 0 === g && (this._initted || !this.vars.lazy || i) && (v >= 0 && (i = !0), this._rawPrevTime = f = !e || t || v === t ? t : a)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (l = g + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && t >= d && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 != (1 & this._cycle) && (this._time = g - this._time), this._time > g ? this._time = g : this._time < 0 && (this._time = 0)), this._easeType ? (h = this._time / g, _ = this._easeType, u = this._easePower, (1 === _ || 3 === _ && h >= .5) && (h = 1 - h), 3 === _ && (h *= 2), 1 === u ? h *= h : 2 === u ? h *= h * h : 3 === u ? h *= h * h * h : 4 === u && (h *= h * h * h * h), 1 === _ ? this.ratio = 1 - h : 2 === _ ? this.ratio = h : this._time / g < .5 ? this.ratio = h / 2 : this.ratio = 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / g)), p !== this._time || i || m !== this._cycle) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc)return;
                    if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration))return this._time = p, this._totalTime = d, this._rawPrevTime = v, this._cycle = m, o.lazyTweens.push(this), void(this._lazy = [t, e]);
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / g) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== p && t >= 0 && (this._active = !0), 0 === d && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === g) && (e || this._callback("onStart"))), n = this._firstPT; n;)n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== d || r) && this._callback("onUpdate")), this._cycle !== m && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === g && this._rawPrevTime === a && f !== a && (this._rawPrevTime = 0))
            } else d !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
        }, n.to = function (t, e, i) {
            return new n(t, e, i)
        }, n.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new n(t, e, i)
        }, n.fromTo = function (t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new n(t, e, s)
        }, n.staggerTo = n.allTo = function (t, e, a, o, _, f, c) {
            o = o || 0;
            var p, d, m, g, v = 0, y = [], T = a.cycle, x = a.startAt && a.startAt.cycle;
            for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = s(t))), t = t || [], 0 > o && ((t = s(t)).reverse(), o *= -1), p = t.length - 1, m = 0; p >= m; m++) {
                d = {};
                for (g in a)d[g] = a[g];
                if (T && (r(d, t, m), null != d.duration && (e = d.duration, delete d.duration)), x) {
                    x = d.startAt = {};
                    for (g in a.startAt)x[g] = a.startAt[g];
                    r(d.startAt, t, m)
                }
                d.delay = v + (d.delay || 0), m === p && _ && (d.onComplete = function () {
                    a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments), _.apply(c || a.callbackScope || this, f || u)
                }), y[m] = new n(t[m], e, d), v += o
            }
            return y
        }, n.staggerFrom = n.allFrom = function (t, e, i, s, r, a, o) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, n.staggerTo(t, e, i, s, r, a, o)
        }, n.staggerFromTo = n.allFromTo = function (t, e, i, s, r, a, o, l) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, n.staggerTo(t, e, s, r, a, o, l)
        }, n.delayedCall = function (t, e, i, s, r) {
            return new n(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                callbackScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            })
        }, n.set = function (t, e) {
            return new n(t, 0, e)
        }, n.isTweening = function (t) {
            return i.getTweensOf(t, !0).length > 0
        };
        var f = function (t, e) {
            for (var s = [], r = 0, n = t._first; n;)n instanceof i ? s[r++] = n : (e && (s[r++] = n), s = s.concat(f(n, e)), r = s.length), n = n._next;
            return s
        }, c = n.getAllTweens = function (e) {
            return f(t._rootTimeline, e).concat(f(t._rootFramesTimeline, e))
        };
        n.killAll = function (t, i, s, r) {
            null == i && (i = !0), null == s && (s = !0);
            var n, a, o, l = c(0 != r), h = l.length, _ = i && s && r;
            for (o = 0; h > o; o++)a = l[o], (_ || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
        }, n.killChildTweensOf = function (t, e) {
            if (null != t) {
                var r, a, _, u, f, c = o.tweenLookup;
                if ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = s(t)), h(t))for (u = t.length; --u > -1;)n.killChildTweensOf(t[u], e); else {
                    r = [];
                    for (_ in c)for (a = c[_].target.parentNode; a;)a === t && (r = r.concat(c[_].tweens)), a = a.parentNode;
                    for (f = r.length, u = 0; f > u; u++)e && r[u].totalTime(r[u].totalDuration()), r[u]._enabled(!1, !1)
                }
            }
        };
        var p = function (t, i, s, r) {
            i = !1 !== i, s = !1 !== s;
            for (var n, a, o = c(r = !1 !== r), l = i && s && r, h = o.length; --h > -1;)a = o[h], (l || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
        };
        return n.pauseAll = function (t, e, i) {
            p(!0, t, e, i)
        }, n.resumeAll = function (t, e, i) {
            p(!1, t, e, i)
        }, n.globalTimeScale = function (e) {
            var s = t._rootTimeline, r = i.ticker.time;
            return arguments.length ? (e = e || a, s._startTime = r - (r - s._startTime) * s._timeScale / e, s = t._rootFramesTimeline, r = i.ticker.frame, s._startTime = r - (r - s._startTime) * s._timeScale / e, s._timeScale = t._rootTimeline._timeScale = e, e) : s._timeScale
        }, _.progress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }, _.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }, _.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, _.duration = function (e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration
        }, _.totalDuration = function (t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, _.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, _.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, _.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, n
    }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
        var s = function (t) {
                e.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                var i, s, r = this.vars;
                for (s in r)i = r[s], l(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
                l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
            }, r = 1e-10, n = i._internals, a = s._internals = {}, o = n.isSelector, l = n.isArray, h = n.lazyTweens,
            _ = n.lazyRender, u = _gsScope._gsDefine.globals, f = function (t) {
                var e, i = {};
                for (e in t)i[e] = t[e];
                return i
            }, c = function (t, e, i) {
                var s, r, n = t.cycle;
                for (s in n)r = n[s], t[s] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
                delete t.cycle
            }, p = a.pauseCallback = function () {
            }, d = function (t) {
                var e, i = [], s = t.length;
                for (e = 0; e !== s; i.push(t[e++]));
                return i
            }, m = s.prototype = new e;
        return s.version = "1.19.1", m.constructor = s, m.kill()._gc = m._forcingPlayhead = m._hasPause = !1, m.to = function (t, e, s, r) {
            var n = s.repeat && u.TweenMax || i;
            return e ? this.add(new n(t, e, s), r) : this.set(t, s, r)
        }, m.from = function (t, e, s, r) {
            return this.add((s.repeat && u.TweenMax || i).from(t, e, s), r)
        }, m.fromTo = function (t, e, s, r, n) {
            var a = r.repeat && u.TweenMax || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
        }, m.staggerTo = function (t, e, r, n, a, l, h, _) {
            var u, p, m = new s({
                onComplete: l,
                onCompleteParams: h,
                callbackScope: _,
                smoothChildTiming: this.smoothChildTiming
            }), g = r.cycle;
            for ("string" == typeof t && (t = i.selector(t) || t), o(t = t || []) && (t = d(t)), 0 > (n = n || 0) && ((t = d(t)).reverse(), n *= -1), p = 0; p < t.length; p++)(u = f(r)).startAt && (u.startAt = f(u.startAt), u.startAt.cycle && c(u.startAt, t, p)), g && (c(u, t, p), null != u.duration && (e = u.duration, delete u.duration)), m.to(t[p], e, u, p * n);
            return this.add(m, a)
        }, m.staggerFrom = function (t, e, i, s, r, n, a, o) {
            return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
        }, m.staggerFromTo = function (t, e, i, s, r, n, a, o, l) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, l)
        }, m.call = function (t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r)
        }, m.set = function (t, e, s) {
            return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
        }, s.exportRoot = function (t, e) {
            null == (t = t || {}).smoothChildTiming && (t.smoothChildTiming = !0);
            var r, n, a = new s(t), o = a._timeline;
            for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;)n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
            return o.add(a, 0), a
        }, m.add = function (r, n, a, o) {
            var h, _, u, f, c, p;
            if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                if (r instanceof Array || r && r.push && l(r)) {
                    for (a = a || "normal", o = o || 0, h = n, _ = r.length, u = 0; _ > u; u++)l(f = r[u]) && (f = new s({tweens: f})), this.add(f, h), "string" != typeof f && "function" != typeof f && ("sequence" === a ? h = f._startTime + f.totalDuration() / f._timeScale : "start" === a && (f._startTime -= f.delay())), h += o;
                    return this._uncache(!0)
                }
                if ("string" == typeof r)return this.addLabel(r, n);
                if ("function" != typeof r)throw"Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r)
            }
            if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())for (c = this, p = c.rawTime() > r._startTime; c._timeline;)p && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1), c = c._timeline;
            return this
        }, m.remove = function (e) {
            if (e instanceof t) {
                this._remove(e, !1);
                var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
            }
            if (e instanceof Array || e && e.push && l(e)) {
                for (var s = e.length; --s > -1;)this.remove(e[s]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }, m._remove = function (t, i) {
            return e.prototype._remove.call(this, t, i), this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, m.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }, m.insert = m.insertMultiple = function (t, e, i, s) {
            return this.add(t, e || 0, i, s)
        }, m.appendMultiple = function (t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
        }, m.addLabel = function (t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this
        }, m.addPause = function (t, e, s, r) {
            var n = i.delayedCall(0, p, s, r || this);
            return n.vars.onComplete = n.vars.onReverseComplete = e, n.data = "isPause", this._hasPause = !0, this.add(n, t)
        }, m.removeLabel = function (t) {
            return delete this._labels[t], this
        }, m.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }, m._parseTimeOrLabel = function (e, i, s, r) {
            var n;
            if (r instanceof t && r.timeline === this) this.remove(r); else if (r && (r instanceof Array || r.push && l(r)))for (n = r.length; --n > -1;)r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
            if ("string" == typeof i)return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
            if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration()); else {
                if (-1 === (n = e.indexOf("=")))return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
            }
            return Number(e) + i
        }, m.seek = function (t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
        }, m.stop = function () {
            return this.paused(!0)
        }, m.gotoAndPlay = function (t, e) {
            return this.play(t, e)
        }, m.gotoAndStop = function (t, e) {
            return this.pause(t, e)
        }, m.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, n, a, o, l, u, f, c = this._dirty ? this.totalDuration() : this._totalDuration, p = this._time,
                d = this._startTime, m = this._timeScale, g = this._paused;
            if (t >= c - 1e-7 && t >= 0) this._totalTime = this._time = c, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = c + 1e-4; else if (1e-7 > t)if (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = n = !0, o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t; else {
                if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && n)for (s = this._first; s && 0 === s._startTime;)s._duration || (n = !1), s = s._next;
                t = 0, this._initted || (l = !0)
            } else {
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if (t >= p)for (s = this._first; s && s._startTime <= t && !u;)s._duration || "isPause" !== s.data || s.ratio || 0 === s._startTime && 0 === this._rawPrevTime || (u = s), s = s._next; else for (s = this._last; s && s._startTime >= t && !u;)s._duration || "isPause" === s.data && s._rawPrevTime > 0 && (u = s), s = s._prev;
                    u && (this._time = t = u._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = t
            }
            if (this._time !== p && this._first || i || l || u) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0), 0 === p && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), (f = this._time) >= p)for (s = this._first; s && (a = s._next, f === this._time && (!this._paused || g));)(s._active || s._startTime <= f && !s._paused && !s._gc) && (u === s && this.pause(), s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a; else for (s = this._last; s && (a = s._prev, f === this._time && (!this._paused || g));) {
                    if (s._active || s._startTime <= p && !s._paused && !s._gc) {
                        if (u === s) {
                            for (u = s._prev; u && u.endTime() > this._time;)u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i), u = u._prev;
                            u = null, this.pause()
                        }
                        s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)
                    }
                    s = a
                }
                this._onUpdate && (e || (h.length && _(), this._callback("onUpdate"))), o && (this._gc || (d === this._startTime || m !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (n && (h.length && _(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this._callback(o)))
            }
        }, m._hasPausedChild = function () {
            for (var t = this._first; t;) {
                if (t._paused || t instanceof s && t._hasPausedChild())return !0;
                t = t._next
            }
            return !1
        }, m.getChildren = function (t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a;)a._startTime < r || (a instanceof i ? !1 !== e && (n[o++] = a) : (!1 !== s && (n[o++] = a), !1 !== t && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
            return n
        }, m.getTweensOf = function (t, e) {
            var s, r, n = this._gc, a = [], o = 0;
            for (n && this._enabled(!0, !0), r = (s = i.getTweensOf(t)).length; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
            return n && this._enabled(!1, !0), a
        }, m.recent = function () {
            return this._recent
        }, m._contains = function (t) {
            for (var e = t.timeline; e;) {
                if (e === this)return !0;
                e = e.timeline
            }
            return !1
        }, m.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r;)r._startTime >= i && (r._startTime += t), r = r._next;
            if (e)for (s in n)n[s] >= i && (n[s] += t);
            return this._uncache(!0)
        }, m._kill = function (t, e) {
            if (!t && !e)return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;)i[s]._kill(t, e) && (r = !0);
            return r
        }, m.clear = function (t) {
            var e = this.getChildren(!1, !0, !0), i = e.length;
            for (this._time = this._totalTime = 0; --i > -1;)e[i]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}), this._uncache(!0)
        }, m.invalidate = function () {
            for (var e = this._first; e;)e.invalidate(), e = e._next;
            return t.prototype.invalidate.call(this)
        }, m._enabled = function (t, i) {
            if (t === this._gc)for (var s = this._first; s;)s._enabled(t, !0), s = s._next;
            return e.prototype._enabled.call(this, t, i)
        }, m.totalTime = function (e, i, s) {
            this._forcingPlayhead = !0;
            var r = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, r
        }, m.duration = function (t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
        }, m.totalDuration = function (t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, s = 0, r = this._last, n = 999999999999; r;)e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, r._startTime < 0 && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), (i = r._startTime + r._totalDuration / r._timeScale) > s && (s = i), r = e;
                    this._duration = this._totalDuration = s, this._dirty = !1
                }
                return this._totalDuration
            }
            return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
        }, m.paused = function (e) {
            if (!e)for (var i = this._first, s = this._time; i;)i._startTime === s && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
            return t.prototype.paused.apply(this, arguments)
        }, m.usesFrames = function () {
            for (var e = this._timeline; e._timeline;)e = e._timeline;
            return e === t._rootFramesTimeline
        }, m.rawTime = function (t) {
            return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
        }, s
    }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (t, e, i) {
        var s = function (e) {
                t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
            }, r = 1e-10, n = e._internals, a = n.lazyTweens, o = n.lazyRender, l = _gsScope._gsDefine.globals,
            h = new i(null, null, 1, 0), _ = s.prototype = new t;
        return _.constructor = s, _.kill()._gc = !1, s.version = "1.19.1", _.invalidate = function () {
            return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
        }, _.addCallback = function (t, i, s, r) {
            return this.add(e.delayedCall(0, t, s, r), i)
        }, _.removeCallback = function (t, e) {
            if (t)if (null == e) this._kill(null, t); else for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;)i[s]._startTime === r && i[s]._enabled(!1, !1);
            return this
        }, _.removePause = function (e) {
            return this.removeCallback(t._internals.pauseCallback, e)
        }, _.tweenTo = function (t, i) {
            i = i || {};
            var s, r, n, a = {ease: h, useFrames: this.usesFrames(), immediateRender: !1},
                o = i.repeat && l.TweenMax || e;
            for (r in i)a[r] = i[r];
            return a.time = this._parseTimeOrLabel(t), s = Math.abs(Number(a.time) - this._time) / this._timeScale || .001, n = new o(this, s, a), a.onStart = function () {
                n.target.paused(!0), n.vars.time !== n.target.time() && s === n.duration() && n.duration(Math.abs(n.vars.time - n.target.time()) / n.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || n, i.onStartParams || [])
            }, n
        }, _.tweenFromTo = function (t, e, i) {
            i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                callbackScope: this
            }, i.immediateRender = !1 !== i.immediateRender;
            var s = this.tweenTo(e, i);
            return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
        }, _.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, n, l, h, _, u, f, c, p = this._dirty ? this.totalDuration() : this._totalDuration,
                d = this._duration, m = this._time, g = this._totalTime, v = this._startTime, y = this._timeScale,
                T = this._rawPrevTime, x = this._paused, b = this._cycle;
            if (t >= p - 1e-7 && t >= 0) this._locked || (this._totalTime = p, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (n = !0, h = "onComplete", _ = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || 0 > T || T === r) && T !== t && this._first && (_ = !0, T > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = d, t = d + 1e-4); else if (1e-7 > t)if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== m || 0 === d && T !== r && (T > 0 || 0 > t && T >= 0) && !this._locked) && (h = "onReverseComplete", n = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (_ = n = !0, h = "onReverseComplete") : T >= 0 && this._first && (_ = !0), this._rawPrevTime = t; else {
                if (this._rawPrevTime = d || !e || t || this._rawPrevTime === t ? t : r, 0 === t && n)for (s = this._first; s && 0 === s._startTime;)s._duration || (n = !1), s = s._next;
                t = 0, this._initted || (_ = !0)
            } else if (0 === d && 0 > T && (_ = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (u = d + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && t >= g && this._cycle--, this._time = this._totalTime - this._cycle * u, this._yoyo && 0 != (1 & this._cycle) && (this._time = d - this._time), this._time > d ? (this._time = d, t = d + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e && d > t) {
                if ((t = this._time) >= m || this._repeat && b !== this._cycle)for (s = this._first; s && s._startTime <= t && !f;)s._duration || "isPause" !== s.data || s.ratio || 0 === s._startTime && 0 === this._rawPrevTime || (f = s), s = s._next; else for (s = this._last; s && s._startTime >= t && !f;)s._duration || "isPause" === s.data && s._rawPrevTime > 0 && (f = s), s = s._prev;
                f && (this._time = t = f._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== b && !this._locked) {
                var w = this._yoyo && 0 != (1 & b), P = w === (this._yoyo && 0 != (1 & this._cycle)),
                    O = this._totalTime, S = this._cycle, k = this._rawPrevTime, R = this._time;
                if (this._totalTime = b * d, this._cycle < b ? w = !w : this._totalTime += d, this._time = m, this._rawPrevTime = 0 === d ? T - 1e-4 : T, this._cycle = b, this._locked = !0, m = w ? 0 : d, this.render(m, e, 0 === d), e || this._gc || this.vars.onRepeat && (this._cycle = S, this._locked = !1, this._callback("onRepeat")), m !== this._time)return;
                if (P && (this._cycle = b, this._locked = !0, m = w ? d + 1e-4 : -1e-4, this.render(m, !0, !1)), this._locked = !1, this._paused && !x)return;
                this._time = R, this._totalTime = O, this._cycle = S, this._rawPrevTime = k
            }
            if (this._time !== m && this._first || i || _ || f) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0), 0 === g && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")), (c = this._time) >= m)for (s = this._first; s && (l = s._next, c === this._time && (!this._paused || x));)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (f === s && this.pause(), s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = l; else for (s = this._last; s && (l = s._prev, c === this._time && (!this._paused || x));) {
                    if (s._active || s._startTime <= m && !s._paused && !s._gc) {
                        if (f === s) {
                            for (f = s._prev; f && f.endTime() > this._time;)f.render(f._reversed ? f.totalDuration() - (t - f._startTime) * f._timeScale : (t - f._startTime) * f._timeScale, e, i), f = f._prev;
                            f = null, this.pause()
                        }
                        s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)
                    }
                    s = l
                }
                this._onUpdate && (e || (a.length && o(), this._callback("onUpdate"))), h && (this._locked || this._gc || (v === this._startTime || y !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (n && (a.length && o(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this._callback(h)))
            } else g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
        }, _.getActive = function (t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var s, r, n = [], a = this.getChildren(t, e, i), o = 0, l = a.length;
            for (s = 0; l > s; s++)(r = a[s]).isActive() && (n[o++] = r);
            return n
        }, _.getLabelAfter = function (t) {
            t || 0 !== t && (t = this._time);
            var e, i = this.getLabelsArray(), s = i.length;
            for (e = 0; s > e; e++)if (i[e].time > t)return i[e].name;
            return null
        }, _.getLabelBefore = function (t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1;)if (e[i].time < t)return e[i].name;
            return null
        }, _.getLabelsArray = function () {
            var t, e = [], i = 0;
            for (t in this._labels)e[i++] = {time: this._labels[t], name: t};
            return e.sort(function (t, e) {
                return t.time - e.time
            }), e
        }, _.invalidate = function () {
            return this._locked = !1, t.prototype.invalidate.call(this)
        }, _.progress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }, _.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }, _.totalDuration = function (e) {
            return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, _.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, _.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, _.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, _.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, _.currentLabel = function (t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
        }, s
    }, !0), function () {
        var t = 180 / Math.PI, e = [], i = [], s = [], r = {}, n = _gsScope._gsDefine.globals,
            a = function (t, e, i, s) {
                i === s && (i = s - (s - e) / 1e6), t === e && (e = t + (i - t) / 1e6), this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t
            }, o = function (t, e, i, s) {
                var r = {a: t}, n = {}, a = {}, o = {c: s}, l = (t + e) / 2, h = (e + i) / 2, _ = (i + s) / 2,
                    u = (l + h) / 2, f = (h + _) / 2, c = (f - u) / 8;
                return r.b = l + (t - l) / 4, n.b = u + c, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (u + f) / 2, a.b = f - c, o.b = _ + (s - _) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o]
            }, l = function (t, r, n, a, l) {
                var h, _, u, f, c, p, d, m, g, v, y, T, x, b = t.length - 1, w = 0, P = t[0].a;
                for (h = 0; b > h; h++)c = t[w], _ = c.a, u = c.d, f = t[w + 1].d, l ? (y = e[h], T = i[h], x = (T + y) * r * .25 / (a ? .5 : s[h] || .5), p = u - (u - _) * (a ? .5 * r : 0 !== y ? x / y : 0), d = u + (f - u) * (a ? .5 * r : 0 !== T ? x / T : 0), m = u - (p + ((d - p) * (3 * y / (y + T) + .5) / 4 || 0))) : (p = u - (u - _) * r * .5, d = u + (f - u) * r * .5, m = u - (p + d) / 2), p += m, d += m, c.c = g = p, c.b = 0 !== h ? P : P = c.a + .6 * (c.c - c.a), c.da = u - _, c.ca = g - _, c.ba = P - _, n ? (v = o(_, P, g, u), t.splice(w, 1, v[0], v[1], v[2], v[3]), w += 4) : w++, P = d;
                (c = t[w]).b = P, c.c = P + .4 * (c.d - P), c.da = c.d - c.a, c.ca = c.c - c.a, c.ba = P - c.a, n && (v = o(c.a, P, c.c, c.d), t.splice(w, 1, v[0], v[1], v[2], v[3]))
            }, h = function (t, s, r, n) {
                var o, l, h, _, u, f, c = [];
                if (n)for (t = [n].concat(t), l = t.length; --l > -1;)"string" == typeof(f = t[l][s]) && "=" === f.charAt(1) && (t[l][s] = n[s] + Number(f.charAt(0) + f.substr(2)));
                if (0 > (o = t.length - 2))return c[0] = new a(t[0][s], 0, 0, t[-1 > o ? 0 : 1][s]), c;
                for (l = 0; o > l; l++)h = t[l][s], _ = t[l + 1][s], c[l] = new a(h, 0, 0, _), r && (u = t[l + 2][s], e[l] = (e[l] || 0) + (_ - h) * (_ - h), i[l] = (i[l] || 0) + (u - _) * (u - _));
                return c[l] = new a(t[l][s], 0, 0, t[l + 1][s]), c
            }, _ = function (t, n, a, o, _, u) {
                var f, c, p, d, m, g, v, y, T = {}, x = [], b = u || t[0];
                _ = "string" == typeof _ ? "," + _ + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == n && (n = 1);
                for (c in t[0])x.push(c);
                if (t.length > 1) {
                    for (y = t[t.length - 1], v = !0, f = x.length; --f > -1;)if (c = x[f], Math.abs(b[c] - y[c]) > .05) {
                        v = !1;
                        break
                    }
                    v && (t = t.concat(), u && t.unshift(u), t.push(t[1]), u = t[t.length - 3])
                }
                for (e.length = i.length = s.length = 0, f = x.length; --f > -1;)c = x[f], r[c] = -1 !== _.indexOf("," + c + ","), T[c] = h(t, c, r[c], u);
                for (f = e.length; --f > -1;)e[f] = Math.sqrt(e[f]), i[f] = Math.sqrt(i[f]);
                if (!o) {
                    for (f = x.length; --f > -1;)if (r[c])for (p = T[x[f]], g = p.length - 1, d = 0; g > d; d++)m = p[d + 1].da / i[d] + p[d].da / e[d] || 0, s[d] = (s[d] || 0) + m * m;
                    for (f = s.length; --f > -1;)s[f] = Math.sqrt(s[f])
                }
                for (f = x.length, d = a ? 4 : 1; --f > -1;)c = x[f], p = T[c], l(p, n, a, o, r[c]), v && (p.splice(0, d), p.splice(p.length - d, d));
                return T
            }, u = function (t, e, i) {
                var s, r, n, o, l, h, _, u, f, c, p, d = {}, m = "cubic" === (e = e || "soft") ? 3 : 2, g = "soft" === e,
                    v = [];
                if (g && i && (t = [i].concat(t)), null == t || t.length < m + 1)throw"invalid Bezier data";
                for (f in t[0])v.push(f);
                for (h = v.length; --h > -1;) {
                    for (d[f = v[h]] = l = [], c = 0, u = t.length, _ = 0; u > _; _++)s = null == i ? t[_][f] : "string" == typeof(p = t[_][f]) && "=" === p.charAt(1) ? i[f] + Number(p.charAt(0) + p.substr(2)) : Number(p), g && _ > 1 && u - 1 > _ && (l[c++] = (s + l[c - 2]) / 2), l[c++] = s;
                    for (u = c - m + 1, c = 0, _ = 0; u > _; _ += m)s = l[_], r = l[_ + 1], n = l[_ + 2], o = 2 === m ? 0 : l[_ + 3], l[c++] = p = 3 === m ? new a(s, r, n, o) : new a(s, (2 * r + s) / 3, (2 * r + n) / 3, n);
                    l.length = c
                }
                return d
            }, f = function (t, e, i) {
                for (var s, r, n, a, o, l, h, _, u, f, c, p = 1 / i, d = t.length; --d > -1;)for (f = t[d], n = f.a, a = f.d - n, o = f.c - n, l = f.b - n, s = r = 0, _ = 1; i >= _; _++)h = p * _, u = 1 - h, s = r - (r = (h * h * a + 3 * u * (h * o + u * l)) * h), c = d * i + _ - 1, e[c] = (e[c] || 0) + s * s
            }, c = function (t, e) {
                var i, s, r, n, a = [], o = [], l = 0, h = 0, _ = (e = e >> 0 || 6) - 1, u = [], c = [];
                for (i in t)f(t[i], a, e);
                for (r = a.length, s = 0; r > s; s++)l += Math.sqrt(a[s]), n = s % e, c[n] = l, n === _ && (h += l, n = s / e >> 0, u[n] = c, o[n] = h, l = 0, c = []);
                return {length: h, lengths: o, segments: u}
            }, p = _gsScope._gsDefine.plugin({
                propName: "bezier",
                priority: -1,
                version: "1.3.7",
                API: 2,
                global: !0,
                init: function (t, e, i) {
                    this._target = t, e instanceof Array && (e = {values: e}), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                    var s, r, n, a, o, l = e.values || [], h = {}, f = l[0], p = e.autoRotate || i.vars.orientToBezier;
                    this._autoRotate = p ? p instanceof Array ? p : [["x", "y", "rotation", !0 === p ? 0 : Number(p) || 0]] : null;
                    for (s in f)this._props.push(s);
                    for (n = this._props.length; --n > -1;)s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], h[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || h[s] !== l[0][s] && (o = h);
                    if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? _(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : u(l, e.type, h), this._segCount = this._beziers[s].length, this._timeRes) {
                        var d = c(this._beziers, this._timeRes);
                        this._length = d.length, this._lengths = d.lengths, this._segments = d.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                    }
                    if (p = this._autoRotate)for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), n = p.length; --n > -1;) {
                        for (a = 0; 3 > a; a++)s = p[n][a], this._func[s] = "function" == typeof t[s] && t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)];
                        s = p[n][2], this._initialRotations[n] = (this._func[s] ? this._func[s].call(this._target) : this._target[s]) || 0, this._overwriteProps.push(s)
                    }
                    return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                },
                set: function (e) {
                    var i, s, r, n, a, o, l, h, _, u, f = this._segCount, c = this._func, p = this._target,
                        d = e !== this._startRatio;
                    if (this._timeRes) {
                        if (_ = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && f - 1 > r) {
                            for (h = f - 1; h > r && (this._l2 = _[++r]) <= e;);
                            this._l1 = _[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
                        } else if (e < this._l1 && r > 0) {
                            for (; r > 0 && (this._l1 = _[--r]) >= e;);
                            0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = _[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                        }
                        if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < u.length - 1) {
                            for (h = u.length - 1; h > r && (this._s2 = u[++r]) <= e;);
                            this._s1 = u[r - 1], this._si = r
                        } else if (e < this._s1 && r > 0) {
                            for (; r > 0 && (this._s1 = u[--r]) >= e;);
                            0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
                        }
                        o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                    } else i = 0 > e ? 0 : e >= 1 ? f - 1 : f * e >> 0, o = (e - i * (1 / f)) * f;
                    for (s = 1 - o, r = this._props.length; --r > -1;)n = this._props[r], a = this._beziers[n][i], l = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a, this._mod[n] && (l = this._mod[n](l, p)), c[n] ? p[n](l) : p[n] = l;
                    if (this._autoRotate) {
                        var m, g, v, y, T, x, b, w = this._autoRotate;
                        for (r = w.length; --r > -1;)n = w[r][2], x = w[r][3] || 0, b = !0 === w[r][4] ? 1 : t, a = this._beziers[w[r][0]], m = this._beziers[w[r][1]], a && m && (a = a[i], m = m[i], g = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, g += (y - g) * o, y += (a.c + (a.d - a.c) * o - y) * o, v = m.a + (m.b - m.a) * o, T = m.b + (m.c - m.b) * o, v += (T - v) * o, T += (m.c + (m.d - m.c) * o - T) * o, l = d ? Math.atan2(T - v, y - g) * b + x : this._initialRotations[r], this._mod[n] && (l = this._mod[n](l, p)), c[n] ? p[n](l) : p[n] = l)
                    }
                }
            }), d = p.prototype;
        p.bezierThrough = _, p.cubicToQuadratic = o, p._autoCSS = !0, p.quadraticToCubic = function (t, e, i) {
            return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
        }, p._cssRegister = function () {
            var t = n.CSSPlugin;
            if (t) {
                var e = t._internals, i = e._parseToProxy, s = e._setPluginRatio, r = e.CSSPropTween;
                e._registerComplexSpecialProp("bezier", {
                    parser: function (t, e, n, a, o, l) {
                        e instanceof Array && (e = {values: e}), l = new p;
                        var h, _, u, f = e.values, c = f.length - 1, d = [], m = {};
                        if (0 > c)return o;
                        for (h = 0; c >= h; h++)u = i(t, f[h], a, o, l, c !== h), d[h] = u.end;
                        for (_ in e)m[_] = e[_];
                        return m.values = d, o = new r(t, "bezier", 0, 0, u.pt, 2), o.data = u, o.plugin = l, o.setRatio = s, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (h = !0 === m.autoRotate ? 0 : Number(m.autoRotate), m.autoRotate = null != u.end.left ? [["left", "top", "rotation", h, !1]] : null != u.end.x && [["x", "y", "rotation", h, !1]]), m.autoRotate && (a._transform || a._enableTransforms(!1), u.autoRotate = a._target._gsTransform, u.proxy.rotation = u.autoRotate.rotation || 0, a._overwriteProps.push("rotation")), l._onInitTween(u.proxy, m, a._tween), o
                    }
                })
            }
        }, d._mod = function (t) {
            for (var e, i = this._overwriteProps, s = i.length; --s > -1;)(e = t[i[s]]) && "function" == typeof e && (this._mod[i[s]] = e)
        }, d._kill = function (t) {
            var e, i, s = this._props;
            for (e in this._beziers)if (e in t)for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1;)s[i] === e && s.splice(i, 1);
            if (s = this._autoRotate)for (i = s.length; --i > -1;)t[s[i][2]] && s.splice(i, 1);
            return this._super._kill.call(this, t)
        }
    }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
        var i, s, r, n, a = function () {
            t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
        }, o = _gsScope._gsDefine.globals, l = {}, h = a.prototype = new t("css");
        h.constructor = a, a.version = "1.19.1", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", a.defaultSmoothOrigin = !0, h = "px", a.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: ""
        };
        var _, u, f, c, p, d, m, g, v = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
            y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            T = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, x = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            b = /(?:\d|\-|\+|=|#|\.)*/g, w = /opacity *= *([^)]*)/i, P = /opacity:([^;]*)/i,
            O = /alpha\(opacity *=.+?\)/i, S = /^(rgb|hsl)/, k = /([A-Z])/g, R = /-([a-z])/gi,
            A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, C = function (t, e) {
                return e.toUpperCase()
            }, M = /(?:Left|Right|Width)/i, D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            F = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, z = /,(?=[^\)]*(?:\(|$))/gi, I = /[\s,\(]/i,
            X = Math.PI / 180, N = 180 / Math.PI, L = {}, E = {style: {}}, B = _gsScope.document || {
                    createElement: function () {
                        return E
                    }
                }, Y = function (t, e) {
                return B.createElementNS ? B.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : B.createElement(t)
            }, j = Y("div"), V = Y("img"), U = a._internals = {_specialProps: l},
            q = (_gsScope.navigator || {}).userAgent || "", W = function () {
                var t = q.indexOf("Android"), e = Y("a");
                return f = -1 !== q.indexOf("Safari") && -1 === q.indexOf("Chrome") && (-1 === t || parseFloat(q.substr(t + 8, 2)) > 3), p = f && parseFloat(q.substr(q.indexOf("Version/") + 8, 2)) < 6, c = -1 !== q.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(q) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(q)) && (d = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
            }(), G = function (t) {
                return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            }, Z = function (t) {
                _gsScope.console && console.log(t)
            }, $ = "", Q = "", H = function (t, e) {
                var i, s, r = (e = e || j).style;
                if (void 0 !== r[t])return t;
                for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5; --s > -1 && void 0 === r[i[s] + t];);
                return s >= 0 ? (Q = 3 === s ? "ms" : i[s], $ = "-" + Q.toLowerCase() + "-", Q + t) : null
            }, K = B.defaultView ? B.defaultView.getComputedStyle : function () {
            }, J = a.getStyle = function (t, e, i, s, r) {
                var n;
                return W || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || K(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(k, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : G(t)
            }, tt = U.convertToPixels = function (t, i, s, r, n) {
                if ("px" === r || !r)return s;
                if ("auto" === r || !s)return 0;
                var o, l, h, _ = M.test(i), u = t, f = j.style, c = 0 > s, p = 1 === s;
                if (c && (s = -s), p && (s *= 100), "%" === r && -1 !== i.indexOf("border")) o = s / 100 * (_ ? t.clientWidth : t.clientHeight); else {
                    if (f.cssText = "border:0 solid red;position:" + J(t, "position") + ";line-height:0;", "%" !== r && u.appendChild && "v" !== r.charAt(0) && "rem" !== r) f[_ ? "borderLeftWidth" : "borderTopWidth"] = s + r; else {
                        if (u = t.parentNode || B.body, l = u._gsCache, h = e.ticker.frame, l && _ && l.time === h)return l.width * s / 100;
                        f[_ ? "width" : "height"] = s + r
                    }
                    u.appendChild(j), o = parseFloat(j[_ ? "offsetWidth" : "offsetHeight"]), u.removeChild(j), _ && "%" === r && !1 !== a.cacheWidths && (l = u._gsCache = u._gsCache || {}, l.time = h, l.width = o / s * 100), 0 !== o || n || (o = tt(t, i, s, r, !0))
                }
                return p && (o /= 100), c ? -o : o
            }, et = U.calculateOffset = function (t, e, i) {
                if ("absolute" !== J(t, "position", i))return 0;
                var s = "left" === e ? "Left" : "Top", r = J(t, "margin" + s, i);
                return t["offset" + s] - (tt(t, e, parseFloat(r), r.replace(b, "")) || 0)
            }, it = function (t, e) {
                var i, s, r, n = {};
                if (e = e || K(t, null))if (i = e.length)for (; --i > -1;)(-1 === (r = e[i]).indexOf("-transform") || At === r) && (n[r.replace(R, C)] = e.getPropertyValue(r)); else for (i in e)(-1 === i.indexOf("Transform") || Rt === i) && (n[i] = e[i]); else if (e = t.currentStyle || t.style)for (i in e)"string" == typeof i && void 0 === n[i] && (n[i.replace(R, C)] = e[i]);
                return W || (n.opacity = G(t)), s = Vt(t, e, !1), n.rotation = s.rotation, n.skewX = s.skewX, n.scaleX = s.scaleX, n.scaleY = s.scaleY, n.x = s.x, n.y = s.y, Mt && (n.z = s.z, n.rotationX = s.rotationX, n.rotationY = s.rotationY, n.scaleZ = s.scaleZ), n.filters && delete n.filters, n
            }, st = function (t, e, i, s, r) {
                var n, a, o, l = {}, h = t.style;
                for (a in i)"cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (l[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(x, "") ? n : 0 : et(t, a), void 0 !== h[a] && (o = new vt(h, a, h[a], o)));
                if (s)for (a in s)"className" !== a && (l[a] = s[a]);
                return {difs: l, firstMPT: o}
            }, rt = {width: ["Left", "Right"], height: ["Top", "Bottom"]},
            nt = ["marginLeft", "marginRight", "marginTop", "marginBottom"], at = function (t, e, i) {
                if ("svg" === (t.nodeName + "").toLowerCase())return (i || K(t))[e] || 0;
                if (t.getCTM && Bt(t))return t.getBBox()[e] || 0;
                var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight), r = rt[e], n = r.length;
                for (i = i || K(t, null); --n > -1;)s -= parseFloat(J(t, "padding" + r[n], i, !0)) || 0, s -= parseFloat(J(t, "border" + r[n] + "Width", i, !0)) || 0;
                return s
            }, ot = function (t, e) {
                if ("contain" === t || "auto" === t || "auto auto" === t)return t + " ";
                (null == t || "" === t) && (t = "0 0");
                var i, s = t.split(" "), r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : s[0],
                    n = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : s[1];
                if (s.length > 3 && !e) {
                    for (s = t.split(", ").join(",").split(","), t = [], i = 0; i < s.length; i++)t.push(ot(s[i]));
                    return t.join(",")
                }
                return null == n ? n = "center" === r ? "50%" : "0" : "center" === n && (n = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t = r + " " + n + (s.length > 2 ? " " + s[2] : ""), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== n.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === n.charAt(1), e.ox = parseFloat(r.replace(x, "")), e.oy = parseFloat(n.replace(x, "")), e.v = t), e || t
            }, lt = function (t, e) {
                return "function" == typeof t && (t = t(g, m)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
            }, ht = function (t, e) {
                return "function" == typeof t && (t = t(g, m)), null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
            }, _t = function (t, e, i, s) {
                var r, n, a, o, l;
                return "function" == typeof t && (t = t(g, m)), null == t ? o = e : "number" == typeof t ? o = t : (r = 360, n = t.split("_"), l = "=" === t.charAt(1), a = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(n[0].substr(2)) : parseFloat(n[0])) * (-1 === t.indexOf("rad") ? 1 : N) - (l ? 0 : e), n.length && (s && (s[i] = e + a), -1 !== t.indexOf("short") && (a %= r) != a % (r / 2) && (a = 0 > a ? a + r : a - r), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (a / r | 0) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (a / r | 0) * r)), o = e + a), 1e-6 > o && o > -1e-6 && (o = 0), o
            }, ut = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            }, ft = function (t, e, i) {
                return 255 * (1 > 6 * (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t) ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
            }, ct = a.parseColor = function (t, e) {
                var i, s, r, n, a, o, l, h, _, u, f;
                if (t)if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t]; else {
                    if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ut[t]) i = ut[t]; else if ("#" === t.charAt(0)) 4 === t.length && (s = t.charAt(1), r = t.charAt(2), n = t.charAt(3), t = "#" + s + s + r + r + n + n), t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & 255, 255 & t]; else if ("hsl" === t.substr(0, 3))if (i = f = t.match(v), e) {
                        if (-1 !== t.indexOf("="))return t.match(y)
                    } else a = Number(i[0]) % 360 / 360, o = Number(i[1]) / 100, l = Number(i[2]) / 100, r = .5 >= l ? l * (o + 1) : l + o - l * o, s = 2 * l - r, i.length > 3 && (i[3] = Number(t[3])), i[0] = ft(a + 1 / 3, s, r), i[1] = ft(a, s, r), i[2] = ft(a - 1 / 3, s, r); else i = t.match(v) || ut.transparent;
                    i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                } else i = ut.black;
                return e && !f && (s = i[0] / 255, r = i[1] / 255, n = i[2] / 255, h = Math.max(s, r, n), _ = Math.min(s, r, n), l = (h + _) / 2, h === _ ? a = o = 0 : (u = h - _, o = l > .5 ? u / (2 - h - _) : u / (h + _), a = h === s ? (r - n) / u + (n > r ? 6 : 0) : h === r ? (n - s) / u + 2 : (s - r) / u + 4, a *= 60), i[0] = a + .5 | 0, i[1] = 100 * o + .5 | 0, i[2] = 100 * l + .5 | 0), i
            }, pt = function (t, e) {
                var i, s, r, n = t.match(dt) || [], a = 0, o = n.length ? "" : t;
                for (i = 0; i < n.length; i++)s = n[i], r = t.substr(a, t.indexOf(s, a) - a), a += r.length + s.length, 3 === (s = ct(s, e)).length && s.push(1), o += r + (e ? "hsla(" + s[0] + "," + s[1] + "%," + s[2] + "%," + s[3] : "rgba(" + s.join(",")) + ")";
                return o + t.substr(a)
            }, dt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (h in ut)dt += "|" + h + "\\b";
        dt = new RegExp(dt + ")", "gi"), a.colorStringFilter = function (t) {
            var e, i = t[0] + t[1];
            dt.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = pt(t[0], e), t[1] = pt(t[1], e)), dt.lastIndex = 0
        }, e.defaultStringFilter || (e.defaultStringFilter = a.colorStringFilter);
        var mt = function (t, e, i, s) {
            if (null == t)return function (t) {
                return t
            };
            var r, n = e ? (t.match(dt) || [""])[0] : "", a = t.split(n).join("").match(T) || [],
                o = t.substr(0, t.indexOf(a[0])), l = ")" === t.charAt(t.length - 1) ? ")" : "",
                h = -1 !== t.indexOf(" ") ? " " : ",", _ = a.length, u = _ > 0 ? a[0].replace(v, "") : "";
            return _ ? r = e ? function (t) {
                var e, f, c, p;
                if ("number" == typeof t) t += u; else if (s && z.test(t)) {
                    for (p = t.replace(z, "|").split("|"), c = 0; c < p.length; c++)p[c] = r(p[c]);
                    return p.join(",")
                }
                if (e = (t.match(dt) || [n])[0], f = t.split(e).join("").match(T) || [], c = f.length, _ > c--)for (; ++c < _;)f[c] = i ? f[(c - 1) / 2 | 0] : a[c];
                return o + f.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
            } : function (t) {
                var e, n, f;
                if ("number" == typeof t) t += u; else if (s && z.test(t)) {
                    for (n = t.replace(z, "|").split("|"), f = 0; f < n.length; f++)n[f] = r(n[f]);
                    return n.join(",")
                }
                if (e = t.match(T) || [], f = e.length, _ > f--)for (; ++f < _;)e[f] = i ? e[(f - 1) / 2 | 0] : a[f];
                return o + e.join(h) + l
            } : function (t) {
                return t
            }
        }, gt = function (t) {
            return t = t.split(","), function (e, i, s, r, n, a, o) {
                var l, h = (i + "").split(" ");
                for (o = {}, l = 0; 4 > l; l++)o[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                return r.parse(e, o, n, a)
            }
        }, vt = (U._setPluginRatio = function (t) {
            this.plugin.setRatio(t);
            for (var e, i, s, r, n, a = this.data, o = a.proxy, l = a.firstMPT; l;)e = o[l.v], l.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), l.t[l.p] = e, l = l._next;
            if (a.autoRotate && (a.autoRotate.rotation = a.mod ? a.mod(o.rotation, this.t) : o.rotation), 1 === t || 0 === t)for (l = a.firstMPT, n = 1 === t ? "e" : "b"; l;) {
                if ((i = l.t).type) {
                    if (1 === i.type) {
                        for (r = i.xs0 + i.s + i.xs1, s = 1; s < i.l; s++)r += i["xn" + s] + i["xs" + (s + 1)];
                        i[n] = r
                    }
                } else i[n] = i.s + i.xs0;
                l = l._next
            }
        }, function (t, e, i, s, r) {
            this.t = t, this.p = e, this.v = i, this.r = r, s && (s._prev = this, this._next = s)
        }), yt = (U._parseToProxy = function (t, e, i, s, r, n) {
            var a, o, l, h, _, u = s, f = {}, c = {}, p = i._transform, d = L;
            for (i._transform = null, L = e, s = _ = i.parse(t, e, s, r), L = d, n && (i._transform = p, u && (u._prev = null, u._prev && (u._prev._next = null))); s && s !== u;) {
                if (s.type <= 1 && (o = s.p, c[o] = s.s + s.c, f[o] = s.s, n || (h = new vt(s, "s", o, h, s.r), s.c = 0), 1 === s.type))for (a = s.l; --a > 0;)l = "xn" + a, o = s.p + "_" + l, c[o] = s.data[l], f[o] = s[l], n || (h = new vt(s, l, o, h, s.rxp[l]));
                s = s._next
            }
            return {proxy: f, end: c, firstMPT: h, pt: _}
        }, U.CSSPropTween = function (t, e, s, r, a, o, l, h, _, u, f) {
            this.t = t, this.p = e, this.s = s, this.c = r, this.n = l || e, t instanceof yt || n.push(this.n), this.r = h, this.type = o || 0, _ && (this.pr = _, i = !0), this.b = void 0 === u ? s : u, this.e = void 0 === f ? s + r : f, a && (this._next = a, a._prev = this)
        }), Tt = function (t, e, i, s, r, n) {
            var a = new yt(t, e, i, s - i, r, -1, n);
            return a.b = i, a.e = a.xs0 = s, a
        }, xt = a.parseComplex = function (t, e, i, s, r, n, o, l, h, u) {
            i = i || n || "", "function" == typeof s && (s = s(g, m)), o = new yt(t, e, 0, 0, o, u ? 2 : 1, null, !1, l, i, s), s += "", r && dt.test(s + i) && (s = [i, s], a.colorStringFilter(s), i = s[0], s = s[1]);
            var f, c, p, d, T, x, b, w, P, O, S, k, R, A = i.split(", ").join(",").split(" "),
                C = s.split(", ").join(",").split(" "), M = A.length, D = !1 !== _;
            for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (A = A.join(" ").replace(z, ", ").split(" "), C = C.join(" ").replace(z, ", ").split(" "), M = A.length), M !== C.length && (A = (n || "").split(" "), M = A.length), o.plugin = h, o.setRatio = u, dt.lastIndex = 0, f = 0; M > f; f++)if (d = A[f], T = C[f], (w = parseFloat(d)) || 0 === w) o.appendXtra("", w, lt(T, w), T.replace(y, ""), D && -1 !== T.indexOf("px"), !0); else if (r && dt.test(d)) k = T.indexOf(")") + 1, k = ")" + (k ? T.substr(k) : ""), R = -1 !== T.indexOf("hsl") && W, d = ct(d, R), T = ct(T, R), (P = d.length + T.length > 6) && !W && 0 === T[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(C[f]).join("transparent")) : (W || (P = !1), R ? o.appendXtra(P ? "hsla(" : "hsl(", d[0], lt(T[0], d[0]), ",", !1, !0).appendXtra("", d[1], lt(T[1], d[1]), "%,", !1).appendXtra("", d[2], lt(T[2], d[2]), P ? "%," : "%" + k, !1) : o.appendXtra(P ? "rgba(" : "rgb(", d[0], T[0] - d[0], ",", !0, !0).appendXtra("", d[1], T[1] - d[1], ",", !0).appendXtra("", d[2], T[2] - d[2], P ? "," : k, !0), P && (d = d.length < 4 ? 1 : d[3], o.appendXtra("", d, (T.length < 4 ? 1 : T[3]) - d, k, !1))), dt.lastIndex = 0; else if (x = d.match(v)) {
                if (!(b = T.match(y)) || b.length !== x.length)return o;
                for (p = 0, c = 0; c < x.length; c++)S = x[c], O = d.indexOf(S, p), o.appendXtra(d.substr(p, O - p), Number(S), lt(b[c], S), "", D && "px" === d.substr(O + S.length, 2), 0 === c), p = O + S.length;
                o["xs" + o.l] += d.substr(p)
            } else o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + T : T;
            if (-1 !== s.indexOf("=") && o.data) {
                for (k = o.xs0 + o.data.s, f = 1; f < o.l; f++)k += o["xs" + f] + o.data["xn" + f];
                o.e = k + o["xs" + f]
            }
            return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
        }, bt = 9;
        for ((h = yt.prototype).l = h.pr = 0; --bt > 0;)h["xn" + bt] = 0, h["xs" + bt] = "";
        h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function (t, e, i, s, r, n) {
            var a = this, o = a.l;
            return a["xs" + o] += n && (o || a["xs" + o]) ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = s || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = r, a["xn" + o] = e, a.plugin || (a.xfirst = new yt(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {s: e + i}, a.rxp = {}, a.s = e, a.c = i, a.r = r, a)) : (a["xs" + o] += e + (s || ""), a)
        };
        var wt = function (t, e) {
            e = e || {}, this.p = e.prefix ? H(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || mt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
        }, Pt = U._registerComplexSpecialProp = function (t, e, i) {
            "object" != typeof e && (e = {parser: i});
            var s, r = t.split(","), n = e.defaultValue;
            for (i = i || [n], s = 0; s < r.length; s++)e.prefix = 0 === s && e.prefix, e.defaultValue = i[s] || n, new wt(r[s], e)
        }, Ot = U._registerPluginProp = function (t) {
            if (!l[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                Pt(t, {
                    parser: function (t, i, s, r, n, a, h) {
                        var _ = o.com.greensock.plugins[e];
                        return _ ? (_._cssRegister(), l[s].parse(t, i, s, r, n, a, h)) : (Z("Error: " + e + " js file not loaded."), n)
                    }
                })
            }
        };
        (h = wt.prototype).parseComplex = function (t, e, i, s, r, n) {
            var a, o, l, h, _, u, f = this.keyword;
            if (this.multi && (z.test(i) || z.test(e) ? (o = e.replace(z, "|").split("|"), l = i.replace(z, "|").split("|")) : f && (o = [e], l = [i])), l) {
                for (h = l.length > o.length ? l.length : o.length, a = 0; h > a; a++)e = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, f && (_ = e.indexOf(f), u = i.indexOf(f), _ !== u && (-1 === u ? o[a] = o[a].split(f).join("") : -1 === _ && (o[a] += " " + f)));
                e = o.join(", "), i = l.join(", ")
            }
            return xt(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
        }, h.parse = function (t, e, i, s, n, a, o) {
            return this.parseComplex(t.style, this.format(J(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
        }, a.registerSpecialProp = function (t, e, i) {
            Pt(t, {
                parser: function (t, s, r, n, a, o, l) {
                    var h = new yt(t, r, 0, 0, a, 2, r, !1, i);
                    return h.plugin = o, h.setRatio = e(t, s, n._tween, r), h
                }, priority: i
            })
        }, a.useSVGTransformAttr = !0;
        var St,
            kt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
            Rt = H("transform"), At = $ + "transform", Ct = H("transformOrigin"), Mt = null !== H("perspective"),
            Dt = U.Transform = function () {
                this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = !(!1 === a.defaultForce3D || !Mt) && (a.defaultForce3D || "auto")
            }, Ft = _gsScope.SVGElement, zt = function (t, e, i) {
                var s, r = B.createElementNS("http://www.w3.org/2000/svg", t), n = /([a-z])([A-Z])/g;
                for (s in i)r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
                return e.appendChild(r), r
            }, It = B.documentElement || {}, Xt = function () {
                var t, e, i, s = d || /Android/i.test(q) && !_gsScope.chrome;
                return B.createElementNS && !s && (t = zt("svg", It), e = zt("rect", t, {
                    width: 100,
                    height: 50,
                    x: 100
                }), i = e.getBoundingClientRect().width, e.style[Ct] = "50% 50%", e.style[Rt] = "scaleX(0.5)", s = i === e.getBoundingClientRect().width && !(c && Mt), It.removeChild(t)), s
            }(), Nt = function (t, e, i, s, r, n) {
                var o, l, h, _, u, f, c, p, d, m, g, v, y, T, x = t._gsTransform, b = jt(t, !0);
                x && (y = x.xOrigin, T = x.yOrigin), (!s || (o = s.split(" ")).length < 2) && (0 === (c = t.getBBox()).x && 0 === c.y && c.width + c.height === 0 && (c = {
                    x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                    y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                    width: 0,
                    height: 0
                }), e = ot(e).split(" "), o = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * c.width : parseFloat(e[0])) + c.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * c.height : parseFloat(e[1])) + c.y]), i.xOrigin = _ = parseFloat(o[0]), i.yOrigin = u = parseFloat(o[1]), s && b !== Yt && (f = b[0], c = b[1], p = b[2], d = b[3], m = b[4], g = b[5], (v = f * d - c * p) && (l = _ * (d / v) + u * (-p / v) + (p * g - d * m) / v, h = _ * (-c / v) + u * (f / v) - (f * g - c * m) / v, _ = i.xOrigin = o[0] = l, u = i.yOrigin = o[1] = h)), x && (n && (i.xOffset = x.xOffset, i.yOffset = x.yOffset, x = i), r || !1 !== r && !1 !== a.defaultSmoothOrigin ? (l = _ - y, h = u - T, x.xOffset += l * b[0] + h * b[2] - l, x.yOffset += l * b[1] + h * b[3] - h) : x.xOffset = x.yOffset = 0), n || t.setAttribute("data-svg-origin", o.join(" "))
            }, Lt = function (t) {
                var e, i = Y("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                    s = this.parentNode, r = this.nextSibling, n = this.style.cssText;
                if (It.appendChild(i), i.appendChild(this), this.style.display = "block", t)try {
                    e = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Lt
                } catch (t) {
                } else this._originalGetBBox && (e = this._originalGetBBox());
                return r ? s.insertBefore(this, r) : s.appendChild(this), It.removeChild(i), this.style.cssText = n, e
            }, Et = function (t) {
                try {
                    return t.getBBox()
                } catch (e) {
                    return Lt.call(t, !0)
                }
            }, Bt = function (t) {
                return !(!(Ft && t.getCTM && Et(t)) || t.parentNode && !t.ownerSVGElement)
            }, Yt = [1, 0, 0, 1, 0, 0], jt = function (t, e) {
                var i, s, r, n, a, o, l = t._gsTransform || new Dt, h = t.style;
                if (Rt ? s = J(t, At, null, !0) : t.currentStyle && (s = t.currentStyle.filter.match(D), s = s && 4 === s.length ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), (i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s) && Rt && ((o = "none" === K(t).display) || !t.parentNode) && (o && (n = h.display, h.display = "block"), t.parentNode || (a = 1, It.appendChild(t)), s = J(t, At, null, !0), i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s, n ? h.display = n : o && Gt(h, "display"), a && It.removeChild(t)), (l.svg || t.getCTM && Bt(t)) && (i && -1 !== (h[Rt] + "").indexOf("matrix") && (s = h[Rt], i = 0), r = t.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (s = r, i = 0) : -1 !== r.indexOf("translate") && (s = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i)return Yt;
                for (r = (s || "").match(v) || [], bt = r.length; --bt > -1;)n = Number(r[bt]), r[bt] = (a = n - (n |= 0)) ? (1e5 * a + (0 > a ? -.5 : .5) | 0) / 1e5 + n : n;
                return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
            }, Vt = U.getTransform = function (t, i, s, r) {
                if (t._gsTransform && s && !r)return t._gsTransform;
                var n, o, l, h, _, u, f = s ? t._gsTransform || new Dt : new Dt, c = f.scaleX < 0, p = 1e5,
                    d = Mt ? parseFloat(J(t, Ct, i, !1, "0 0 0").split(" ")[2]) || f.zOrigin || 0 : 0,
                    m = parseFloat(a.defaultTransformPerspective) || 0;
                if (f.svg = !(!t.getCTM || !Bt(t)), f.svg && (Nt(t, J(t, Ct, i, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")), St = a.useSVGTransformAttr || Xt), (n = jt(t)) !== Yt) {
                    if (16 === n.length) {
                        var g, v, y, T, x, b = n[0], w = n[1], P = n[2], O = n[3], S = n[4], k = n[5], R = n[6], A = n[7],
                            C = n[8], M = n[9], D = n[10], F = n[12], z = n[13], I = n[14], X = n[11], L = Math.atan2(R, D);
                        f.zOrigin && (I = -f.zOrigin, F = C * I - n[12], z = M * I - n[13], I = D * I + f.zOrigin - n[14]), f.rotationX = L * N, L && (T = Math.cos(-L), x = Math.sin(-L), g = S * T + C * x, v = k * T + M * x, y = R * T + D * x, C = S * -x + C * T, M = k * -x + M * T, D = R * -x + D * T, X = A * -x + X * T, S = g, k = v, R = y), L = Math.atan2(-P, D), f.rotationY = L * N, L && (T = Math.cos(-L), x = Math.sin(-L), g = b * T - C * x, v = w * T - M * x, y = P * T - D * x, M = w * x + M * T, D = P * x + D * T, X = O * x + X * T, b = g, w = v, P = y), L = Math.atan2(w, b), f.rotation = L * N, L && (T = Math.cos(-L), x = Math.sin(-L), b = b * T + S * x, v = w * T + k * x, k = w * -x + k * T, R = P * -x + R * T, w = v), f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && (f.rotationX = f.rotation = 0, f.rotationY = 180 - f.rotationY), f.scaleX = (Math.sqrt(b * b + w * w) * p + .5 | 0) / p, f.scaleY = (Math.sqrt(k * k + M * M) * p + .5 | 0) / p, f.scaleZ = (Math.sqrt(R * R + D * D) * p + .5 | 0) / p, f.rotationX || f.rotationY ? f.skewX = 0 : (f.skewX = S || k ? Math.atan2(S, k) * N + f.rotation : f.skewX || 0, Math.abs(f.skewX) > 90 && Math.abs(f.skewX) < 270 && (c ? (f.scaleX *= -1, f.skewX += f.rotation <= 0 ? 180 : -180, f.rotation += f.rotation <= 0 ? 180 : -180) : (f.scaleY *= -1, f.skewX += f.skewX <= 0 ? 180 : -180))), f.perspective = X ? 1 / (0 > X ? -X : X) : 0, f.x = F, f.y = z, f.z = I, f.svg && (f.x -= f.xOrigin - (f.xOrigin * b - f.yOrigin * S), f.y -= f.yOrigin - (f.yOrigin * w - f.xOrigin * k))
                    } else if (!Mt || r || !n.length || f.x !== n[4] || f.y !== n[5] || !f.rotationX && !f.rotationY) {
                        var E = n.length >= 6, B = E ? n[0] : 1, Y = n[1] || 0, j = n[2] || 0, V = E ? n[3] : 1;
                        f.x = n[4] || 0, f.y = n[5] || 0, l = Math.sqrt(B * B + Y * Y), h = Math.sqrt(V * V + j * j), _ = B || Y ? Math.atan2(Y, B) * N : f.rotation || 0, u = j || V ? Math.atan2(j, V) * N + _ : f.skewX || 0, Math.abs(u) > 90 && Math.abs(u) < 270 && (c ? (l *= -1, u += 0 >= _ ? 180 : -180, _ += 0 >= _ ? 180 : -180) : (h *= -1, u += 0 >= u ? 180 : -180)), f.scaleX = l, f.scaleY = h, f.rotation = _, f.skewX = u, Mt && (f.rotationX = f.rotationY = f.z = 0, f.perspective = m, f.scaleZ = 1), f.svg && (f.x -= f.xOrigin - (f.xOrigin * B + f.yOrigin * j), f.y -= f.yOrigin - (f.xOrigin * Y + f.yOrigin * V))
                    }
                    f.zOrigin = d;
                    for (o in f)f[o] < 2e-5 && f[o] > -2e-5 && (f[o] = 0)
                }
                return s && (t._gsTransform = f, f.svg && (St && t.style[Rt] ? e.delayedCall(.001, function () {
                    Gt(t.style, Rt)
                }) : !St && t.getAttribute("transform") && e.delayedCall(.001, function () {
                        t.removeAttribute("transform")
                    }))), f
            }, Ut = function (t) {
                var e, i, s = this.data, r = -s.rotation * X, n = r + s.skewX * X, a = 1e5,
                    o = (Math.cos(r) * s.scaleX * a | 0) / a, l = (Math.sin(r) * s.scaleX * a | 0) / a,
                    h = (Math.sin(n) * -s.scaleY * a | 0) / a, _ = (Math.cos(n) * s.scaleY * a | 0) / a, u = this.t.style,
                    f = this.t.currentStyle;
                if (f) {
                    i = l, l = -h, h = -i, e = f.filter, u.filter = "";
                    var c, p, m = this.t.offsetWidth, g = this.t.offsetHeight, v = "absolute" !== f.position,
                        y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + _,
                        T = s.x + m * s.xPercent / 100, x = s.y + g * s.yPercent / 100;
                    if (null != s.ox && (c = (s.oxp ? m * s.ox * .01 : s.ox) - m / 2, p = (s.oyp ? g * s.oy * .01 : s.oy) - g / 2, T += c - (c * o + p * l), x += p - (c * h + p * _)), v ? (c = m / 2, p = g / 2, y += ", Dx=" + (c - (c * o + p * l) + T) + ", Dy=" + (p - (c * h + p * _) + x) + ")") : y += ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? u.filter = e.replace(F, y) : u.filter = y + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === _ && (v && -1 === y.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && u.removeAttribute("filter")), !v) {
                        var P, O, S, k = 8 > d ? 1 : -1;
                        for (c = s.ieOffsetX || 0, p = s.ieOffsetY || 0, s.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + T), s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > h ? -h : h) * m)) / 2 + x), bt = 0; 4 > bt; bt++)O = nt[bt], P = f[O], i = -1 !== P.indexOf("px") ? parseFloat(P) : tt(this.t, O, parseFloat(P), P.replace(b, "")) || 0, S = i !== s[O] ? 2 > bt ? -s.ieOffsetX : -s.ieOffsetY : 2 > bt ? c - s.ieOffsetX : p - s.ieOffsetY, u[O] = (s[O] = Math.round(i - S * (0 === bt || 2 === bt ? 1 : k))) + "px"
                    }
                }
            }, qt = U.set3DTransformRatio = U.setTransformRatio = function (t) {
                var e, i, s, r, n, a, o, l, h, _, u, f, p, d, m, g, v, y, T, x, b, w, P, O = this.data, S = this.t.style,
                    k = O.rotation, R = O.rotationX, A = O.rotationY, C = O.scaleX, M = O.scaleY, D = O.scaleZ, F = O.x,
                    z = O.y, I = O.z, N = O.svg, L = O.perspective, E = O.force3D, B = O.skewY, Y = O.skewX;
                if (B && (Y += B, k += B), !((1 !== t && 0 !== t || "auto" !== E || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && E || I || L || A || R || 1 !== D) || St && N || !Mt) k || Y || N ? (k *= X, w = Y * X, P = 1e5, i = Math.cos(k) * C, n = Math.sin(k) * C, s = Math.sin(k - w) * -M, a = Math.cos(k - w) * M, w && "simple" === O.skewType && (e = Math.tan(w - B * X), e = Math.sqrt(1 + e * e), s *= e, a *= e, B && (e = Math.tan(B * X), e = Math.sqrt(1 + e * e), i *= e, n *= e)), N && (F += O.xOrigin - (O.xOrigin * i + O.yOrigin * s) + O.xOffset, z += O.yOrigin - (O.xOrigin * n + O.yOrigin * a) + O.yOffset, St && (O.xPercent || O.yPercent) && (m = this.t.getBBox(), F += .01 * O.xPercent * m.width, z += .01 * O.yPercent * m.height), (m = 1e-6) > F && F > -m && (F = 0), m > z && z > -m && (z = 0)), T = (i * P | 0) / P + "," + (n * P | 0) / P + "," + (s * P | 0) / P + "," + (a * P | 0) / P + "," + F + "," + z + ")", N && St ? this.t.setAttribute("transform", "matrix(" + T) : S[Rt] = (O.xPercent || O.yPercent ? "translate(" + O.xPercent + "%," + O.yPercent + "%) matrix(" : "matrix(") + T) : S[Rt] = (O.xPercent || O.yPercent ? "translate(" + O.xPercent + "%," + O.yPercent + "%) matrix(" : "matrix(") + C + ",0,0," + M + "," + F + "," + z + ")"; else {
                    if (c && ((m = 1e-4) > C && C > -m && (C = D = 2e-5), m > M && M > -m && (M = D = 2e-5), !L || O.z || O.rotationX || O.rotationY || (L = 0)), k || Y) k *= X, g = i = Math.cos(k), v = n = Math.sin(k), Y && (k -= Y * X, g = Math.cos(k), v = Math.sin(k), "simple" === O.skewType && (e = Math.tan((Y - B) * X), e = Math.sqrt(1 + e * e), g *= e, v *= e, O.skewY && (e = Math.tan(B * X), e = Math.sqrt(1 + e * e), i *= e, n *= e))), s = -v, a = g; else {
                        if (!(A || R || 1 !== D || L || N))return void(S[Rt] = (O.xPercent || O.yPercent ? "translate(" + O.xPercent + "%," + O.yPercent + "%) translate3d(" : "translate3d(") + F + "px," + z + "px," + I + "px)" + (1 !== C || 1 !== M ? " scale(" + C + "," + M + ")" : ""));
                        i = a = 1, s = n = 0
                    }
                    _ = 1, r = o = l = h = u = f = 0, p = L ? -1 / L : 0, d = O.zOrigin, m = 1e-6, x = ",", b = "0", (k = A * X) && (g = Math.cos(k), v = Math.sin(k), l = -v, u = p * -v, r = i * v, o = n * v, _ = g, p *= g, i *= g, n *= g), (k = R * X) && (g = Math.cos(k), v = Math.sin(k), e = s * g + r * v, y = a * g + o * v, h = _ * v, f = p * v, r = s * -v + r * g, o = a * -v + o * g, _ *= g, p *= g, s = e, a = y), 1 !== D && (r *= D, o *= D, _ *= D, p *= D), 1 !== M && (s *= M, a *= M, h *= M, f *= M), 1 !== C && (i *= C, n *= C, l *= C, u *= C), (d || N) && (d && (F += r * -d, z += o * -d, I += _ * -d + d), N && (F += O.xOrigin - (O.xOrigin * i + O.yOrigin * s) + O.xOffset, z += O.yOrigin - (O.xOrigin * n + O.yOrigin * a) + O.yOffset), m > F && F > -m && (F = b), m > z && z > -m && (z = b), m > I && I > -m && (I = 0)), T = O.xPercent || O.yPercent ? "translate(" + O.xPercent + "%," + O.yPercent + "%) matrix3d(" : "matrix3d(", T += (m > i && i > -m ? b : i) + x + (m > n && n > -m ? b : n) + x + (m > l && l > -m ? b : l), T += x + (m > u && u > -m ? b : u) + x + (m > s && s > -m ? b : s) + x + (m > a && a > -m ? b : a), R || A || 1 !== D ? (T += x + (m > h && h > -m ? b : h) + x + (m > f && f > -m ? b : f) + x + (m > r && r > -m ? b : r), T += x + (m > o && o > -m ? b : o) + x + (m > _ && _ > -m ? b : _) + x + (m > p && p > -m ? b : p) + x) : T += ",0,0,0,0,1,0,", T += F + x + z + x + I + x + (L ? 1 + -I / L : 1) + ")", S[Rt] = T
                }
            };
        (h = Dt.prototype).x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, h.scaleX = h.scaleY = h.scaleZ = 1, Pt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function (t, e, i, s, n, o, l) {
                if (s._lastParsedTransform === l)return n;
                s._lastParsedTransform = l;
                var h, _ = l.scale && "function" == typeof l.scale ? l.scale : 0;
                "function" == typeof l[i] && (h = l[i], l[i] = e), _ && (l.scale = _(g, t));
                var u, f, c, p, d, v, y, T, x, b = t._gsTransform, w = t.style, P = kt.length, O = l, S = {},
                    k = "transformOrigin", R = Vt(t, r, !0, O.parseTransform),
                    A = O.transform && ("function" == typeof O.transform ? O.transform(g, m) : O.transform);
                if (s._transform = R, A && "string" == typeof A && Rt) f = j.style, f[Rt] = A, f.display = "block", f.position = "absolute", B.body.appendChild(j), u = Vt(j, null, !1), R.svg && (v = R.xOrigin, y = R.yOrigin, u.x -= R.xOffset, u.y -= R.yOffset, (O.transformOrigin || O.svgOrigin) && (A = {}, Nt(t, ot(O.transformOrigin), A, O.svgOrigin, O.smoothOrigin, !0), v = A.xOrigin, y = A.yOrigin, u.x -= A.xOffset - R.xOffset, u.y -= A.yOffset - R.yOffset), (v || y) && (T = jt(j, !0), u.x -= v - (v * T[0] + y * T[2]), u.y -= y - (v * T[1] + y * T[3]))), B.body.removeChild(j), u.perspective || (u.perspective = R.perspective), null != O.xPercent && (u.xPercent = ht(O.xPercent, R.xPercent)), null != O.yPercent && (u.yPercent = ht(O.yPercent, R.yPercent)); else if ("object" == typeof O) {
                    if (u = {
                            scaleX: ht(null != O.scaleX ? O.scaleX : O.scale, R.scaleX),
                            scaleY: ht(null != O.scaleY ? O.scaleY : O.scale, R.scaleY),
                            scaleZ: ht(O.scaleZ, R.scaleZ),
                            x: ht(O.x, R.x),
                            y: ht(O.y, R.y),
                            z: ht(O.z, R.z),
                            xPercent: ht(O.xPercent, R.xPercent),
                            yPercent: ht(O.yPercent, R.yPercent),
                            perspective: ht(O.transformPerspective, R.perspective)
                        }, null != (d = O.directionalRotation))if ("object" == typeof d)for (f in d)O[f] = d[f]; else O.rotation = d;
                    "string" == typeof O.x && -1 !== O.x.indexOf("%") && (u.x = 0, u.xPercent = ht(O.x, R.xPercent)), "string" == typeof O.y && -1 !== O.y.indexOf("%") && (u.y = 0, u.yPercent = ht(O.y, R.yPercent)), u.rotation = _t("rotation" in O ? O.rotation : "shortRotation" in O ? O.shortRotation + "_short" : "rotationZ" in O ? O.rotationZ : R.rotation, R.rotation, "rotation", S), Mt && (u.rotationX = _t("rotationX" in O ? O.rotationX : "shortRotationX" in O ? O.shortRotationX + "_short" : R.rotationX || 0, R.rotationX, "rotationX", S), u.rotationY = _t("rotationY" in O ? O.rotationY : "shortRotationY" in O ? O.shortRotationY + "_short" : R.rotationY || 0, R.rotationY, "rotationY", S)), u.skewX = _t(O.skewX, R.skewX), u.skewY = _t(O.skewY, R.skewY)
                }
                for (Mt && null != O.force3D && (R.force3D = O.force3D, p = !0), R.skewType = O.skewType || R.skewType || a.defaultSkewType, (c = R.force3D || R.z || R.rotationX || R.rotationY || u.z || u.rotationX || u.rotationY || u.perspective) || null == O.scale || (u.scaleZ = 1); --P > -1;)x = kt[P], ((A = u[x] - R[x]) > 1e-6 || -1e-6 > A || null != O[x] || null != L[x]) && (p = !0, n = new yt(R, x, R[x], A, n), x in S && (n.e = S[x]), n.xs0 = 0, n.plugin = o, s._overwriteProps.push(n.n));
                return A = O.transformOrigin, R.svg && (A || O.svgOrigin) && (v = R.xOffset, y = R.yOffset, Nt(t, ot(A), u, O.svgOrigin, O.smoothOrigin), n = Tt(R, "xOrigin", (b ? R : u).xOrigin, u.xOrigin, n, k), n = Tt(R, "yOrigin", (b ? R : u).yOrigin, u.yOrigin, n, k), (v !== R.xOffset || y !== R.yOffset) && (n = Tt(R, "xOffset", b ? v : R.xOffset, R.xOffset, n, k), n = Tt(R, "yOffset", b ? y : R.yOffset, R.yOffset, n, k)), A = "0px 0px"), (A || Mt && c && R.zOrigin) && (Rt ? (p = !0, x = Ct, A = (A || J(t, x, r, !1, "50% 50%")) + "", n = new yt(w, x, 0, 0, n, -1, k), n.b = w[x], n.plugin = o, Mt ? (f = R.zOrigin, A = A.split(" "), R.zOrigin = (A.length > 2 && (0 === f || "0px" !== A[2]) ? parseFloat(A[2]) : f) || 0, n.xs0 = n.e = A[0] + " " + (A[1] || "50%") + " 0px", n = new yt(R, "zOrigin", 0, 0, n, -1, n.n), n.b = f, n.xs0 = n.e = R.zOrigin) : n.xs0 = n.e = A) : ot(A + "", R)), p && (s._transformType = R.svg && St || !c && 3 !== this._transformType ? 2 : 3), h && (l[i] = h), _ && (l.scale = _), n
            }, prefix: !0
        }), Pt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), Pt("borderRadius", {
            defaultValue: "0px", parser: function (t, e, i, n, a, o) {
                e = this.format(e);
                var l, h, _, u, f, c, p, d, m, g, v, y, T, x, b, w,
                    P = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    O = t.style;
                for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), l = e.split(" "), h = 0; h < P.length; h++)this.p.indexOf("border") && (P[h] = H(P[h])), -1 !== (f = u = J(t, P[h], r, !1, "0px")).indexOf(" ") && (u = f.split(" "), f = u[0], u = u[1]), c = _ = l[h], p = parseFloat(f), y = f.substr((p + "").length), (T = "=" === c.charAt(1)) ? (d = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), d *= parseFloat(c), v = c.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(c), v = c.substr((d + "").length)), "" === v && (v = s[i] || y), v !== y && (x = tt(t, "borderLeft", p, y), b = tt(t, "borderTop", p, y), "%" === v ? (f = x / m * 100 + "%", u = b / g * 100 + "%") : "em" === v ? (w = tt(t, "borderLeft", 1, "em"), f = x / w + "em", u = b / w + "em") : (f = x + "px", u = b + "px"), T && (c = parseFloat(f) + d + v, _ = parseFloat(u) + d + v)), a = xt(O, P[h], f + " " + u, c + " " + _, !1, "0px", a);
                return a
            }, prefix: !0, formatter: mt("0px 0px 0px 0px", !1, !0)
        }), Pt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function (t, e, i, s, n, a) {
                return xt(t.style, i, this.format(J(t, i, r, !1, "0px 0px")), this.format(e), !1, "0px", n)
            },
            prefix: !0,
            formatter: mt("0px 0px", !1, !0)
        }), Pt("backgroundPosition", {
            defaultValue: "0 0", parser: function (t, e, i, s, n, a) {
                var o, l, h, _, u, f, c = "background-position", p = r || K(t, null),
                    m = this.format((p ? d ? p.getPropertyValue(c + "-x") + " " + p.getPropertyValue(c + "-y") : p.getPropertyValue(c) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                    g = this.format(e);
                if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && g.split(",").length < 2 && (f = J(t, "backgroundImage").replace(A, "")) && "none" !== f) {
                    for (o = m.split(" "), l = g.split(" "), V.setAttribute("src", f), h = 2; --h > -1;)m = o[h], (_ = -1 !== m.indexOf("%")) !== (-1 !== l[h].indexOf("%")) && (u = 0 === h ? t.offsetWidth - V.width : t.offsetHeight - V.height, o[h] = _ ? parseFloat(m) / 100 * u + "px" : parseFloat(m) / u * 100 + "%");
                    m = o.join(" ")
                }
                return this.parseComplex(t.style, m, g, n, a)
            }, formatter: ot
        }), Pt("backgroundSize", {
            defaultValue: "0 0", formatter: function (t) {
                return t += "", ot(-1 === t.indexOf(" ") ? t + " " + t : t)
            }
        }), Pt("perspective", {defaultValue: "0px", prefix: !0}), Pt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), Pt("transformStyle", {prefix: !0}), Pt("backfaceVisibility", {prefix: !0}), Pt("userSelect", {prefix: !0}), Pt("margin", {parser: gt("marginTop,marginRight,marginBottom,marginLeft")}), Pt("padding", {parser: gt("paddingTop,paddingRight,paddingBottom,paddingLeft")}), Pt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (t, e, i, s, n, a) {
                var o, l, h;
                return 9 > d ? (l = t.currentStyle, h = 8 > d ? " " : ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (o = this.format(J(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
            }
        }), Pt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), Pt("autoRound,strictUnits", {
            parser: function (t, e, i, s, r) {
                return r
            }
        }), Pt("border", {
            defaultValue: "0px solid #000", parser: function (t, e, i, s, n, a) {
                var o = J(t, "borderTopWidth", r, !1, "0px"), l = this.format(e).split(" "), h = l[0].replace(b, "");
                return "px" !== h && (o = parseFloat(o) / tt(t, "borderTopWidth", 1, h) + h), this.parseComplex(t.style, this.format(o + " " + J(t, "borderTopStyle", r, !1, "solid") + " " + J(t, "borderTopColor", r, !1, "#000")), l.join(" "), n, a)
            }, color: !0, formatter: function (t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(dt) || ["#000"])[0]
            }
        }), Pt("borderWidth", {parser: gt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}), Pt("float,cssFloat,styleFloat", {
            parser: function (t, e, i, s, r, n) {
                var a = t.style, o = "cssFloat" in a ? "cssFloat" : "styleFloat";
                return new yt(a, o, 0, 0, r, -1, i, !1, 0, a[o], e)
            }
        });
        var Wt = function (t) {
            var e, i = this.t, s = i.filter || J(this.data, "filter") || "", r = this.s + this.c * t | 0;
            100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(") ? (i.removeAttribute("filter"), e = !J(this.data, "filter")) : (i.filter = s.replace(O, ""), e = !0)), e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"), -1 === s.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = s + " alpha(opacity=" + r + ")") : i.filter = s.replace(w, "opacity=" + r))
        };
        Pt("opacity,alpha,autoAlpha", {
            defaultValue: "1", parser: function (t, e, i, s, n, a) {
                var o = parseFloat(J(t, "opacity", r, !1, "1")), l = t.style, h = "autoAlpha" === i;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), h && 1 === o && "hidden" === J(t, "visibility", r) && 0 !== e && (o = 0), W ? n = new yt(l, "opacity", o, e - o, n) : (n = new yt(l, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = h ? 1 : 0, l.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Wt), h && (n = new yt(l, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", s._overwriteProps.push(n.n), s._overwriteProps.push(i)), n
            }
        });
        var Gt = function (t, e) {
            e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(k, "-$1").toLowerCase())) : t.removeAttribute(e))
        }, Zt = function (t) {
            if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                this.t.setAttribute("class", 0 === t ? this.b : this.e);
                for (var e = this.data, i = this.t.style; e;)e.v ? i[e.p] = e.v : Gt(i, e.p), e = e._next;
                1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        Pt("className", {
            parser: function (t, e, s, n, a, o, l) {
                var h, _, u, f, c, p = t.getAttribute("class") || "", d = t.style.cssText;
                if (a = n._classNamePT = new yt(t, s, 0, 0, a, 2), a.setRatio = Zt, a.pr = -11, i = !0, a.b = p, _ = it(t, r), u = t._gsClassPT) {
                    for (f = {}, c = u.data; c;)f[c.p] = 1, c = c._next;
                    u.setRatio(1)
                }
                return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", a.e), h = st(t, _, it(t), l, f), t.setAttribute("class", p), a.data = h.firstMPT, t.style.cssText = d, a = a.xfirst = n.parse(t, h.difs, a, o)
            }
        });
        var $t = function (t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e, i, s, r, n, a = this.t.style, o = l.transform.parse;
                if ("all" === this.e) a.cssText = "", r = !0; else for (e = this.e.split(" ").join("").split(","), s = e.length; --s > -1;)i = e[s], l[i] && (l[i].parse === o ? r = !0 : i = "transformOrigin" === i ? Ct : l[i].p), Gt(a, i);
                r && (Gt(a, Rt), (n = this.t._gsTransform) && (n.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
            }
        };
        for (Pt("clearProps", {
            parser: function (t, e, s, r, n) {
                return n = new yt(t, s, 0, 0, n, 2), n.setRatio = $t, n.e = e, n.pr = -10, n.data = r._tween, i = !0, n
            }
        }), h = "bezier,throwProps,physicsProps,physics2D".split(","), bt = h.length; bt--;)Ot(h[bt]);
        (h = a.prototype)._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function (t, e, o, h) {
            if (!t.nodeType)return !1;
            this._target = m = t, this._tween = o, this._vars = e, g = h, _ = e.autoRound, i = !1, s = e.suffixMap || a.suffixMap, r = K(t, ""), n = this._overwriteProps;
            var c, d, v, y, T, x, b, w, O, S = t.style;
            if (u && "" === S.zIndex && ("auto" === (c = J(t, "zIndex", r)) || "" === c) && this._addLazySet(S, "zIndex", 0), "string" == typeof e && (y = S.cssText, c = it(t, r), S.cssText = y + ";" + e, c = st(t, c, it(t)).difs, !W && P.test(e) && (c.opacity = parseFloat(RegExp.$1)), e = c, S.cssText = y), e.className ? this._firstPT = d = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = d = this.parse(t, e, null), this._transformType) {
                for (O = 3 === this._transformType, Rt ? f && (u = !0, "" === S.zIndex && ("auto" === (b = J(t, "zIndex", r)) || "" === b) && this._addLazySet(S, "zIndex", 0), p && this._addLazySet(S, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (O ? "visible" : "hidden"))) : S.zoom = 1, v = d; v && v._next;)v = v._next;
                w = new yt(t, "transform", 0, 0, null, 2), this._linkCSSP(w, null, v), w.setRatio = Rt ? qt : Ut, w.data = this._transform || Vt(t, r, !0), w.tween = o, w.pr = -1, n.pop()
            }
            if (i) {
                for (; d;) {
                    for (x = d._next, v = y; v && v.pr > d.pr;)v = v._next;
                    (d._prev = v ? v._prev : T) ? d._prev._next = d : y = d, (d._next = v) ? v._prev = d : T = d, d = x
                }
                this._firstPT = y
            }
            return !0
        }, h.parse = function (t, e, i, n) {
            var a, o, h, u, f, c, p, d, v, y, T = t.style;
            for (a in e)"function" == typeof(c = e[a]) && (c = c(g, m)), (o = l[a]) ? i = o.parse(t, c, a, this, i, n, e) : (f = J(t, a, r) + "", v = "string" == typeof c, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || v && S.test(c) ? (v || (c = ct(c), c = (c.length > 3 ? "rgba(" : "rgb(") + c.join(",") + ")"), i = xt(T, a, f, c, !0, "transparent", i, 0, n)) : v && I.test(c) ? i = xt(T, a, f, c, !0, null, i, 0, n) : (h = parseFloat(f), p = h || 0 === h ? f.substr((h + "").length) : "", ("" === f || "auto" === f) && ("width" === a || "height" === a ? (h = at(t, a, r), p = "px") : "left" === a || "top" === a ? (h = et(t, a, r), p = "px") : (h = "opacity" !== a ? 0 : 1, p = "")), (y = v && "=" === c.charAt(1)) ? (u = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), u *= parseFloat(c), d = c.replace(b, "")) : (u = parseFloat(c), d = v ? c.replace(b, "") : ""), "" === d && (d = a in s ? s[a] : p), c = u || 0 === u ? (y ? u + h : u) + d : e[a], p !== d && "" !== d && (u || 0 === u) && h && (h = tt(t, a, h, p), "%" === d ? (h /= tt(t, a, 100, "%") / 100, !0 !== e.strictUnits && (f = h + "%")) : "em" === d || "rem" === d || "vw" === d || "vh" === d ? h /= tt(t, a, 1, d) : "px" !== d && (u = tt(t, a, u, d), d = "px"), y && (u || 0 === u) && (c = u + h + d)), y && (u += h), !h && 0 !== h || !u && 0 !== u ? void 0 !== T[a] && (c || c + "" != "NaN" && null != c) ? (i = new yt(T, a, u || h || 0, 0, i, -1, a, !1, 0, f, c), i.xs0 = "none" !== c || "display" !== a && -1 === a.indexOf("Style") ? c : f) : Z("invalid " + a + " tween value: " + e[a]) : (i = new yt(T, a, h, u - h, i, 0, a, !1 !== _ && ("px" === d || "zIndex" === a), 0, f, c), i.xs0 = d))), n && i && !i.plugin && (i.plugin = n);
            return i
        }, h.setRatio = function (t) {
            var e, i, s, r = this._firstPT;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)for (; r;) {
                if (e = r.c * t + r.s, r.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), r.type)if (1 === r.type)if (2 === (s = r.l)) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2; else if (3 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3; else if (4 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4; else if (5 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5; else {
                    for (i = r.xs0 + e + r.xs1, s = 1; s < r.l; s++)i += r["xn" + s] + r["xs" + (s + 1)];
                    r.t[r.p] = i
                } else-1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t); else r.t[r.p] = e + r.xs0;
                r = r._next
            } else for (; r;)2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next; else for (; r;) {
                if (2 !== r.type)if (r.r && -1 !== r.type)if (e = Math.round(r.s + r.c), r.type) {
                    if (1 === r.type) {
                        for (s = r.l, i = r.xs0 + e + r.xs1, s = 1; s < r.l; s++)i += r["xn" + s] + r["xs" + (s + 1)];
                        r.t[r.p] = i
                    }
                } else r.t[r.p] = e + r.xs0; else r.t[r.p] = r.e; else r.setRatio(t);
                r = r._next
            }
        }, h._enableTransforms = function (t) {
            this._transform = this._transform || Vt(this._target, r, !0), this._transformType = this._transform.svg && St || !t && 3 !== this._transformType ? 2 : 3
        };
        var Qt = function (t) {
            this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
        };
        h._addLazySet = function (t, e, i) {
            var s = this._firstPT = new yt(t, e, 0, 0, this._firstPT, 2);
            s.e = i, s.setRatio = Qt, s.data = this
        }, h._linkCSSP = function (t, e, i, s) {
            return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, s = !0), i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
        }, h._mod = function (t) {
            for (var e = this._firstPT; e;)"function" == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1), e = e._next
        }, h._kill = function (e) {
            var i, s, r, n = e;
            if (e.autoAlpha || e.alpha) {
                n = {};
                for (s in e)n[s] = e[s];
                n.opacity = 1, n.autoAlpha && (n.visibility = 1)
            }
            for (e.className && (i = this._classNamePT) && ((r = i.xfirst) && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), i = this._firstPT; i;)i.plugin && i.plugin !== s && i.plugin._kill && (i.plugin._kill(e), s = i.plugin), i = i._next;
            return t.prototype._kill.call(this, n)
        };
        var Ht = function (t, e, i) {
            var s, r, n, a;
            if (t.slice)for (r = t.length; --r > -1;)Ht(t[r], e, i); else for (s = t.childNodes, r = s.length; --r > -1;)n = s[r], a = n.type, n.style && (e.push(it(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Ht(n, e, i)
        };
        return a.cascadeTo = function (t, i, s) {
            var r, n, a, o, l = e.to(t, i, s), h = [l], _ = [], u = [], f = [], c = e._internals.reservedProps;
            for (t = l._targets || l.target, Ht(t, _, f), l.render(i, !0, !0), Ht(t, u), l.render(0, !0, !0), l._enabled(!0), r = f.length; --r > -1;)if ((n = st(f[r], _[r], u[r])).firstMPT) {
                n = n.difs;
                for (a in s)c[a] && (n[a] = s[a]);
                o = {};
                for (a in n)o[a] = _[r][a];
                h.push(e.fromTo(f[r], i, o, n))
            }
            return h
        }, t.activate([a]), a
    }, !0), function () {
        var t = function (t) {
            for (; t;)t.f || t.blob || (t.m = Math.round), t = t._next
        }, e = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.6.0",
            priority: -1,
            API: 2,
            init: function (t, e, i) {
                return this._tween = i, !0
            }
        }).prototype;
        e._onInitAllProps = function () {
            for (var e, i, s, r = this._tween, n = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), a = n.length, o = {}, l = r._propLookup.roundProps; --a > -1;)o[n[a]] = Math.round;
            for (a = n.length; --a > -1;)for (e = n[a], i = r._firstPT; i;)s = i._next, i.pg ? i.t._mod(o) : i.n === e && (2 === i.f && i.t ? t(i.t._firstPT) : (this._add(i.t, e, i.s, i.c), s && (s._prev = i._prev), i._prev ? i._prev._next = s : r._firstPT === i && (r._firstPT = s), i._next = i._prev = null, r._propLookup[e] = l)), i = s;
            return !1
        }, e._add = function (t, e, i, s) {
            this._addTween(t, e, i, i + s, e, Math.round), this._overwriteProps.push(e)
        }
    }(), _gsScope._gsDefine.plugin({
        propName: "attr", API: 2, version: "0.6.0", init: function (t, e, i, s) {
            var r, n;
            if ("function" != typeof t.setAttribute)return !1;
            for (r in e)"function" == typeof(n = e[r]) && (n = n(s, t)), this._addTween(t, "setAttribute", t.getAttribute(r) + "", n + "", r, !1, r), this._overwriteProps.push(r);
            return !0
        }
    }), _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.0",
        API: 2,
        init: function (t, e, i, s) {
            "object" != typeof e && (e = {rotation: e}), this.finals = {};
            var r, n, a, o, l, h, _ = !0 === e.useRadians ? 2 * Math.PI : 360;
            for (r in e)"useRadians" !== r && ("function" == typeof(o = e[r]) && (o = o(s, t)), h = (o + "").split("_"), n = h[0], a = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), o = this.finals[r] = "string" == typeof n && "=" === n.charAt(1) ? a + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)) : Number(n) || 0, l = o - a, h.length && (-1 !== (n = h.join("_")).indexOf("short") && (l %= _) != l % (_ / 2) && (l = 0 > l ? l + _ : l - _), -1 !== n.indexOf("_cw") && 0 > l ? l = (l + 9999999999 * _) % _ - (l / _ | 0) * _ : -1 !== n.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * _) % _ - (l / _ | 0) * _)), (l > 1e-6 || -1e-6 > l) && (this._addTween(t, r, a, a + l, r), this._overwriteProps.push(r)));
            return !0
        },
        set: function (t) {
            var e;
            if (1 !== t) this._super.setRatio.call(this, t); else for (e = this._firstPT; e;)e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
        }
    })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (t) {
        var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope, n = r.com.greensock, a = 2 * Math.PI, o = Math.PI / 2,
            l = n._class, h = function (e, i) {
                var s = l("easing." + e, function () {
                }, !0), r = s.prototype = new t;
                return r.constructor = s, r.getRatio = i, s
            }, _ = t.register || function () {
                }, u = function (t, e, i, s, r) {
                var n = l("easing." + t, {easeOut: new e, easeIn: new i, easeInOut: new s}, !0);
                return _(n, t), n
            }, f = function (t, e, i) {
                this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
            }, c = function (e, i) {
                var s = l("easing." + e, function (t) {
                    this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                }, !0), r = s.prototype = new t;
                return r.constructor = s, r.getRatio = i, r.config = function (t) {
                    return new s(t)
                }, s
            }, p = u("Back", c("BackOut", function (t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            }), c("BackIn", function (t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            }), c("BackInOut", function (t) {
                return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            })), d = l("easing.SlowMo", function (t, e, i) {
                e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === i
            }, !0), m = d.prototype = new t;
        return m.constructor = d, m.getRatio = function (t) {
            var e = t + (.5 - t) * this._p;
            return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }, d.ease = new d(.7, .7), m.config = d.config = function (t, e, i) {
            return new d(t, e, i)
        }, e = l("easing.SteppedEase", function (t) {
            t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
        }, !0), m = e.prototype = new t, m.constructor = e, m.getRatio = function (t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
        }, m.config = e.config = function (t) {
            return new e(t)
        }, i = l("easing.RoughEase", function (e) {
            for (var i, s, r, n, a, o, l = (e = e || {}).taper || "none", h = [], _ = 0, u = 0 | (e.points || 20), c = u, p = !1 !== e.randomize, d = !0 === e.clamp, m = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --c > -1;)i = p ? Math.random() : 1 / u * c, s = m ? m.getRatio(i) : i, "none" === l ? r = g : "out" === l ? (n = 1 - i, r = n * n * g) : "in" === l ? r = i * i * g : .5 > i ? (n = 2 * i, r = n * n * .5 * g) : (n = 2 * (1 - i), r = n * n * .5 * g), p ? s += Math.random() * r - .5 * r : c % 2 ? s += .5 * r : s -= .5 * r, d && (s > 1 ? s = 1 : 0 > s && (s = 0)), h[_++] = {
                x: i,
                y: s
            };
            for (h.sort(function (t, e) {
                return t.x - e.x
            }), o = new f(1, 1, null), c = u; --c > -1;)a = h[c], o = new f(a.x, a.y, o);
            this._prev = new f(0, 0, 0 !== o.t ? o : o.next)
        }, !0), m = i.prototype = new t, m.constructor = i, m.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;)e = e.next;
                e = e.prev
            } else for (; e.prev && t <= e.t;)e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c
        }, m.config = function (t) {
            return new i(t)
        }, i.ease = new i, u("Bounce", h("BounceOut", function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), h("BounceIn", function (t) {
            return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), h("BounceInOut", function (t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
        })), u("Circ", h("CircOut", function (t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), h("CircIn", function (t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), h("CircInOut", function (t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })), s = function (e, i, s) {
            var r = l("easing." + e, function (t, e) {
                this._p1 = t >= 1 ? t : 1, this._p2 = (e || s) / (1 > t ? t : 1), this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0), this._p2 = a / this._p2
            }, !0), n = r.prototype = new t;
            return n.constructor = r, n.getRatio = i, n.config = function (t, e) {
                return new r(t, e)
            }, r
        }, u("Elastic", s("ElasticOut", function (t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
        }, .3), s("ElasticIn", function (t) {
            return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
        }, .3), s("ElasticInOut", function (t) {
            return (t *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
        }, .45)), u("Expo", h("ExpoOut", function (t) {
            return 1 - Math.pow(2, -10 * t)
        }), h("ExpoIn", function (t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), h("ExpoInOut", function (t) {
            return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })), u("Sine", h("SineOut", function (t) {
            return Math.sin(t * o)
        }), h("SineIn", function (t) {
            return 1 - Math.cos(t * o)
        }), h("SineInOut", function (t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })), l("easing.EaseLookup", {
            find: function (e) {
                return t.map[e]
            }
        }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), p
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (t, e) {
    "use strict";
    var i = {}, s = t.document, r = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (!r.TweenLite) {
        var n, a, o, l, h, _ = function (t) {
            var e, i = t.split("."), s = r;
            for (e = 0; e < i.length; e++)s[i[e]] = s = s[i[e]] || {};
            return s
        }, u = _("com.greensock"), f = 1e-10, c = function (t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i
        }, p = function () {
        }, d = function () {
            var t = Object.prototype.toString, e = t.call([]);
            return function (i) {
                return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
            }
        }(), m = {}, g = function (s, n, a, o) {
            this.sc = m[s] ? m[s].sc : [], m[s] = this, this.gsClass = null, this.func = a;
            var l = [];
            this.check = function (h) {
                for (var u, f, c, p, d, v = n.length, y = v; --v > -1;)(u = m[n[v]] || new g(n[v], [])).gsClass ? (l[v] = u.gsClass, y--) : h && u.sc.push(this);
                if (0 === y && a) {
                    if (f = ("com.greensock." + s).split("."), c = f.pop(), p = _(f.join("."))[c] = this.gsClass = a.apply(a, l), o)if (r[c] = i[c] = p, !(d = "undefined" != typeof module && module.exports) && "function" == typeof define && define.amd) define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function () {
                        return p
                    }); else if (d)if (s === e) {
                        module.exports = i[e] = p;
                        for (v in i)p[v] = i[v]
                    } else i[e] && (i[e][c] = p);
                    for (v = 0; v < this.sc.length; v++)this.sc[v].check()
                }
            }, this.check(!0)
        }, v = t._gsDefine = function (t, e, i, s) {
            return new g(t, e, i, s)
        }, y = u._class = function (t, e, i) {
            return e = e || function () {
                }, v(t, [], function () {
                return e
            }, i), e
        };
        v.globals = r;
        var T = [0, 0, 1, 1], x = y("easing.Ease", function (t, e, i, s) {
            this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? T.concat(e) : T
        }, !0), b = x.map = {}, w = x.register = function (t, e, i, s) {
            for (var r, n, a, o, l = e.split(","), h = l.length, _ = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;)for (n = l[h], r = s ? y("easing." + n, null, !0) : u.easing[n] || {}, a = _.length; --a > -1;)o = _[a], b[n + "." + o] = b[o + n] = r[o] = t.getRatio ? t : t[o] || new t
        };
        for ((o = x.prototype)._calcEnd = !1, o.getRatio = function (t) {
            if (this._func)return this._params[0] = t, this._func.apply(null, this._params);
            var e = this._type, i = this._power, s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
            return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
        }, a = (n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --a > -1;)o = n[a] + ",Power" + a, w(new x(null, null, 1, a), o, "easeOut", !0), w(new x(null, null, 2, a), o, "easeIn" + (0 === a ? ",easeNone" : "")), w(new x(null, null, 3, a), o, "easeInOut");
        b.linear = u.easing.Linear.easeIn, b.swing = u.easing.Quad.easeInOut;
        var P = y("events.EventDispatcher", function (t) {
            this._listeners = {}, this._eventTarget = t || this
        });
        (o = P.prototype).addEventListener = function (t, e, i, s, r) {
            r = r || 0;
            var n, a, o = this._listeners[t], _ = 0;
            for (this !== l || h || l.wake(), null == o && (this._listeners[t] = o = []), a = o.length; --a > -1;)(n = o[a]).c === e && n.s === i ? o.splice(a, 1) : 0 === _ && n.pr < r && (_ = a + 1);
            o.splice(_, 0, {c: e, s: i, up: s, pr: r})
        }, o.removeEventListener = function (t, e) {
            var i, s = this._listeners[t];
            if (s)for (i = s.length; --i > -1;)if (s[i].c === e)return void s.splice(i, 1)
        }, o.dispatchEvent = function (t) {
            var e, i, s, r = this._listeners[t];
            if (r)for ((e = r.length) > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1;)(s = r[e]) && (s.up ? s.c.call(s.s || i, {
                type: t,
                target: i
            }) : s.c.call(s.s || i))
        };
        var O = t.requestAnimationFrame, S = t.cancelAnimationFrame, k = Date.now || function () {
                return (new Date).getTime()
            }, R = k();
        for (a = (n = ["ms", "moz", "webkit", "o"]).length; --a > -1 && !O;)O = t[n[a] + "RequestAnimationFrame"], S = t[n[a] + "CancelAnimationFrame"] || t[n[a] + "CancelRequestAnimationFrame"];
        y("Ticker", function (t, e) {
            var i, r, n, a, o, _ = this, u = k(), c = !(!1 === e || !O) && "auto", d = 500, m = 33, g = function (t) {
                var e, s, l = k() - R;
                l > d && (u += l - m), R += l, _.time = (R - u) / 1e3, e = _.time - o, (!i || e > 0 || !0 === t) && (_.frame++, o += e + (e >= a ? .004 : a - e), s = !0), !0 !== t && (n = r(g)), s && _.dispatchEvent("tick")
            };
            P.call(_), _.time = _.frame = 0, _.tick = function () {
                g(!0)
            }, _.lagSmoothing = function (t, e) {
                d = t || 1 / f, m = Math.min(e, d, 0)
            }, _.sleep = function () {
                null != n && (c && S ? S(n) : clearTimeout(n), r = p, n = null, _ === l && (h = !1))
            }, _.wake = function (t) {
                null !== n ? _.sleep() : t ? u += -R + (R = k()) : _.frame > 10 && (R = k() - d + 5), r = 0 === i ? p : c && O ? O : function (t) {
                    return setTimeout(t, 1e3 * (o - _.time) + 1 | 0)
                }, _ === l && (h = !0), g(2)
            }, _.fps = function (t) {
                return arguments.length ? (i = t, a = 1 / (i || 60), o = this.time + a, void _.wake()) : i
            }, _.useRAF = function (t) {
                return arguments.length ? (_.sleep(), c = t, void _.fps(i)) : c
            }, _.fps(t), setTimeout(function () {
                "auto" === c && _.frame < 5 && "hidden" !== s.visibilityState && _.useRAF(!1)
            }, 1500)
        }), (o = u.Ticker.prototype = new u.events.EventDispatcher).constructor = u.Ticker;
        var A = y("core.Animation", function (t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, Z) {
                h || l.wake();
                var i = this.vars.useFrames ? G : Z;
                i.add(this, i._time), this.vars.paused && this.paused(!0)
            }
        });
        l = A.ticker = new u.Ticker, (o = A.prototype)._dirty = o._gc = o._initted = o._paused = !1, o._totalTime = o._time = 0, o._rawPrevTime = -1, o._next = o._last = o._onUpdate = o._timeline = o.timeline = null, o._paused = !1;
        var C = function () {
            h && k() - R > 2e3 && l.wake(), setTimeout(C, 2e3)
        };
        C(), o.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, o.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, o.resume = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!1)
        }, o.seek = function (t, e) {
            return this.totalTime(Number(t), !1 !== e)
        }, o.restart = function (t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
        }, o.reverse = function (t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, o.render = function (t, e, i) {
        }, o.invalidate = function () {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        }, o.isActive = function () {
            var t, e = this._timeline, i = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale
        }, o._enabled = function (t, e) {
            return h || l.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        }, o._kill = function (t, e) {
            return this._enabled(!1, !1)
        }, o.kill = function (t, e) {
            return this._kill(t, e), this
        }, o._uncache = function (t) {
            for (var e = t ? this : this.timeline; e;)e._dirty = !0, e = e.timeline;
            return this
        }, o._swapSelfInParams = function (t) {
            for (var e = t.length, i = t.concat(); --e > -1;)"{self}" === t[e] && (i[e] = this);
            return i
        }, o._callback = function (t) {
            var e = this.vars, i = e[t], s = e[t + "Params"], r = e[t + "Scope"] || e.callbackScope || this;
            switch (s ? s.length : 0) {
                case 0:
                    i.call(r);
                    break;
                case 1:
                    i.call(r, s[0]);
                    break;
                case 2:
                    i.call(r, s[0], s[1]);
                    break;
                default:
                    i.apply(r, s)
            }
        }, o.eventCallback = function (t, e, i, s) {
            if ("on" === (t || "").substr(0, 2)) {
                var r = this.vars;
                if (1 === arguments.length)return r[t];
                null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = d(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }, o.delay = function (t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        }, o.duration = function (t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, o.totalDuration = function (t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        }, o.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }, o.totalTime = function (t, e, i) {
            if (h || l.wake(), !arguments.length)return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var s = this._totalDuration, r = this._timeline;
                    if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)for (; r._timeline;)r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (I.length && Q(), this.render(t, e, !1), I.length && Q())
            }
            return this
        }, o.progress = o.totalProgress = function (t, e) {
            var i = this.duration();
            return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
        }, o.startTime = function (t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        }, o.endTime = function (t) {
            return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
        }, o.timeScale = function (t) {
            if (!arguments.length)return this._timeScale;
            if (t = t || f, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime, i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        }, o.reversed = function (t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, o.paused = function (t) {
            if (!arguments.length)return this._paused;
            var e, i, s = this._timeline;
            return t != this._paused && s && (h || t || l.wake(), e = s.rawTime(), i = e - this._pauseTime, !t && s.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = s.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
        };
        var M = y("core.SimpleTimeline", function (t) {
            A.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        (o = M.prototype = new A).constructor = M, o.kill()._gc = !1, o._first = o._last = o._recent = null, o._sortChildren = !1, o.add = o.insert = function (t, e, i, s) {
            var r, n;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)for (n = t._startTime; r && r._startTime > n;)r = r._prev;
            return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
        }, o._remove = function (t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        }, o.render = function (t, e, i) {
            var s, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; r;)s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
        }, o.rawTime = function () {
            return h || l.wake(), this._totalTime
        };
        var D = y("TweenLite", function (e, i, s) {
            if (A.call(this, i, s), this.render = D.prototype.render, null == e)throw"Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : D.selector(e) || e;
            var r, n, a,
                o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                l = this.vars.overwrite;
            if (this._overwrite = l = null == l ? W[D.defaultOverwrite] : "number" == typeof l ? l >> 0 : W[l], (o || e instanceof Array || e.push && d(e)) && "number" != typeof e[0])for (this._targets = a = c(e), this._propLookup = [], this._siblings = [], r = 0; r < a.length; r++)(n = a[r]) ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(c(n))) : (this._siblings[r] = H(n, this, !1), 1 === l && this._siblings[r].length > 1 && J(n, this, null, 1, this._siblings[r])) : "string" == typeof(n = a[r--] = D.selector(n)) && a.splice(r + 1, 1) : a.splice(r--, 1); else this._propLookup = {}, this._siblings = H(e, this, !1), 1 === l && this._siblings.length > 1 && J(e, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -f, this.render(Math.min(0, -this._delay)))
        }, !0), F = function (e) {
            return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        }, z = function (t, e) {
            var i, s = {};
            for (i in t)q[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!j[i] || j[i] && j[i]._autoCSS) || (s[i] = t[i], delete t[i]);
            t.css = s
        };
        (o = D.prototype = new A).constructor = D, o.kill()._gc = !1, o.ratio = 0, o._firstPT = o._targets = o._overwrittenProps = o._startAt = null, o._notifyPluginsOfEnabled = o._lazy = !1, D.version = "1.19.1", D.defaultEase = o._ease = new x(null, null, 1, 1), D.defaultOverwrite = "auto", D.ticker = l, D.autoSleep = 120, D.lagSmoothing = function (t, e) {
            l.lagSmoothing(t, e)
        }, D.selector = t.$ || t.jQuery || function (e) {
                var i = t.$ || t.jQuery;
                return i ? (D.selector = i, i(e)) : void 0 === s ? e : s.querySelectorAll ? s.querySelectorAll(e) : s.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
        var I = [], X = {}, N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, L = function (t) {
                for (var e, i = this._firstPT; i;)e = i.blob ? 1 === t ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m(e, this._target || i.t) : 1e-6 > e && e > -1e-6 && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
            }, E = function (t, e, i, s) {
                var r, n, a, o, l, h, _, u = [], f = 0, c = "", p = 0;
                for (u.start = t, u.end = e, t = u[0] = t + "", e = u[1] = e + "", i && (i(u), t = u[0], e = u[1]), u.length = 0, r = t.match(N) || [], n = e.match(N) || [], s && (s._next = null, s.blob = 1, u._firstPT = u._applyPT = s), l = n.length, o = 0; l > o; o++)_ = n[o], h = e.substr(f, e.indexOf(_, f) - f), c += h || !o ? h : ",", f += h.length, p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1), _ === r[o] || r.length <= o ? c += _ : (c && (u.push(c), c = ""), a = parseFloat(r[o]), u.push(a), u._firstPT = {
                    _next: u._firstPT,
                    t: u,
                    p: u.length - 1,
                    s: a,
                    c: ("=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * parseFloat(_.substr(2)) : parseFloat(_) - a) || 0,
                    f: 0,
                    m: p && 4 > p ? Math.round : 0
                }), f += _.length;
                return (c += e.substr(f)) && u.push(c), u.setRatio = L, u
            }, B = function (t, e, i, s, r, n, a, o, l) {
                "function" == typeof s && (s = s(l || 0, t));
                var h, _ = typeof t[e],
                    u = "function" !== _ ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                    f = "get" !== i ? i : u ? a ? t[u](a) : t[u]() : t[e], c = "string" == typeof s && "=" === s.charAt(1),
                    p = {
                        t: t,
                        p: e,
                        s: f,
                        f: "function" === _,
                        pg: 0,
                        n: r || e,
                        m: n ? "function" == typeof n ? n : Math.round : 0,
                        pr: 0,
                        c: c ? parseInt(s.charAt(0) + "1", 10) * parseFloat(s.substr(2)) : parseFloat(s) - f || 0
                    };
                return ("number" != typeof f || "number" != typeof s && !c) && (a || isNaN(f) || !c && isNaN(s) || "boolean" == typeof f || "boolean" == typeof s ? (p.fp = a, h = E(f, c ? p.s + p.c : s, o || D.defaultStringFilter, p), p = {
                    t: h,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 2,
                    pg: 0,
                    n: r || e,
                    pr: 0,
                    m: 0
                }) : (p.s = parseFloat(f), c || (p.c = parseFloat(s) - p.s || 0))), p.c ? ((p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p, p) : void 0
            }, Y = D._internals = {isArray: d, isSelector: F, lazyTweens: I, blobDif: E}, j = D._plugins = {},
            V = Y.tweenLookup = {}, U = 0, q = Y.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1,
                callbackScope: 1,
                stringFilter: 1,
                id: 1
            }, W = {none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0},
            G = A._rootFramesTimeline = new M, Z = A._rootTimeline = new M, $ = 30, Q = Y.lazyRender = function () {
                var t, e = I.length;
                for (X = {}; --e > -1;)(t = I[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                I.length = 0
            };
        Z._startTime = l.time, G._startTime = l.frame, Z._active = G._active = !0, setTimeout(Q, 1), A._updateRoot = D.render = function () {
            var t, e, i;
            if (I.length && Q(), Z.render((l.time - Z._startTime) * Z._timeScale, !1, !1), G.render((l.frame - G._startTime) * G._timeScale, !1, !1), I.length && Q(), l.frame >= $) {
                $ = l.frame + (parseInt(D.autoSleep, 10) || 120);
                for (i in V) {
                    for (t = (e = V[i].tweens).length; --t > -1;)e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete V[i]
                }
                if ((!(i = Z._first) || i._paused) && D.autoSleep && !G._first && 1 === l._listeners.tick.length) {
                    for (; i && i._paused;)i = i._next;
                    i || l.sleep()
                }
            }
        }, l.addEventListener("tick", A._updateRoot);
        var H = function (t, e, i) {
            var s, r, n = t._gsTweenID;
            if (V[n || (t._gsTweenID = n = "t" + U++)] || (V[n] = {
                    target: t,
                    tweens: []
                }), e && (s = V[n].tweens, s[r = s.length] = e, i))for (; --r > -1;)s[r] === e && s.splice(r, 1);
            return V[n].tweens
        }, K = function (t, e, i, s) {
            var r, n, a = t.vars.onOverwrite;
            return a && (r = a(t, e, i, s)), (a = D.onOverwrite) && (n = a(t, e, i, s)), !1 !== r && !1 !== n
        }, J = function (t, e, i, s, r) {
            var n, a, o, l;
            if (1 === s || s >= 4) {
                for (l = r.length, n = 0; l > n; n++)if ((o = r[n]) !== e) o._gc || o._kill(null, t, e) && (a = !0); else if (5 === s)break;
                return a
            }
            var h, _ = e._startTime + f, u = [], c = 0, p = 0 === e._duration;
            for (n = r.length; --n > -1;)(o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || tt(e, 0, p), 0 === tt(o, h, p) && (u[c++] = o)) : o._startTime <= _ && o._startTime + o.totalDuration() / o._timeScale > _ && ((p || !o._initted) && _ - o._startTime <= 2e-10 || (u[c++] = o)));
            for (n = c; --n > -1;)if (o = u[n], 2 === s && o._kill(i, t, e) && (a = !0), 2 !== s || !o._firstPT && o._initted) {
                if (2 !== s && !K(o, e))continue;
                o._enabled(!1, !1) && (a = !0)
            }
            return a
        }, tt = function (t, e, i) {
            for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline;) {
                if (n += s._startTime, r *= s._timeScale, s._paused)return -100;
                s = s._timeline
            }
            return (n /= r) > e ? n - e : i && n === e || !t._initted && 2 * f > n - e ? f : (n += t.totalDuration() / t._timeScale / r) > e + f ? 0 : n - e - f
        };
        o._init = function () {
            var t, e, i, s, r, n, a = this.vars, o = this._overwrittenProps, l = this._duration,
                h = !!a.immediateRender, _ = a.ease;
            if (a.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                for (s in a.startAt)r[s] = a.startAt[s];
                if (r.overwrite = !1, r.immediateRender = !0, r.lazy = h && !1 !== a.lazy, r.startAt = r.delay = null, this._startAt = D.to(this.target, 0, r), h)if (this._time > 0) this._startAt = null; else if (0 !== l)return
            } else if (a.runBackwards && 0 !== l)if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else {
                0 !== this._time && (h = !1), i = {};
                for (s in a)q[s] && "autoCSS" !== s || (i[s] = a[s]);
                if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== a.lazy, i.immediateRender = h, this._startAt = D.to(this.target, 0, i), h) {
                    if (0 === this._time)return
                } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
            }
            if (this._ease = _ = _ ? _ instanceof x ? _ : "function" == typeof _ ? new x(_, a.easeParams) : b[_] || D.defaultEase : D.defaultEase, a.easeParams instanceof Array && _.config && (this._ease = _.config.apply(_, a.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)for (n = this._targets.length, t = 0; n > t; t++)this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null, t) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, o, 0);
            if (e && D._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), a.runBackwards)for (i = this._firstPT; i;)i.s += i.c, i.c = -i.c, i = i._next;
            this._onUpdate = a.onUpdate, this._initted = !0
        }, o._initProps = function (e, i, s, r, n) {
            var a, o, l, h, _, u;
            if (null == e)return !1;
            X[e._gsTweenID] && Q(), this.vars.css || e.style && e !== t && e.nodeType && j.css && !1 !== this.vars.autoCSS && z(this.vars, e);
            for (a in this.vars)if (u = this.vars[a], q[a]) u && (u instanceof Array || u.push && d(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[a] = u = this._swapSelfInParams(u, this)); else if (j[a] && (h = new j[a])._onInitTween(e, this.vars[a], this, n)) {
                for (this._firstPT = _ = {
                    _next: this._firstPT,
                    t: h,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 1,
                    n: a,
                    pg: 1,
                    pr: h._priority,
                    m: 0
                }, o = h._overwriteProps.length; --o > -1;)i[h._overwriteProps[o]] = this._firstPT;
                (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), _._next && (_._next._prev = _)
            } else i[a] = B.call(this, e, a, "get", u, a, 0, null, this.vars.stringFilter, n);
            return r && this._kill(r, e) ? this._initProps(e, i, s, r, n) : this._overwrite > 1 && this._firstPT && s.length > 1 && J(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, r, n)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (X[e._gsTweenID] = !0), l)
        }, o.render = function (t, e, i) {
            var s, r, n, a, o = this._time, l = this._duration, h = this._rawPrevTime;
            if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > h || 0 >= t && t >= -1e-7 || h === f && "isPause" !== this.data) && h !== t && (i = !0, h > f && (r = "onReverseComplete")), this._rawPrevTime = a = !e || t || h === t ? t : f); else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && h > 0) && (r = "onReverseComplete", s = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== f || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !e || t || h === t ? t : f)), this._initted || (i = !0); else if (this._totalTime = this._time = t, this._easeType) {
                var _ = t / l, u = this._easeType, c = this._easePower;
                (1 === u || 3 === u && _ >= .5) && (_ = 1 - _), 3 === u && (_ *= 2), 1 === c ? _ *= _ : 2 === c ? _ *= _ * _ : 3 === c ? _ *= _ * _ * _ : 4 === c && (_ *= _ * _ * _ * _), this.ratio = 1 === u ? 1 - _ : 2 === u ? _ : .5 > t / l ? _ / 2 : 1 - _ / 2
            } else this.ratio = this._ease.getRatio(t / l);
            if (this._time !== o || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc)return;
                    if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration))return this._time = this._totalTime = o, this._rawPrevTime = h, I.push(this), void(this._lazy = [t, e]);
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), n = this._firstPT; n;)n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                this._onUpdate && (0 > t && this._startAt && -1e-4 !== t && this._startAt.render(t, e, i), e || (this._time !== o || s || i) && this._callback("onUpdate")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === f && a !== f && (this._rawPrevTime = 0))
            }
        }, o._kill = function (t, e, i) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target))return this._lazy = !1, this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
            var s, r, n, a, o, l, h, _, u,
                f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
            if ((d(e) || F(e)) && "number" != typeof e[0])for (s = e.length; --s > -1;)this._kill(t, e[s], i) && (l = !0); else {
                if (this._targets) {
                    for (s = this._targets.length; --s > -1;)if (e === this._targets[s]) {
                        o = this._propLookup[s] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all";
                        break
                    }
                } else {
                    if (e !== this.target)return !1;
                    o = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (o) {
                    if (h = t || o, _ = t !== r && "all" !== r && t !== o && ("object" != typeof t || !t._tempKill), i && (D.onOverwrite || this.vars.onOverwrite)) {
                        for (n in h)o[n] && (u || (u = []), u.push(n));
                        if ((u || !t) && !K(this, i, e, u))return !1
                    }
                    for (n in h)(a = o[n]) && (f && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s, l = !0), a.pg && a.t._kill(h) && (l = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[n]), _ && (r[n] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return l
        }, o.invalidate = function () {
            return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], A.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -f, this.render(Math.min(0, -this._delay))), this
        }, o._enabled = function (t, e) {
            if (h || l.wake(), t && this._gc) {
                var i, s = this._targets;
                if (s)for (i = s.length; --i > -1;)this._siblings[i] = H(s[i], this, !0); else this._siblings = H(this.target, this, !0)
            }
            return A.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && D._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
        }, D.to = function (t, e, i) {
            return new D(t, e, i)
        }, D.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i)
        }, D.fromTo = function (t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new D(t, e, s)
        }, D.delayedCall = function (t, e, i, s, r) {
            return new D(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                callbackScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                immediateRender: !1,
                lazy: !1,
                useFrames: r,
                overwrite: 0
            })
        }, D.set = function (t, e) {
            return new D(t, 0, e)
        }, D.getTweensOf = function (t, e) {
            if (null == t)return [];
            t = "string" != typeof t ? t : D.selector(t) || t;
            var i, s, r, n;
            if ((d(t) || F(t)) && "number" != typeof t[0]) {
                for (i = t.length, s = []; --i > -1;)s = s.concat(D.getTweensOf(t[i], e));
                for (i = s.length; --i > -1;)for (n = s[i], r = i; --r > -1;)n === s[r] && s.splice(i, 1)
            } else for (s = H(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
            return s
        }, D.killTweensOf = D.killDelayedCallsTo = function (t, e, i) {
            "object" == typeof e && (i = e, e = !1);
            for (var s = D.getTweensOf(t, e), r = s.length; --r > -1;)s[r]._kill(i, t)
        };
        var et = y("plugins.TweenPlugin", function (t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = et.prototype
        }, !0);
        if (o = et.prototype, et.version = "1.19.0", et.API = 2, o._firstPT = null, o._addTween = B, o.setRatio = L, o._kill = function (t) {
                var e, i = this._overwriteProps, s = this._firstPT;
                if (null != t[this._propName]) this._overwriteProps = []; else for (e = i.length; --e > -1;)null != t[i[e]] && i.splice(e, 1);
                for (; s;)null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                return !1
            }, o._mod = o._roundProps = function (t) {
                for (var e, i = this._firstPT; i;)(e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next
            }, D._onPluginEvent = function (t, e) {
                var i, s, r, n, a, o = e._firstPT;
                if ("_onInitAllProps" === t) {
                    for (; o;) {
                        for (a = o._next, s = r; s && s.pr > o.pr;)s = s._next;
                        (o._prev = s ? s._prev : n) ? o._prev._next = o : r = o, (o._next = s) ? s._prev = o : n = o, o = a
                    }
                    o = e._firstPT = r
                }
                for (; o;)o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                return i
            }, et.activate = function (t) {
                for (var e = t.length; --e > -1;)t[e].API === et.API && (j[(new t[e])._propName] = t[e]);
                return !0
            }, v.plugin = function (t) {
                if (!(t && t.propName && t.init && t.API))throw"illegal plugin definition.";
                var e, i = t.propName, s = t.priority || 0, r = t.overwriteProps, n = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_mod",
                    mod: "_mod",
                    initAll: "_onInitAllProps"
                }, a = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                    et.call(this, i, s), this._overwriteProps = r || []
                }, !0 === t.global), o = a.prototype = new et(i);
                o.constructor = a, a.API = t.API;
                for (e in n)"function" == typeof t[e] && (o[n[e]] = t[e]);
                return a.version = t.version, et.activate([a]), a
            }, n = t._gsQueue) {
            for (a = 0; a < n.length; a++)n[a]();
            for (o in m)m[o].func || t.console.log("GSAP encountered missing dependency: " + o)
        }
        h = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
"use strict";
function content_swiper() {
    $(window).width() > 768 ? new Swiper(".large_swiper", {
        observer: !0,
        observeParents: !0,
        slidesPerView: "auto",
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        pagination: ".swiper-pagination",
        paginationClickable: !0
    }) : new Swiper(".small_swiper", {
        observer: !0,
        observeParents: !0,
        slidesPerView: "auto"
    }), new Swiper(".all_swiper", {
        loop: !0,
        autoplay: 5e3,
        speed: 1e3,
        observer: !0,
        observeParents: !0,
        slidesPerView: "auto",
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        pagination: ".swiper-pagination",
        paginationClickable: !0
    })
}
$(document).ready(function () {
    content_swiper(), $(".products-page .manage-list .collapse").on("show.bs.collapse", function () {
        $(this).parent().find(".col-title").addClass("active"), $(this).parent().find(".more h6 .before").html("-")
    }), $(".products-page .manage-list .collapse").on("hide.bs.collapse", function () {
        $(this).parent().find(".col-title").removeClass("active"), $(this).parent().find(".more h6 .before").html("+")
    }), $(".products-page .products-qa .collapse").on("show.bs.collapse", function () {
        $(this).parent().find(".title").addClass("active")
    }), $(".products-page .products-qa .collapse").on("hide.bs.collapse", function () {
        $(this).parent().find(".title").removeClass("active")
    }), $(".custom-img-button").click(function () {
        $(".custom-img-model").find(".custom-img").attr("src", $(this).data("img")), $(".custom-img-model").find(".custom-img").attr("width", "800px"), $(".custom-img-model").find(".custom-img").attr("height", "auto"), $(".custom-img-model").find(".custom-video").hide(), $(".custom-img-model").find(".custom-img").show(), $(".custom-img-model").modal()
    }), $(".custom-video-button").click(function () {
        var t = $(this).data("video");
        t !== $(".custom-img-model").find(".custom-video").attr("src") && $(".custom-img-model").find(".custom-video").attr("src", t), $(".custom-img-model").find(".custom-img").hide(), $(".custom-img-model").find(".custom-video").show(), $(".custom-img-model").modal()
    }), $(".custom-img-model").on("hide.bs.modal", function () {
        $(".custom-video").get(0).pause()
    }), $(".products-page .main-content .title").click(function () {
        $(this).hasClass("title-no-collapse") || ($(this).parent().find(".common-desc").is(":hidden") ? ($(this).parent().find(".common-desc").show(), $(this).parent().parent().next(".container").find(".manage-list-only").show(), $(this).parent().find(".title .before").show(), $(this).parent().find(".title .after").hide()) : ($(this).parent().find(".common-desc").hide(), $(this).parent().parent().next(".container").find(".manage-list-only").hide(), $(this).parent().find(".title .before").hide(), $(this).parent().find(".title .after").show()))
    }), $(".ask-question").click(function () {
        $("#liveagent_button_online_5737F000000cGcp").click()
    })
});
"use strict";
var backgroundAnimation = function (n, t, i) {
    function a(n) {
        var t = 0, i = 0;
        n.pageX || n.pageY ? (t = n.pageX - (document.body.scrollLeft + document.documentElement.scrollLeft), i = n.pageY - (document.body.scrollTop + document.documentElement.scrollTop)) : (n.clientX || n.clientY) && (t = n.clientX, i = n.clientY), w.x = t, w.y = i
    }

    function o() {
        $(document).scrollTop() > s / 2 && (f = !0)
    }

    function e() {
        s = $(i).length ? $(i).height() : $(window).height(), g = $(n).length ? $(n).width() : $(window).width(), m.width = g, m.height = s
    }

    function r() {
        if (f) {
            u.clearRect(0, 0, g, s);
            for (var n in v)Math.abs(h(w, v[n])) < 4e3 ? (v[n].active = .5, v[n].circle.active = .8) : Math.abs(h(w, v[n])) < 2e4 ? (v[n].active = .2, v[n].circle.active = .4) : Math.abs(h(w, v[n])) < 4e4 ? (v[n].active = .1, v[n].circle.active = .2) : (v[n].active = 0, v[n].circle.active = 0), l(v[n]), v[n].circle.draw()
        }
        requestAnimationFrame(r)
    }

    function c(n) {
        TweenLite.to(n, 1 + 1 * Math.random(), {
            x: n.originX - 50 + 100 * Math.random(),
            y: n.originY - 50 + 100 * Math.random(),
            ease: Circ.easeInOut,
            onComplete: function () {
                c(n)
            }
        })
    }

    function l(n) {
        if (n.active)for (var t in n.closest)u.beginPath(), u.moveTo(n.x, n.y), u.lineTo(n.closest[t].x, n.closest[t].y), u.strokeStyle = "rgba(3,178,165," + n.active + ")", u.stroke()
    }

    function d(n, t, i) {
        var a = this;
        a.pos = n || null, a.radius = t || null, a.color = i || null, this.draw = function () {
            a.active && (u.beginPath(), u.arc(a.pos.x, a.pos.y, a.radius, 0, 2 * Math.PI, !1), u.fillStyle = "rgba(253,85,0," + a.active + ")", u.fill())
        }
    }

    function h(n, t) {
        return Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2)
    }

    if (!$(n).length || !$(t).length)return !1;
    var g, s, m, u, v, w, f = !0;
    s = $(i).length ? $(i).height() : $(window).height(), g = $(n).length ? $(n).width() : $(window).width(), function () {
        w = {x: g / 2, y: s / 2}, (m = $(t)[0]).width = g, m.height = s, u = m.getContext("2d"), v = [];
        var n = 10;
        $(window).width() < 1024 && (n = 3);
        for (var i = 0; i < g; i += g / n)for (var a = 0; a < s; a += s / n) {
            var o = i + Math.random() * g / n, e = a + Math.random() * s / n, r = {x: o, originX: o, y: e, originY: e};
            v.push(r)
        }
        for (M = 0; M < v.length; M++) {
            for (var c = [], l = v[M], f = 0; f < v.length; f++) {
                var b = v[f];
                if (l != b) {
                    for (var p = !1, y = 0; y < 5; y++)p || void 0 == c[y] && (c[y] = b, p = !0);
                    for (y = 0; y < 5; y++)p || h(l, b) < h(l, c[y]) && (c[y] = b, p = !0)
                }
            }
            l.closest = c
        }
        for (var M in v) {
            var x = new d(v[M], 3 + 2 * Math.random(), "rgba(0,0,0,0.2)");
            v[M].circle = x
        }
    }(), function () {
        r();
        for (var n in v)c(v[n])
    }(), "ontouchstart" in window || (window.addEventListener("mousemove", a), window.addEventListener("taphold", a)), window.addEventListener("scroll", o), window.addEventListener("resize", e)
};
backgroundAnimation(".bg-animation-container", ".bg-animation-canvas", ".bg-animation-container"), backgroundAnimation(".bg-animation-container2", ".bg-animation-canvas2", ".bg-animation-container2"), backgroundAnimation(".bg-animation-container3", ".bg-animation-canvas3", ".bg-animation-container3"), backgroundAnimation(".animate-eco", "#bg-animation", ".animate-eco");




