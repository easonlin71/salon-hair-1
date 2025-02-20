/* nanogallery2 - v3.0.5 - 2021-01-06 */
/*!
 * @preserve nanogallery2 - javascript photo / video gallery and lightbox
 * Homepage: http://nanogallery2.nanostudio.org
 * Sources:  https://github.com/nanostudio-org/nanogallery2
 *
 * License:  GPLv3 and commercial licence
 * 
 * Requirements:
 *  - jQuery (http://www.jquery.com) - version >= 1.7.1
 *
 * Embeded components:
 *  - shifty (https://github.com/jeremyckahn/shifty)
 *  - imagesloaded (https://github.com/desandro/imagesloaded)
 *  - hammer.js (http://hammerjs.github.io/)
 *  - screenfull.js (https://github.com/sindresorhus/screenfull.js)
 * Tools:
 *  - webfont generated with http://fontello.com - mainly based on Font Awesome Copyright (C) 2012 by Dave Gandy (http://fontawesome.io/)
 *  - ICO online converter: https://iconverticons.com/online/
 */
! function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports && "function" == typeof require ? e(require("jquery")) : e(jQuery)
}((function (e) {
    "use strict";

    function t(e) {
        var t = document.getElementById("ngyColorHelperToRGB");
        return null === t && ((t = document.createElement("div")).id = "ngyColorHelperToRGB", t.style.cssText = "display: none; color:" + e + ";", document.body.appendChild(t)), getComputedStyle(t).color
    }

    function n(e, t, n) {
        var i = "";
        if ("RGBA(" == t.toUpperCase().substring(0, 5) && (i = "a", t = "rgb(" + t.substring(5)), "number" != typeof e || e < -1 || e > 1 || "string" != typeof t || "r" != t[0] && "#" != t[0] || "string" != typeof n && void 0 !== n) return null;

        function a(e) {
            var t = e.length,
                n = new Object;
            if (t > 9) {
                if ((e = e.split(",")).length < 3 || e.length > 4) return null;
                n[0] = o(e[0].slice(4)), n[1] = o(e[1]), n[2] = o(e[2]), n[3] = e[3] ? parseFloat(e[3]) : -1
            } else {
                if (8 == t || 6 == t || t < 4) return null;
                t < 6 && (e = "#" + e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + (t > 4 ? e[4] + "" + e[4] : "")), e = o(e.slice(1), 16), n[0] = e >> 16 & 255, n[1] = e >> 8 & 255, n[2] = 255 & e, n[3] = 9 == t || 5 == t ? r((e >> 24 & 255) / 255 * 1e4) / 1e4 : -1
            }
            return n
        }
        var o = parseInt,
            r = Math.round,
            l = t.length > 9,
            s = (l = "string" == typeof n ? n.length > 9 || "c" == n && !l : l, e < 0),
            u = (e = s ? -1 * e : e, n = n && "c" != n ? n : s ? "#000000" : "#FFFFFF", a(t)),
            c = a(n);
        return u && c ? l ? "rgb" + i + "(" + r((c[0] - u[0]) * e + u[0]) + "," + r((c[1] - u[1]) * e + u[1]) + "," + r((c[2] - u[2]) * e + u[2]) + (u[3] < 0 && c[3] < 0 ? ")" : "," + (u[3] > -1 && c[3] > -1 ? r(1e4 * ((c[3] - u[3]) * e + u[3])) / 1e4 : c[3] < 0 ? u[3] : c[3]) + ")") : "#" + (4294967296 + 16777216 * (u[3] > -1 && c[3] > -1 ? r(255 * ((c[3] - u[3]) * e + u[3])) : c[3] > -1 ? r(255 * c[3]) : u[3] > -1 ? r(255 * u[3]) : 255) + 65536 * r((c[0] - u[0]) * e + u[0]) + 256 * r((c[1] - u[1]) * e + u[1]) + r((c[2] - u[2]) * e + u[2])).toString(16).slice(u[3] > -1 || c[3] > -1 ? 1 : 3) : null
    }

    function i(e) {
        if (null === e || "object" != typeof e) return e;
        var t = e.constructor();
        for (var n in e) t[n] = i(e[n]);
        return t
    }

    function a() {
        var e = jQuery(window);
        return {
            l: e.scrollLeft(),
            t: e.scrollTop(),
            w: e.width(),
            h: e.height()
        }
    }

    function o(e, t) {
        var n = 0;
        "" == e && (e = "*"), jQuery(e).each((function () {
            var e = parseInt(jQuery(this).css("z-index"));
            n = e > n ? e : n
        })), n++, jQuery(t).css("z-index", n)
    }
    var r = function (e) {
        return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    };

    function l() {
        this.LightboxReOpen = function () {
            m()
        }, this.ReloadAlbum = function () {
            if ("" === u.O.kind) throw "Not supported for this content source:" + u.O.kind;
            var e = u.GOM.albumIdx;
            if (-1 == e) throw "Current album not found.";
            for (var t = u.I[e].GetID(), n = u.I.length, i = 0; i < n; i++) {
                var a = u.I[i];
                a.albumID == t && (a.selected = !1)
            }
            u.I[e].contentIsLoaded = !1, g("-1", t)
        }, this.ItemsSetSelectedValue = function (e, t) {
            for (var n = e.length, i = 0; i < n; i++) pe(e[i], t)
        }, this.ItemsSelectedGet = function () {
            for (var e = [], t = u.I.length, n = 0; n < t; n++) 1 == u.I[n].selected && e.push(u.I[n]);
            return e
        }, this.Get = function (e) {
            return u.O[e]
        }, this.Set = function (e, t) {
            switch (u.O[e] = t, e) {
                case "thumbnailSelectable":
                    de(), w(u.GOM.albumIdx)
            }
        }, this.Refresh = function () {
            w(u.GOM.albumIdx)
        }, this.Resize = function () {
            x()
        }, this.DisplayItem = function (e) {
            var t = p(e);
            "0" != t.imageID ? Q(t.imageID, t.albumID) : g("-1", t.albumID)
        }, this.ThumbnailToolbarOneCartUpdate = function (e) {
            R(e)
        };
        var l = function (e) {
            if (null == u.I[e]) return 0;
            for (var t = u.I[e].GetID(), n = u.I.length, i = 0, a = 0; a < n; a++) {
                u.I[a].isToDisplay(t) && i++
            }
            return i
        };
        this.Search = function (e) {
            u.GOM.albumSearch = e.toUpperCase();
            var t = u.GOM.albumIdx;
            return w(u.GOM.albumIdx), l(t)
        }, this.Search2 = function (e, t) {
            return u.GOM.albumSearch = null != e && null != e ? e.toUpperCase().trim() : "", u.GOM.albumSearchTags = null != t && null != t ? t.toUpperCase().trim() : "", l(u.GOM.albumIdx)
        }, this.Search2Execute = function () {
            var e = u.GOM.albumIdx;
            return w(u.GOM.albumIdx), l(e)
        }, this.Destroy = function () {
            null != u.GOM.hammertime && (u.GOM.hammertime.destroy(), u.GOM.hammertime = null), null != u.VOM.hammertime && (u.VOM.hammertime.destroy(), u.VOM.hammertime = null), e("#ngycs_" + u.baseEltID).remove(), u.GOM.items = [], NGY2Item.New(u, u.i18nTranslations.breadcrumbHome, "", "0", "-1", "album"), u.GOM.navigationBar.$newContent = null, u.$E.base.empty(), u.$E.base.removeData(), u.O.locationHash && jQuery(window).off("hashchange.nanogallery2." + u.baseEltID), jQuery(window).off("resize.nanogallery2." + u.baseEltID), jQuery(window).off("orientationChange.nanogallery2." + u.baseEltID), jQuery(window).off("scroll.nanogallery2." + u.baseEltID), null !== u.$E.scrollableParent && u.$E.scrollableParent.off("scroll.nanogallery2." + u.baseEltID), u.GOM.firstDisplay = !0
        }, this.CloseViewer = function () {
            return tt(null), !1
        }, this.MinimizeToolbar = function () {
            return We(), !1
        }, this.MaximizeToolbar = function () {
            return Ue(), !1
        }, this.PaginationPreviousPage = function () {
            return G(), !1
        }, this.PaginationNextPage = function () {
            return y(), !1
        }, this.PaginationGotoPage = function (e) {
            return e > 1 && e--, u.GOM.pagination.currentPage = e, u.GOM.ScrollToTop(), L(), E(!0), !1
        }, this.PaginationCountPages = function () {
            return 0 == u.GOM.items.length ? 0 : Math.ceil((u.GOM.items[u.GOM.items.length - 1].row + 1) / u.galleryMaxRows.Get())
        };
        var s = function (e, t, n) {
            var i;
            return function () {
                var a = this,
                    o = arguments;

                function r() {
                    n || e.apply(a, o), i = null
                }
                i ? clearTimeout(i) : n && e.apply(a, o), i = setTimeout(r, t || 100)
            }
        };
        window.ng_draf = function (e) {
            return requestAnimationFrame((function () {
                window.requestAnimationFrame(e)
            }))
        }, window.requestTimeout = function (e, t) {
            if (!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame)) return window.setTimeout(e, t);
            var n = (new Date).getTime(),
                i = new Object;
            return i.value = requestAnimFrame((function a() {
                (new Date).getTime() - n >= t ? e.call() : i.value = requestAnimFrame(a)
            })), i
        }, window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
            window.setTimeout(e, 1e3 / 60)
        }, window.clearRequestTimeout = function (e) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(e.value) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(e.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(e.value) : window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(e.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(e.value) : window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(e.value) : clearTimeout(e)
        };
        var u = this;

        function c(e) {
            this.$e = null, this.ngy2ItemIdx = e, this.mediaNumber = u.VOM.items.length + 1, this.posX = 0, this.posY = 0
        }
        u.I = [], u.Id = [], u.O = null, u.baseEltID = null, u.$E = {
            base: null,
            conTnParent: null,
            conLoadingB: null,
            conConsole: null,
            conNavigationBar: null,
            conTnBottom: null,
            scrollableParent: null
        }, u.shoppingCart = [], u.layout = {
            internal: !0,
            engine: "",
            support: {
                rows: !1
            },
            prerequisite: {
                imageSize: !1
            },
            SetEngine: function () {
                if (u.layout.internal) {
                    if ("auto" == u.tn.settings.width[u.GOM.curNavLevel][u.GOM.curWidth] || "" == u.tn.settings.width[u.GOM.curNavLevel][u.GOM.curWidth]) return u.layout.engine = "JUSTIFIED", u.layout.support.rows = !0, void(u.layout.prerequisite.imageSize = !0);
                    if ("auto" == u.tn.settings.height[u.GOM.curNavLevel][u.GOM.curWidth] || "" == u.tn.settings.height[u.GOM.curNavLevel][u.GOM.curWidth]) return u.layout.engine = "CASCADING", u.layout.support.rows = !1, void(u.layout.prerequisite.imageSize = !0);
                    if (null != u.tn.settings.getMosaic()) return u.layout.engine = "MOSAIC", u.layout.support.rows = !0, void(u.layout.prerequisite.imageSize = !1);
                    u.layout.engine = "GRID", u.layout.support.rows = !0, u.layout.prerequisite.imageSize = !1
                }
            }
        }, u.galleryResizeEventEnabled = !1, u.galleryMaxRows = {
            l1: 0,
            lN: 0,
            Get: function () {
                return u.galleryMaxRows[u.GOM.curNavLevel]
            }
        }, u.galleryMaxItems = {
            l1: 0,
            lN: 0,
            Get: function () {
                return u.galleryMaxItems[u.GOM.curNavLevel]
            }
        }, u.galleryFilterTags = {
            l1: 0,
            lN: 0,
            Get: function () {
                return u.galleryFilterTags[u.GOM.curNavLevel]
            }
        }, u.galleryFilterTagsMode = {
            l1: 0,
            lN: 0,
            Get: function () {
                return u.galleryFilterTagsMode[u.GOM.curNavLevel]
            }
        }, u.galleryDisplayMode = {
            l1: "FULLCONTENT",
            lN: "FULLCONTENT",
            Get: function () {
                return u.galleryDisplayMode[u.GOM.curNavLevel]
            }
        }, u.galleryLastRowFull = {
            l1: !1,
            lN: !1,
            Get: function () {
                return u.galleryLastRowFull[u.GOM.curNavLevel]
            }
        }, u.gallerySorting = {
            l1: "",
            lN: "",
            Get: function () {
                return u.gallerySorting[u.GOM.curNavLevel]
            }
        }, u.galleryDisplayTransition = {
            l1: "none",
            lN: "none",
            Get: function () {
                return u.galleryDisplayTransition[u.GOM.curNavLevel]
            }
        }, u.galleryDisplayTransitionDuration = {
            l1: 500,
            lN: 500,
            Get: function () {
                return u.galleryDisplayTransitionDuration[u.GOM.curNavLevel]
            }
        }, u.$currentTouchedThumbnail = null, u.tn = {
            opt: {
                l1: {
                    crop: !0,
                    stacks: 0,
                    stacksTranslateX: 0,
                    stacksTranslateY: 0,
                    stacksTranslateZ: 0,
                    stacksRotateX: 0,
                    stacksRotateY: 0,
                    stacksRotateZ: 0,
                    stacksScale: 0,
                    borderHorizontal: 0,
                    borderVertical: 0,
                    baseGridHeight: 0,
                    displayTransition: "FADEIN",
                    displayTransitionStartVal: 0,
                    displayTransitionEasing: "easeOutQuart",
                    displayTransitionDuration: 240,
                    displayInterval: 15
                },
                lN: {
                    crop: !0,
                    stacks: 0,
                    stacksTranslateX: 0,
                    stacksTranslateY: 0,
                    stacksTranslateZ: 0,
                    stacksRotateX: 0,
                    stacksRotateY: 0,
                    stacksRotateZ: 0,
                    stacksScale: 0,
                    borderHorizontal: 0,
                    borderVertical: 0,
                    baseGridHeight: 0,
                    displayTransition: "FADEIN",
                    displayTransitionStartVal: 0,
                    displayTransitionEasing: "easeOutQuart",
                    displayTransitionDuration: 240,
                    displayInterval: 15
                },
                Get: function (e) {
                    return u.tn.opt[u.GOM.curNavLevel][e]
                }
            },
            scale: 1,
            labelHeight: {
                l1: 0,
                lN: 0,
                get: function () {
                    return u.tn.labelHeight[u.GOM.curNavLevel]
                }
            },
            defaultSize: {
                width: {
                    l1: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0
                    },
                    lN: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0
                    }
                },
                height: {
                    l1: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0
                    },
                    lN: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0
                    }
                },
                getWidth: function () {
                    return u.tn.defaultSize.width[u.GOM.curNavLevel][u.GOM.curWidth]
                },
                getOuterWidth: function () {
                    u.tn.borderWidth = u.tn.opt.Get("borderHorizontal"), u.tn.borderHeight = u.tn.opt.Get("borderVertical");
                    var e = u.tn.defaultSize.width[u.GOM.curNavLevel][u.GOM.curWidth] + 2 * u.tn.opt.Get("borderHorizontal");
                    return "right" != u.O.thumbnailLabel.get("position") && "left" != u.O.thumbnailLabel.get("position") || (e += u.tn.defaultSize.width[u.GOM.curNavLevel][u.GOM.curWidth]), e
                },
                getHeight: function () {
                    return u.tn.defaultSize.height[u.GOM.curNavLevel][u.GOM.curWidth]
                },
                getOuterHeight: function () {
                    return u.tn.defaultSize.height[u.GOM.curNavLevel][u.GOM.curWidth] + 2 * u.tn.opt.Get("borderVertical")
                }
            },
            settings: {
                width: {
                    l1: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0,
                        xsc: "u",
                        smc: "u",
                        mec: "u",
                        lac: "u",
                        xlc: "u"
                    },
                    lN: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0,
                        xsc: "u",
                        smc: "u",
                        mec: "u",
                        lac: "u",
                        xlc: "u"
                    }
                },
                height: {
                    l1: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0,
                        xsc: "u",
                        smc: "u",
                        mec: "u",
                        lac: "u",
                        xlc: "u"
                    },
                    lN: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0,
                        xsc: "u",
                        smc: "u",
                        mec: "u",
                        lac: "u",
                        xlc: "u"
                    }
                },
                getH: function (e, t) {
                    var n = null == e ? u.GOM.curNavLevel : e,
                        i = null == t ? u.GOM.curWidth : t;
                    return "MOSAIC" == u.layout.engine ? this.height[n][i] * this.mosaic[n + "Factor"].h[i] : this.height[n][i]
                },
                getW: function (e, t) {
                    var n = null == e ? u.GOM.curNavLevel : e,
                        i = null == t ? u.GOM.curWidth : t;
                    return "MOSAIC" == u.layout.engine ? this.width[n][i] * this.mosaic[n + "Factor"].w[i] : this.width[n][i]
                },
                mosaic: {
                    l1: {
                        xs: null,
                        sm: null,
                        me: null,
                        la: null,
                        xl: null
                    },
                    lN: {
                        xs: null,
                        sm: null,
                        me: null,
                        la: null,
                        xl: null
                    },
                    l1Factor: {
                        h: {
                            xs: 1,
                            sm: 1,
                            me: 1,
                            la: 1,
                            xl: 1
                        },
                        w: {
                            xs: 1,
                            sm: 1,
                            me: 1,
                            la: 1,
                            xl: 1
                        }
                    },
                    lNFactor: {
                        h: {
                            xs: 1,
                            sm: 1,
                            me: 1,
                            la: 1,
                            xl: 1
                        },
                        w: {
                            xs: 1,
                            sm: 1,
                            me: 1,
                            la: 1,
                            xl: 1
                        }
                    }
                },
                getMosaic: function () {
                    return this.mosaic[u.GOM.curNavLevel][u.GOM.curWidth]
                },
                mosaicCalcFactor: function (e, t) {
                    for (var n = 1, i = 1, a = 0; a < u.tn.settings.mosaic[e][t].length; a++) n = Math.max(n, this.mosaic[e][t][a].w), i = Math.max(i, this.mosaic[e][t][a].h);
                    this.mosaic[e + "Factor"].h[t] = i, this.mosaic[e + "Factor"].w[t] = n
                },
                gutterHeight: {
                    l1: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0
                    },
                    lN: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0
                    }
                },
                gutterWidth: {
                    l1: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0
                    },
                    lN: {
                        xs: 0,
                        sm: 0,
                        me: 0,
                        la: 0,
                        xl: 0
                    }
                },
                GetResponsive: function (e) {
                    return this[e][u.GOM.curNavLevel][u.GOM.curWidth]
                }
            },
            hoverEffects: {
                std: [],
                level1: [],
                get: function () {
                    return "l1" == u.GOM.curNavLevel && 0 !== this.level1.length ? this.level1 : this.std
                }
            },
            buildInit: {
                std: [],
                level1: [],
                get: function () {
                    return "l1" == u.GOM.curNavLevel && 0 !== this.level1.length ? this.level1 : this.std
                }
            },
            toolbar: {
                album: {
                    topLeft: "",
                    topRight: "",
                    bottomLeft: "",
                    bottomRight: ""
                },
                image: {
                    topLeft: "",
                    topRight: "",
                    bottomLeft: "",
                    bottomRight: ""
                },
                albumUp: {
                    topLeft: "",
                    topRight: "",
                    bottomLeft: "",
                    bottomRight: ""
                },
                get: function (e) {
                    return this[e.kind]
                }
            },
            style: {
                l1: {
                    label: "",
                    title: "",
                    desc: ""
                },
                lN: {
                    label: "",
                    title: "",
                    desc: ""
                },
                getTitle: function () {
                    return 'style="' + this[u.GOM.curNavLevel].title + '"'
                },
                getDesc: function () {
                    return 'style="' + this[u.GOM.curNavLevel].desc + '"'
                },
                getLabel: function () {
                    var e = 'style="' + this[u.GOM.curNavLevel].label;
                    return e += u.O.RTL ? '"direction:RTL;"' : "", e += '"'
                }
            }
        }, u.scrollTimeOut = 0, u.i18nTranslations = {
            paginationPrevious: "Previous",
            paginationNext: "Next",
            breadcrumbHome: "List of Albums",
            thumbnailImageTitle: "",
            thumbnailAlbumTitle: "",
            thumbnailImageDescription: "",
            thumbnailAlbumDescription: ""
        }, u.emptyGif = "data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw==", u.CSStransformName = dt(["transform", "msTransform", "MozTransform", "WebkitTransform", "OTransform"]), u.CSStransformStyle = dt(["transformStyle", "msTransformStyle", "MozTransformStyle", "WebkitTransformStyle", "OTransformStyle"]), u.CSSperspective = dt(["perspective", "msPerspective", "MozPerspective", "WebkitPerspective", "OPerspective"]), u.CSSbackfaceVisibilityName = dt(["backfaceVisibility", "msBackfaceVisibility", "MozBackfaceVisibility", "WebkitBackfaceVisibility", "OBackfaceVisibility"]), u.CSStransitionName = dt(["transition", "msTransition", "MozTransition", "WebkitTransition", "OTransition"]), u.CSSanimationName = dt(["animation", "msAnimation", "MozAnimation", "WebkitAnimation", "OAnimation"]), u.GalleryResizeThrottled = function (e, t, n) {
            var i, a, o, r = null,
                l = 0;
            n || (n = {});
            var s = function () {
                l = !1 === n.leading ? 0 : (new Date).getTime(), r = null, o = e.apply(i, a), r || (i = a = null)
            };
            return function () {
                var u = (new Date).getTime();
                l || !1 !== n.leading || (l = u);
                var c = t - (u - l);
                return i = this, a = arguments, c <= 0 || c > t ? (r && (clearTimeout(r), r = null), l = u, o = e.apply(i, a), r || (i = a = null)) : r || !1 === n.trailing || (r = setTimeout(s, c)), o
            }
        }(x, 15, {
            leading: !1
        }), u.blockList = null, u.allowList = null, u.albumList = [], u.locationHashLastUsed = "", u.custGlobals = {}, u.touchAutoOpenDelayTimerID = 0, u.i18nLang = "", u.timeLastTouchStart = 0, u.custGlobals = {}, u.markupOrApiProcessed = !1, u.GOM = {
            albumIdx: -1,
            clipArea: {
                top: 0,
                height: 0
            },
            displayArea: {
                width: 0,
                height: 0
            },
            displayAreaLast: {
                width: 0,
                height: 0
            },
            displayedMoreSteps: 0,
            items: [],
            $imgPreloader: [],
            thumbnails2Display: [],
            itemsDisplayed: 0,
            firstDisplay: !0,
            firstDisplayTime: 0,
            navigationBar: {
                displayed: !1,
                $newContent: ""
            },
            cache: {
                viewport: null,
                containerOffset: null,
                areaWidth: 100
            },
            nbSelected: 0,
            pagination: {
                currentPage: 0
            },
            panThreshold: 60,
            panYOnly: !1,
            lastFullRow: -1,
            lastDisplayedIdx: -1,
            displayInterval: {
                from: 0,
                len: 0
            },
            hammertime: null,
            curNavLevel: "l1",
            curWidth: "me",
            albumSearch: "",
            albumSearchTags: "",
            lastZIndex: 0,
            lastRandomValue: 0,
            slider: {
                hostIdx: -1,
                hostItem: null,
                currentIdx: 0,
                nextIdx: 0,
                timerID: 0,
                tween: null
            },
            NGY2Item: function (e) {
                if (null == u.GOM.items[e] || null == u.GOM.items[e]) return null;
                var t = u.GOM.items[e].thumbnailIdx;
                return u.I[t]
            },
            GTn: function (e, t, n) {
                this.thumbnailIdx = e, this.width = 0, this.height = 0, this.top = 0, this.left = 0, this.row = 0, this.imageWidth = t, this.imageHeight = n, this.resizedContentWidth = 0, this.resizedContentHeight = 0, this.displayed = !1, this.neverDisplayed = !0, this.inDisplayArea = !1
            },
            ScrollToTop: function () {
                var e, t, n, i;
                if (!u.GOM.firstDisplay && (null !== u.$E.scrollableParent || (e = u.$E.base, t = 20, n = a(), (i = e.offset()).top >= n.t && i.top <= n.t + n.h - t) || u.$E.base.get(0).scrollIntoView(), null !== u.$E.scrollableParent)) {
                    var o = u.$E.scrollableParent.scrollTop(),
                        r = Math.abs(u.$E.scrollableParent.offset().top - u.$E.base.offset().top - o);
                    o > r && window.ng_draf((function () {
                        u.$E.scrollableParent.scrollTop(r)
                    }))
                }
            }
        }, u.VOM = {
            viewerDisplayed: !1,
            viewerIsFullscreen: !1,
            infoDisplayed: !1,
            toolbarsDisplayed: !0,
            toolsHide: null,
            zoom: {
                posX: 0,
                posY: 0,
                userFactor: 1,
                isZooming: !1
            },
            padding: {
                H: 0,
                V: 0
            },
            window: {
                lastWidth: 0,
                lastHeight: 0
            },
            $viewer: null,
            $toolbar: null,
            $toolbarTL: null,
            $toolbarTR: null,
            toolbarMode: "std",
            playSlideshow: !1,
            playSlideshowTimerID: 0,
            slideshowDelay: 3e3,
            albumID: -1,
            viewerMediaIsChanged: !1,
            items: [],
            panMode: "off",
            $baseCont: null,
            $content: null,
            content: {
                previous: {
                    vIdx: -1,
                    $media: null,
                    NGY2Item: function () {
                        return u.I[u.VOM.items[u.VOM.content.previous.vIdx].ngy2ItemIdx]
                    }
                },
                current: {
                    vIdx: -1,
                    $media: null,
                    NGY2Item: function () {
                        return u.I[u.VOM.items[u.VOM.content.current.vIdx].ngy2ItemIdx]
                    }
                },
                next: {
                    vIdx: -1,
                    $media: null,
                    NGY2Item: function () {
                        return u.I[u.VOM.items[u.VOM.content.next.vIdx].ngy2ItemIdx]
                    }
                }
            },
            IdxNext: function () {
                var e = 0;
                return u.VOM.content.current.vIdx < u.VOM.items.length - 1 && (e = u.VOM.content.current.vIdx + 1), e
            },
            IdxPrevious: function () {
                var e = u.VOM.content.current.vIdx - 1;
                return 0 == u.VOM.content.current.vIdx && (e = u.VOM.items.length - 1), e
            },
            gallery: {
                $elt: null,
                $tmbCont: null,
                gwidth: 0,
                vwidth: 0,
                oneTmbWidth: 0,
                firstDisplay: !0,
                posX: 0,
                SetThumbnailActive() {
                    "none" != u.O.viewerGallery && (this.$tmbCont.children().removeClass("activeVThumbnail"), this.$tmbCont.children().eq(u.VOM.content.current.vIdx).addClass("activeVThumbnail"), this.firstDisplay = !1)
                },
                Resize: function () {
                    if ("none" != u.O.viewerGallery)
                        if (this.firstDisplay)(new NGTweenable).tween({
                            from: {
                                opacity: 0
                            },
                            to: {
                                opacity: 1
                            },
                            easing: "easeInOutSine",
                            duration: 1e3,
                            step: function (e) {},
                            finish: function (e) {}
                        });
                        else {
                            var e = u.VOM.$viewer.width(),
                                t = Math.trunc(e / this.oneTmbWidth);
                            if (this.vwidth = t * this.oneTmbWidth, this.$elt.css({
                                    width: this.vwidth,
                                    left: (e - this.vwidth) / 2
                                }), u.VOM.items.length >= t) {
                                var n = this.oneTmbWidth * u.VOM.content.current.vIdx;
                                n + this.posX < this.vwidth ? n + this.posX < 0 && (this.posX = -n) : n + this.posX >= this.vwidth && (this.posX = this.vwidth - (n + this.oneTmbWidth))
                            }
                            this.PanGallery(0)
                        }
                },
                PanGallery: function (e) {
                    this.gwidth < u.VOM.$viewer.width() && (this.posX = (u.VOM.$viewer.width() - this.gwidth) / 2, e = 0), this.posX > this.vwidth - this.oneTmbWidth && (this.posX = this.vwidth - this.oneTmbWidth), this.posX + this.gwidth < this.oneTmbWidth && (this.posX = -this.gwidth + this.oneTmbWidth), this.$tmbCont.css(u.CSStransformName, "translateX(" + (this.posX + e) + "px)")
                },
                PanGalleryEnd: function (e) {
                    var t = 100 * e;
                    (new NGTweenable).tween({
                        from: {
                            pan: u.VOM.gallery.posX
                        },
                        to: {
                            pan: u.VOM.gallery.posX + t
                        },
                        easing: "easeOutQuad",
                        duration: 500,
                        step: function (e) {
                            u.VOM.gallery.posX = e.pan, u.VOM.gallery.PanGallery(0)
                        }
                    })
                }
            },
            hammertime: null,
            swipePosX: 0,
            panPosX: 0,
            panPosY: 0,
            panThreshold: 60,
            panXOnly: !1,
            singletapTime: 0,
            viewerTheme: "",
            timeImgChanged: 0,
            ImageLoader: {
                maxChecks: 1e3,
                list: [],
                intervalHandle: null,
                loadImage: function (e, t) {
                    if ("img" == t.mediaKind) {
                        var n = new Image;
                        if (n.src = t.responsiveURL(), n.width && n.height) e(n.width, n.height, t, 0);
                        else {
                            var i, a = {
                                image: n,
                                url: t.responsiveURL(),
                                ngitem: t,
                                callback: e,
                                checks: 1
                            };
                            for (i = 0; i < this.list.length && null != this.list[i]; i++);
                            this.list[i] = a, this.intervalHandle || (this.intervalHandle = setInterval(this.interval, 50))
                        }
                    }
                },
                interval: function () {
                    for (var e, t = 0, n = u.VOM.ImageLoader.list, i = 0; i < n.length; i++) null != (e = n[i]) && (e.image.width && e.image.height ? (u.VOM.ImageLoader.list[i] = null, e.callback(e.image.width, e.image.height, e.ngitem, e.checks)) : e.checks > u.VOM.ImageLoader.maxChecks ? (u.VOM.ImageLoader.list[i] = null, e.callback(0, 0, e.ngitem, e.checks)) : (t++, e.checks++));
                    0 == t && (u.VOM.ImageLoader.list = [], clearInterval(u.VOM.ImageLoader.intervalHandle), delete u.VOM.ImageLoader.intervalHandle)
                }
            }
        }, u.popup = {
            isDisplayed: !1,
            $elt: null,
            close: function () {
                null != this.$elt && (new NGTweenable).tween({
                    from: {
                        opacity: 1
                    },
                    to: {
                        opacity: 0
                    },
                    attachment: {
                        t: this
                    },
                    easing: "easeInOutSine",
                    duration: 100,
                    step: function (e, t) {
                        null != t.t.$elt && t.t.$elt.css("opacity", e.opacity)
                    },
                    finish: function (e, t) {
                        null != t.t.$elt && (t.t.$elt.remove(), t.t.$elt = null), t.t.isDisplayed = !1
                    }
                })
            }
        }, u.galleryTheme_dark = {
            navigationBar: {
                background: "none",
                borderTop: "",
                borderBottom: "",
                borderRight: "",
                borderLeft: ""
            },
            navigationBreadcrumb: {
                background: "#111",
                color: "#fff",
                colorHover: "#ccc",
                borderRadius: "4px"
            },
            navigationFilter: {
                color: "#ddd",
                background: "#111",
                colorSelected: "#fff",
                backgroundSelected: "#111",
                borderRadius: "4px"
            },
            navigationPagination: {
                background: "#111",
                color: "#fff",
                colorHover: "#ccc",
                borderRadius: "4px"
            },
            thumbnail: {
                background: "#444",
                backgroundImage: "linear-gradient(315deg, #111 0%, #445 90%)",
                borderColor: "#000",
                borderRadius: "0px",
                labelOpacity: 1,
                labelBackground: "rgba(34, 34, 34, 0)",
                titleColor: "#fff",
                titleBgColor: "transparent",
                titleShadow: "",
                descriptionColor: "#ccc",
                descriptionBgColor: "transparent",
                descriptionShadow: "",
                stackBackground: "#aaa"
            },
            thumbnailIcon: {
                padding: "5px",
                color: "#fff",
                shadow: ""
            },
            pagination: {
                background: "#181818",
                backgroundSelected: "#666",
                color: "#fff",
                borderRadius: "2px",
                shapeBorder: "3px solid #666",
                shapeColor: "#444",
                shapeSelectedColor: "#aaa"
            }
        }, u.galleryTheme_light = {
            navigationBar: {
                background: "none",
                borderTop: "",
                borderBottom: "",
                borderRight: "",
                borderLeft: ""
            },
            navigationBreadcrumb: {
                background: "#eee",
                color: "#000",
                colorHover: "#333",
                borderRadius: "4px"
            },
            navigationFilter: {
                background: "#eee",
                color: "#222",
                colorSelected: "#000",
                backgroundSelected: "#eee",
                borderRadius: "4px"
            },
            navigationPagination: {
                background: "#eee",
                color: "#000",
                colorHover: "#333",
                borderRadius: "4px"
            },
            thumbnail: {
                background: "#444",
                backgroundImage: "linear-gradient(315deg, #111 0%, #445 90%)",
                borderColor: "#000",
                labelOpacity: 1,
                labelBackground: "rgba(34, 34, 34, 0)",
                titleColor: "#fff",
                titleBgColor: "transparent",
                titleShadow: "",
                descriptionColor: "#ccc",
                descriptionBgColor: "transparent",
                descriptionShadow: "",
                stackBackground: "#888"
            },
            thumbnailIcon: {
                padding: "5px",
                color: "#fff"
            },
            pagination: {
                background: "#eee",
                backgroundSelected: "#aaa",
                color: "#000",
                borderRadius: "2px",
                shapeBorder: "3px solid #666",
                shapeColor: "#444",
                shapeSelectedColor: "#aaa"
            }
        }, u.viewerTheme_dark = {
            background: "#000",
            barBackground: "rgba(4, 4, 4, 0.2)",
            barBorder: "0px solid #111",
            barColor: "#fff",
            barDescriptionColor: "#ccc"
        }, u.viewerTheme_light = {
            background: "#f8f8f8",
            barBackground: "rgba(4, 4, 4, 0.7)",
            barBorder: "0px solid #111",
            barColor: "#fff",
            barDescriptionColor: "#ccc"
        };
        var h = NGY2Tools.NanoAlert,
            d = NGY2Tools.NanoConsoleLog;

        function m() {
            u.VOM.items = [], u.VOM.albumID = "0", u.GOM.curNavLevel = "l1";
            var e = 0,
                t = u.$E.base[0].attributes,
                n = "";
            t.hasOwnProperty("src") && (n = t.src.nodeValue), "" == n && t.hasOwnProperty("data-ngthumb") && (n = t["data-ngthumb"].nodeValue);
            for (var i = void 0, a = 0; a < u.I.length; a++)
                if ("image" == u.I[a].kind) {
                    var o = new c(a);
                    u.VOM.items.push(o), u.I[a].thumbImg().src == n && (i = e), e++
                } u.VOM.items.length > 0 ? De(i) : d(u, "No content for Lightbox standalone.")
        }

        function p(e) {
            var t = {
                    albumID: "0",
                    imageID: "0"
                },
                n = e.split("/");
            return n.length > 0 && (t.albumID = n[0], n.length > 1 && (t.imageID = n[1])), t
        }

        function g(e, t) {
            u.VOM.viewerDisplayed && tt(null);
            var n = NGY2Item.GetIdx(u, t);
            u.GOM.curNavLevel = "lN", 0 == n && (u.GOM.curNavLevel = "l1"), u.layout.SetEngine(), u.galleryResizeEventEnabled = !1, -1 == n && (NGY2Item.New(u, "", "", t, "0", "album"), n = u.I.length - 1), u.I[n].contentIsLoaded ? (de(), u.GOM.pagination.currentPage = 0, rt(t, ""), w(n)) : q(t, g, e, t)
        }

        function f() {
            switch (u.galleryDisplayMode.Get()) {
                case "PAGINATION":
                    u.layout.support.rows && u.galleryMaxRows.Get() > 0 && function () {
                        if (u.$E.conTnBottom.css("opacity", 0), u.$E.conTnBottom.children().remove(), 0 == u.GOM.items.length) return;
                        var e = Math.ceil((u.GOM.items[u.GOM.items.length - 1].row + 1) / u.galleryMaxRows.Get());
                        if (1 == e) return;
                        u.GOM.pagination.currentPage > e - 1 && (u.GOM.pagination.currentPage = e - 1);
                        if (M(), 0 == u.GOM.displayInterval.len) return;
                        if ("NUMBERS" == u.O.galleryPaginationMode && u.GOM.pagination.currentPage > 0) {
                            jQuery('<div class="nGY2PaginationPrev">' + u.O.icons.paginationPrevious + "</div>").appendTo(u.$E.conTnBottom).click((function (e) {
                                G()
                            }))
                        }
                        var t = 0,
                            n = e;
                        if ("NUMBERS" != u.O.galleryPaginationMode) t = 0;
                        else {
                            var i = u.O.paginationVisiblePages;
                            if (i >= e) t = 0;
                            else {
                                var a = 0;
                                a = i % 2 == 1 ? (i + 1) / 2 : i / 2, u.GOM.pagination.currentPage < a ? (t = 0, (n = i - 1) > e && (n = e - 1)) : (t = u.GOM.pagination.currentPage - a, (n = t + i) > e && (n = e - 1)), n - t < i && (t = n - i) < 0 && (t = 0)
                            }
                        }
                        for (var o = t; o < n; o++) {
                            var r = "",
                                l = "";
                            switch (u.O.galleryPaginationMode) {
                                case "NUMBERS":
                                    r = "nGY2paginationItem", l = o + 1;
                                    break;
                                case "DOTS":
                                    r = "nGY2paginationDot";
                                    break;
                                case "RECTANGLES":
                                    r = "nGY2paginationRectangle"
                            }
                            o == u.GOM.pagination.currentPage && (r += "CurrentPage");
                            var s = jQuery('<div class="' + r + '">' + l + "</div>").appendTo(u.$E.conTnBottom);
                            s.data("pageNumber", o), s.click((function (e) {
                                u.GOM.pagination.currentPage = jQuery(this).data("pageNumber"), at("pageChanged"), u.GOM.ScrollToTop(), L(), E(!0)
                            }))
                        }
                        if ("NUMBERS" == u.O.galleryPaginationMode && u.GOM.pagination.currentPage + 1 < e) {
                            jQuery('<div class="nGY2PaginationNext">' + u.O.icons.paginationNext + "</div>").appendTo(u.$E.conTnBottom).click((function (e) {
                                y()
                            }))
                        }
                        u.$E.conTnBottom.css("opacity", 1)
                    }();
                    break;
                case "MOREBUTTON":
                    u.$E.conTnBottom.off("click");
                    var e = u.GOM.items.length - u.GOM.itemsDisplayed;
                    0 == e ? u.$E.conTnBottom.empty() : (u.$E.conTnBottom.html('<div class="nGY2GalleryMoreButton"><div class="nGY2GalleryMoreButtonAnnotation">+' + e + " " + u.O.icons.galleryMoreButton + "</div></div>"), u.$E.conTnBottom.on("click", (function (e) {
                        u.GOM.displayedMoreSteps++, x()
                    })))
            }
        }

        function b(e) {
            var t = "";
            u.O.breadcrumbHideIcons || (t = u.O.icons.breadcrumbAlbum, 0 == e && (t = u.O.icons.breadcrumbHome));
            var n = jQuery('<div class="oneItem">' + t + u.I[e].title + "</div>").appendTo(u.GOM.navigationBar.$newContent.find(".nGY2Breadcrumb"));
            u.O.breadcrumbOnlyCurrentLevel ? 0 == e ? jQuery(n).data("albumID", "0") : jQuery(n).data("albumID", u.I[e].albumID) : jQuery(n).data("albumID", u.I[e].GetID()), n.click((function () {
                g("-1", jQuery(this).data("albumID"))
            }))
        }

        function v(e) {
            var t = jQuery('<div class="oneItem">' + (u.O.RTL ? u.O.icons.breadcrumbSeparatorRtl : u.O.icons.breadcrumbSeparator) + "</div>").appendTo(u.GOM.navigationBar.$newContent.find(".nGY2Breadcrumb"));
            jQuery(t).data("albumIdx", e), t.click((function () {
                var e = jQuery(this).data("albumIdx");
                g("-1", u.I[e].GetID())
            }))
        }

        function O(e) {
            if (u.GOM.navigationBar.$newContent = jQuery('<div class="nGY2Navigationbar"></div>'), 1 == u.O.displayBreadcrumb && !u.O.thumbnailAlbumDisplayImage) {
                var t = 0,
                    n = [];
                if (0 != e) {
                    var i = u.I.length;
                    n.push(e);
                    var a = e;
                    for (t++; 0 != u.I[a].albumID && -1 != u.I[a].albumID;)
                        for (var o = 1; o < i; o++)
                            if (u.I[o].GetID() == u.I[a].albumID) {
                                a = o, n.push(a), t++;
                                break
                            }
                }
                u.O.breadcrumbAutoHideTopLevel && 0 == t || function (e) {
                    if (jQuery('<div class="nGY2NavigationbarItem nGY2Breadcrumb"></div>').appendTo(u.GOM.navigationBar.$newContent), u.O.breadcrumbOnlyCurrentLevel) 0 == e.length ? b(0) : (1 == e.length ? v(0) : v(e[0]), b(e[0]));
                    else if (b(0), e.length > 0) {
                        v(0);
                        for (var t = e.length - 1; t >= 0; t--) b(e[t]), t > 0 && v(e[t - 1])
                    }
                }(n)
            }
            if (0 != u.galleryFilterTags.Get()) {
                var r = u.I[e].albumTagList.length;
                if (r > 0) {
                    for (o = 0; o < r; o++) {
                        var l = u.I[e].albumTagList[o],
                            s = u.O.icons.navigationFilterUnselected,
                            c = "Unselected";
                        jQuery.inArray(l, u.I[e].albumTagListSel) >= 0 && (c = "Selected", s = u.O.icons.navigationFilterSelected), jQuery('<div class="nGY2NavigationbarItem nGY2NavFilter' + c + '">' + s + " " + l + "</div>").appendTo(u.GOM.navigationBar.$newContent).click((function () {
                            var t = jQuery(this),
                                n = t.text().replace(/^\s*|\s*$/, "");
                            if ("single" == u.galleryFilterTagsMode.Get()) u.I[e].albumTagListSel = [], u.I[e].albumTagListSel.push(n);
                            else {
                                if (t.hasClass("nGY2NavFilterUnselected")) u.I[e].albumTagListSel.push(n);
                                else {
                                    var i = jQuery.inArray(n, u.I[e].albumTagListSel); - 1 != i && u.I[e].albumTagListSel.splice(i, 1)
                                }
                                t.toggleClass("nGY2NavFilters-oneTagUnselected nGY2NavFilters-oneTagSelected")
                            }
                            g("-1", u.I[e].GetID())
                        }))
                    }
                    jQuery('<div class="nGY2NavigationbarItem nGY2NavFilterSelectAll">' + u.O.icons.navigationFilterSelectedAll + "</div>").appendTo(u.GOM.navigationBar.$newContent).click((function () {
                        u.I[e].albumTagListSel = [], g("-1", u.I[e].GetID())
                    }))
                }
            }
            "PAGINATION" == u.galleryDisplayMode.Get() && u.O.galleryPaginationTopButtons && (u.layout.support.rows && u.galleryMaxRows.Get() > 0 && (jQuery('<div class="nGY2NavigationbarItem nGY2NavPagination">' + u.O.icons.navigationPaginationPrevious + "</div>").appendTo(u.GOM.navigationBar.$newContent).click((function () {
                G()
            })), jQuery('<div class="nGY2NavigationbarItem nGY2NavPagination">' + u.O.icons.navigationPaginationNext + "</div>").appendTo(u.GOM.navigationBar.$newContent).click((function () {
                y()
            }))))
        }

        function y() {
            var e = 0;
            j(), u.galleryMaxRows.Get() > 0 && (e = (u.GOM.items[u.GOM.items.length - 1].row + 1) / u.galleryMaxRows.Get());
            var t = Math.ceil(e),
                n = u.GOM.pagination.currentPage;
            n < t - 1 ? n++ : n = 0, u.GOM.pagination.currentPage = n, at("pageChanged"), u.GOM.ScrollToTop(), L(), E(!0)
        }

        function G() {
            var e = 0;
            j(), u.galleryMaxRows.Get() > 0 && (e = (u.GOM.items[u.GOM.items.length - 1].row + 1) / u.galleryMaxRows.Get());
            var t = Math.ceil(e),
                n = u.GOM.pagination.currentPage;
            n > 0 ? n-- : n = t - 1, u.GOM.pagination.currentPage = n, at("pageChanged"), u.GOM.ScrollToTop(), L(), E(!0)
        }

        function M() {
            switch (u.GOM.displayInterval.from = 0, u.GOM.displayInterval.len = u.I.length, u.galleryDisplayMode.Get()) {
                case "PAGINATION":
                    if (u.layout.support.rows) {
                        let a = u.GOM.items.length;
                        var e = u.GOM.pagination.currentPage * u.galleryMaxRows.Get(),
                            t = e + u.galleryMaxRows.Get(),
                            n = -1;
                        u.GOM.displayInterval.len = 0;
                        for (var i = 0; i < a; i++) {
                            let a = u.GOM.items[i];
                            a.row >= e && a.row < t && (-1 == n && (u.GOM.displayInterval.from = i, n = i), u.GOM.displayInterval.len++)
                        }
                    }
                    break;
                case "MOREBUTTON":
                    if (u.layout.support.rows) {
                        let e = u.GOM.items.length,
                            t = u.O.galleryDisplayMoreStep * (u.GOM.displayedMoreSteps + 1);
                        u.GOM.displayInterval.len = 0;
                        for (i = 0; i < e; i++) {
                            u.GOM.items[i].row < t && u.GOM.displayInterval.len++
                        }
                    }
                    break;
                case "ROWS":
                    if (u.layout.support.rows) {
                        let e = u.GOM.items.length,
                            t = u.galleryMaxRows.Get();
                        u.galleryLastRowFull.Get() && -1 != u.GOM.lastFullRow && t > u.GOM.lastFullRow + 1 && (t = u.GOM.lastFullRow + 1), u.GOM.displayInterval.len = 0;
                        for (i = 0; i < e; i++) {
                            u.GOM.items[i].row < t && u.GOM.displayInterval.len++
                        }
                    }
                    break;
                default:
                case "FULLCONTENT":
                    if (u.layout.support.rows && u.galleryLastRowFull.Get() && -1 != u.GOM.lastFullRow) {
                        let e = u.GOM.items.length,
                            t = u.GOM.lastFullRow + 1;
                        u.GOM.displayInterval.len = 0;
                        for (i = 0; i < e; i++) {
                            u.GOM.items[i].row < t && u.GOM.displayInterval.len++
                        }
                    }
            }
        }

        function w(e) {
            at("galleryRenderStart"), clearTimeout(u.GOM.slider.timerID), u.GOM.slider.hostIdx = -1;
            var t = u.O.fnGalleryRenderStart;
            if (null !== t && ("function" == typeof t ? t(u.I[u.GOM.albumIdx]) : window[t](u.I[u.GOM.albumIdx])), u.layout.SetEngine(), u.galleryResizeEventEnabled = !1, u.GOM.albumIdx = -1, u.GOM.lastDisplayedIdx = -1, void 0 !== u.$E.conTnBottom && u.$E.conTnBottom.empty(), O(e), u.GOM.firstDisplay) {
                u.GOM.firstDisplay = !1;
                var n = Date.now() - u.GOM.firstDisplayTime;
                n < u.O.galleryRenderDelay ? requestTimeout((function () {
                    I(e)
                }), u.O.galleryRenderDelay - n) : I(e), u.O.galleryRenderDelay = 0
            } else {
                var i = !1;
                0 == u.GOM.navigationBar.$newContent.children().length && (i = !0), (new NGTweenable).tween({
                    from: {
                        opacity: 1
                    },
                    to: {
                        opacity: 0
                    },
                    duration: 300,
                    easing: "easeInQuart",
                    attachment: {
                        h: i
                    },
                    step: function (e, t) {
                        u.$E.conTnParent.css({
                            opacity: e.opacity
                        }), t.h && u.$E.conNavigationBar.css({
                            opacity: e.opacity
                        })
                    },
                    finish: function (t, n) {
                        n.h && u.$E.conNavigationBar.css({
                            opacity: 0,
                            display: "none"
                        }), u.GOM.ScrollToTop(), I(e)
                    }
                })
            }
        }

        function I(e) {
            var t = u.$E.conNavigationBar.children().length;
            (u.$E.conNavigationBar.empty(), u.GOM.navigationBar.$newContent.children().clone(!0, !0).appendTo(u.$E.conNavigationBar), u.$E.conNavigationBar.children().length > 0 && 0 == t) ? (u.$E.conNavigationBar.css({
                opacity: 0,
                display: "block"
            }), (new NGTweenable).tween({
                from: {
                    opacity: 0
                },
                to: {
                    opacity: 1
                },
                duration: 200,
                easing: "easeInQuart",
                step: function (e) {
                    u.$E.conNavigationBar.css(e)
                },
                finish: function (t) {
                    u.$E.conNavigationBar.css({
                        opacity: 1
                    }), requestTimeout((function () {
                        T(e)
                    }), 20)
                }
            })) : requestTimeout((function () {
                T(e)
            }), 20)
        }

        function T(e) {
            u.GOM.lastZIndex = parseInt(u.$E.base.css("z-index")), isNaN(u.GOM.lastZIndex) && (u.GOM.lastZIndex = 0), u.$E.conTnParent.css({
                opacity: 0
            }), u.$E.conTn.off().empty();
            for (var t = u.I.length, n = 0; n < t; n++) {
                var i = u.I[n];
                i.hovered = !1, i.$elt = null, i.$Elts = [], i.eltTransform = [], i.eltFilter = [], i.width = 0, i.height = 0, i.left = 0, i.top = 0, i.resizedContentWidth = 0, i.resizedContentHeight = 0, i.thumbnailImgRevealed = !1
            }
            null == u.CSStransformName ? u.$E.conTn.css("left", "0px") : u.$E.conTn.css(u.CSStransformName, "none"), requestTimeout((function () {
                ! function (e) {
                    var t = new Date;
                    u.$E.conTnParent.css("opacity", 1), u.GOM.items = [], u.GOM.displayedMoreSteps = 0, "onBottom" == u.O.thumbnailLabel.get("position") ? u.tn.labelHeight[u.GOM.curNavLevel] = function () {
                        var e = [],
                            t = 0;
                        if (0 == u.O.thumbnailLabel.get("display")) return 0;
                        e[t++] = '<div class="nGY2GThumbnail ' + u.O.theme + '" style="display:block;visibility:hidden;position:absolute;top:-9999px;left:-9999px;" ><div class="nGY2GThumbnailSub">', 1 == u.O.thumbnailLabel.get("display") && (e[t++] = '  <div class="nGY2GThumbnailLabel" ' + u.tn.style.getLabel() + ">", e[t++] = '    <div class="nGY2GThumbnailAlbumTitle" ' + u.tn.style.getTitle() + ">aAzZjJ</div>", 1 == u.O.thumbnailLabel.get("displayDescription") && (e[t++] = '    <div class="nGY2GThumbnailDescription" ' + u.tn.style.getDesc() + ">aAzZjJ</div>"), e[t++] = "  </div>");
                        e[t++] = "</div></div>";
                        var n = jQuery(e.join("")).appendTo(u.$E.conTn),
                            i = n.find(".nGY2GThumbnailLabel").outerHeight(!0);
                        return n.remove(), i
                    }() : u.tn.labelHeight[u.GOM.curNavLevel] = 0;
                    u.GOM.albumIdx = e, at("galleryRenderEnd");
                    var n = u.O.fnGalleryRenderEnd;
                    null !== n && ("function" == typeof n ? n(u.I[u.GOM.albumIdx]) : window[n](u.I[u.GOM.albumIdx]));
                    ! function () {
                        for (var e = "", t = u.I[u.GOM.albumIdx].GetID(), n = u.I.length, i = 0, a = 0; a < n; a++) {
                            var o = u.I[a];
                            if (o.isToDisplay(t)) {
                                var r = o.thumbImg().width,
                                    l = o.thumbImg().height;
                                !u.layout.prerequisite.imageSize || 0 != r && 0 != l || (e += '<img src="' + o.thumbImg().src + '" data-idx="' + i + '" data-albumidx="' + u.GOM.albumIdx + '">'), 0 == l && (l = u.tn.defaultSize.getHeight()), 0 == r && (r = u.tn.defaultSize.getWidth());
                                var s = new u.GOM.GTn(a, r, l);
                                u.GOM.items.push(s), i++
                            }
                        }
                        at("galleryObjectModelBuilt");
                        var c = u.O.fnGalleryObjectModelBuilt;
                        null !== c && ("function" == typeof c ? c() : window[c]());
                        if ("" != e) {
                            var h = jQuery(e),
                                d = ngimagesLoaded(h);
                            return h = null, d.on("progress", (function (e, t) {
                                if (t.isLoaded) {
                                    var n = t.img.getAttribute("data-idx");
                                    if (t.img.getAttribute("data-albumidx") == u.GOM.albumIdx) {
                                        var i = u.GOM.items[n];
                                        i.imageWidth = t.img.naturalWidth, i.imageHeight = t.img.naturalHeight;
                                        var a = u.I[i.thumbnailIdx];
                                        a.thumbs.width[u.GOM.curNavLevel][u.GOM.curWidth] = i.imageWidth, a.thumbs.height[u.GOM.curNavLevel][u.GOM.curWidth] = i.imageHeight, u.GalleryResizeThrottled();
                                        var o = a.thumbs.width.l1;
                                        for (let e in o) o.hasOwnProperty(e) && e != u.GOM.curWidth && u.tn.settings.width.l1[e] == u.tn.settings.getW() && u.tn.settings.height.l1[e] == u.tn.settings.getH() && (a.thumbs.width.l1[e] = i.imageWidth, a.thumbs.height.l1[e] = i.imageHeight);
                                        o = a.thumbs.width.lN;
                                        for (let e in o) o.hasOwnProperty(e) && e != u.GOM.curWidth && u.tn.settings.width.lN[e] == u.tn.settings.getW() && u.tn.settings.height.lN[e] == u.tn.settings.getH() && (a.thumbs.width.lN[e] = i.imageWidth, a.thumbs.height.lN[e] = i.imageHeight)
                                    }
                                }
                            })), u.galleryResizeEventEnabled = !0, !1
                        }
                        return !0
                    }() ? u.galleryResizeEventEnabled = !0: (S(), function () {
                        var e = u.galleryDisplayTransitionDuration.Get();
                        switch (u.galleryDisplayTransition.Get()) {
                            case "ROTATEX":
                                u.$E.base.css({
                                    perspective: "1000px",
                                    "perspective-origin": "50% 0%"
                                }), (new NGTweenable).tween({
                                    from: {
                                        r: 50
                                    },
                                    to: {
                                        r: 0
                                    },
                                    attachment: {
                                        orgIdx: u.GOM.albumIdx
                                    },
                                    duration: e,
                                    easing: "easeOutCirc",
                                    step: function (e, t) {
                                        t.orgIdx == u.GOM.albumIdx && u.$E.conTnParent.css(u.CSStransformName, "rotateX(" + e.r + "deg)")
                                    }
                                });
                                break;
                            case "SLIDEUP":
                                u.$E.conTnParent.css({
                                    opacity: 0
                                }), (new NGTweenable).tween({
                                    from: {
                                        y: 200,
                                        o: 0
                                    },
                                    to: {
                                        y: 0,
                                        o: 1
                                    },
                                    attachment: {
                                        orgIdx: u.GOM.albumIdx
                                    },
                                    duration: e,
                                    easing: "easeOutCirc",
                                    step: function (e, t) {
                                        t.orgIdx == u.GOM.albumIdx && u.$E.conTnParent.css(u.CSStransformName, "translate( 0px, " + e.y + "px)").css("opacity", e.o)
                                    }
                                })
                        }
                    }(), L(), requestTimeout((function () {
                        E(!1)
                    }), 20));
                    u.O.debugMode && console.log("GalleryRenderPart3: " + (new Date - t))
                }(e)
            }), 20)
        }

        function x() {
            var e = new Date;
            if (u.galleryResizeEventEnabled = !1, 0 == S()) return u.galleryResizeEventEnabled = !0, void(u.O.debugMode && console.log("GalleryResize1: " + (new Date - e)));
            u.O.debugMode && console.log("GalleryResizeSetLayout: " + (new Date - e)), L(), E(!1), u.O.debugMode && console.log("GalleryResizeFull: " + (new Date - e))
        }

        function S() {
            var e = !0;
            switch (u.GOM.cache.areaWidth = u.$E.conTnParent.width(), u.GOM.displayArea = {
                width: 0,
                height: 0
            }, u.layout.engine) {
                case "JUSTIFIED":
                    e = function () {
                        for (var e = 0, t = u.GOM.cache.areaWidth, n = 0, i = 0, a = [], o = 0, r = [], l = !1, s = u.tn.settings.GetResponsive("gutterWidth"), c = u.tn.settings.GetResponsive("gutterHeight"), h = 0, d = 0, m = !1, p = !1, g = u.tn.defaultSize.getOuterHeight(), f = 2 * u.tn.opt.Get("borderHorizontal"), b = 2 * u.tn.opt.Get("borderVertical"), v = 1, O = u.GOM.items.length, y = 0; y < O; y++) {
                            let n = u.GOM.items[y];
                            if (1 == n.deleted) break;
                            if (n.imageWidth > 0) {
                                let i = n.imageWidth / n.imageHeight,
                                    u = Math.floor(g * i);
                                if (l && (l = !1, o++, e = 0, m = !1, p = !1, v = 1), n.imageHeight > n.imageWidth ? m = !0 : p = !0, e + s + u < t - v * f) {
                                    e += u + s, r[o] = g;
                                    var G = Math.max(m ? h : 0, p ? d : 0);
                                    G > 0 && (r[o] = Math.min(r[o], G)), a[o] = y
                                } else {
                                    let n = (t - v * f) / (e += s + u),
                                        i = Math.floor(g * n);
                                    r[o] = i, m && (h = Math.max(h, i)), p && (d = Math.max(d, i)), a[o] = y, l = !0
                                }
                                v++
                            }
                        }
                        o = 0, i = 0, n = 0, 0, u.GOM.lastFullRow = 0;
                        for (y = 0; y < O; y++) {
                            let e = u.GOM.items[y];
                            if (!(e.imageWidth > 0)) return !1; {
                                let l = e.imageWidth / e.imageHeight,
                                    h = Math.floor(l * r[o]);
                                y == a[o] && (a.length != o + 1 || n + s + h + f > t) && (h = t - n - f);
                                let d = parseInt(r[o]);
                                h = parseInt(h), e.resizedContentWidth = h, e.resizedContentHeight = d, e.width = h + f, e.height = d + u.tn.labelHeight.get() + b, e.row = o, e.top = i;
                                let m = n;
                                u.O.RTL && (m = t - n - e.width), e.left = m, n += e.width + s, y == a[o] && (i += e.height + c, u.GOM.lastFullRow = o - 1, o++, n = 0)
                            }
                        }
                        return u.GOM.displayArea.width = t, !0
                    }();
                    break;
                case "CASCADING":
                    e = function () {
                        var e = 0,
                            t = u.GOM.cache.areaWidth,
                            n = 0,
                            i = [],
                            a = z(t),
                            o = 0,
                            r = u.tn.settings.GetResponsive("gutterHeight"),
                            l = 1,
                            s = u.tn.defaultSize.getOuterWidth(),
                            c = u.GOM.items.length,
                            h = 0;
                        "justified" == u.O.thumbnailAlignment ? (a = Math.min(a, c), o = 1 == a ? 0 : (t - a * s) / (a - 1)) : o = u.tn.settings.GetResponsive("gutterWidth");
                        var d = 2 * u.tn.opt.Get("borderHorizontal"),
                            m = 2 * u.tn.opt.Get("borderVertical");
                        if (u.GOM.lastFullRow = -1, "fillWidth" == u.O.thumbnailAlignment) {
                            var p = (a - 1) * o;
                            (l = (t - p) / (a * s)) > 1 && a++, p = (a - 1) * o, l = Math.min((t - p) / (a * s), 1)
                        }
                        for (var g = (s = Math.round(s * l)) - d, f = Math.round(u.tn.opt.Get("baseGridHeight") * l), b = 0; b < c; b++) {
                            var v = u.GOM.items[b];
                            if (1 == v.deleted) break;
                            if (v.imageHeight > 0 && v.imageWidth > 0) {
                                var O = 0,
                                    y = (h = 0, v.imageHeight / v.imageWidth);
                                if (v.resizedContentWidth = g, v.resizedContentHeight = v.resizedContentWidth * y, f > 0) {
                                    var G = Math.max(Math.trunc(v.resizedContentHeight / f), 1);
                                    v.resizedContentHeight = f * G + (G - 1) * (m + r)
                                }
                                if (v.height = v.resizedContentHeight + m + u.tn.labelHeight.get(), v.width = s, v.row = 0, 0 == n) O = e * (s + o), i[e] = v.height + r, ++e >= a && (e = 0, n++);
                                else {
                                    for (var M = 0, w = i[0], I = 1; I < a; I++) i[I] + 5 < w && (w = i[I], M = I);
                                    h = i[M], O = M * (s + o), i[M] = h + v.height + r
                                }
                                var T = O;
                                u.O.RTL && (T = 0 - O - s), v.left = T, v.top = h
                            }
                        }
                        return u.GOM.displayArea.width = a * (s + o) - o, !0
                    }();
                    break;
                case "MOSAIC":
                    e = function () {
                        var e = u.GOM.cache.areaWidth,
                            t = u.tn.settings.GetResponsive("gutterHeight"),
                            n = u.tn.settings.GetResponsive("gutterWidth"),
                            i = 2 * u.tn.opt.Get("borderHorizontal"),
                            a = 2 * u.tn.opt.Get("borderVertical"),
                            o = u.GOM.items.length,
                            r = 0,
                            l = 0,
                            s = 0,
                            c = 0,
                            h = 0;
                        let d = u.tn.settings.getMosaic();
                        for (var m = 0; m < o; m++) {
                            let e = d[s];
                            var p = (e.c - 1) * u.tn.defaultSize.getOuterWidth() + (e.c - 1) * n,
                                g = e.w * u.tn.defaultSize.getOuterWidth() + (e.w - 1) * n;
                            if (h = Math.max(h, p + g), c = Math.max(c, e.c - 1 + e.w), ++s >= d.length) break
                        }
                        var f = (c - 1) * n,
                            b = Math.min((e - f) / (h - f), 1);
                        r = 0, s = 0;
                        for (m = 0; m < o; m++) {
                            let e = u.GOM.items[m],
                                o = d[s];
                            e.top = Math.round((o.r - 1) * u.tn.defaultSize.getOuterHeight() * b) + (o.r - 1) * t + r * l + u.tn.labelHeight.get() * (o.r - 1), r > 0 && (e.top += t), e.left = (o.c - 1) * Math.round(u.tn.defaultSize.getOuterWidth() * b) + (o.c - 1) * n, e.height = Math.round(o.h * u.tn.defaultSize.getOuterHeight() * b) + (o.h - 1) * t + u.tn.labelHeight.get() * o.h, e.resizedContentHeight = e.height - u.tn.labelHeight.get() - a, e.width = Math.round(o.w * u.tn.defaultSize.getOuterWidth() * b) + (o.w - 1) * n, e.resizedContentWidth = e.width - i, e.row = r, 0 == r && (l = Math.max(l, e.top + e.height)), ++s >= d.length && (s = 0, r++)
                        }
                        return u.GOM.displayArea.width = (h - f) * b + f, !0
                    }();
                    break;
                case "GRID":
                default:
                    e = function () {
                        var e = 0,
                            t = 0,
                            n = u.GOM.cache.areaWidth,
                            i = 0,
                            a = u.tn.settings.GetResponsive("gutterHeight"),
                            o = z(n),
                            r = 0,
                            l = [],
                            s = 0,
                            c = n,
                            h = u.tn.defaultSize.getOuterWidth(),
                            d = 1,
                            m = u.GOM.items.length,
                            p = 2 * u.tn.opt.Get("borderHorizontal"),
                            g = 2 * u.tn.opt.Get("borderVertical");
                        "justified" == u.O.thumbnailAlignment ? (o = Math.min(o, m), i = 1 == o ? 0 : (n - o * h) / (o - 1)) : i = u.tn.settings.GetResponsive("gutterWidth");
                        if (u.O.RTL || "fillWidth" == u.O.thumbnailAlignment) {
                            var f = (o - 1) * i;
                            (d = (n - f) / (o * h)) > 1 && o++, f = (o - 1) * i, d = Math.min((n - f) / (o * h), 1), c = o * h + f
                        }
                        u.GOM.lastFullRow = 0;
                        for (var b = 0, v = (h = Math.round(h * d)) - p, O = Math.round(u.tn.defaultSize.getOuterHeight() * d) + u.tn.labelHeight.get(), y = Math.round(u.tn.defaultSize.getOuterHeight() * d) - g, G = 0; G < m; G++) {
                            0 == t ? (e = s * (h + i), l[s] = e, r = e + h) : e = l[s];
                            var M = e;
                            u.O.RTL && (M = parseInt(c) - e - h);
                            var w = u.GOM.items[G];
                            w.top = t, w.left = M, w.height = O, w.width = h, "fillWidth" == u.O.thumbnailAlignment && (w.resizedContentWidth = v, w.resizedContentHeight = y), w.row = b, ++s >= o && (s = 0, t += O + a, u.GOM.lastFullRow = b, b++)
                        }
                        return u.GOM.displayArea.width = r, !0
                    }()
            }
            at("galleryLayoutApplied");
            var t = u.O.fnGalleryLayoutApplied;
            return null !== t && ("function" == typeof t ? t() : window[t]()), e
        }

        function L() {
            null == u.CSStransformName ? u.$E.conTn.css("left", "0px") : u.$E.conTn.css(u.CSStransformName, "none")
        }

        function C() {
            u.GOM.cache.viewport = a(), u.GOM.cache.areaWidth = u.$E.base.width(), u.O.lightboxStandalone || (u.GOM.cache.containerOffset = u.$E.conLoadingB.offset())
        }

        function E(e) {
            C();
            var t = u.GOM.items.length;
            u.GOM.itemsDisplayed = 0;
            var n = 0;
            M();
            for (var i = 0; i < t; i++) {
                let t = u.GOM.items[i];
                i >= u.GOM.displayInterval.from && n < u.GOM.displayInterval.len ? (t.inDisplayArea = !0, e && (t.neverDisplayed = !0), u.GOM.itemsDisplayed++, n++) : t.inDisplayArea = !1
            }
            f();
            var a = [],
                o = [];
            C(), u.GOM.clipArea.top = -1, n = 0;
            var r = -1;
            u.GOM.clipArea.height = 0;
            for (i = 0; i < t; i++) {
                let e = u.GOM.items[i];
                if (e.inDisplayArea) {
                    if (-1 == u.GOM.clipArea.top && (u.GOM.clipArea.top = e.top), e.top - u.GOM.clipArea.top <= -1 && (u.GOM.clipArea.top = e.top), u.GOM.clipArea.height = Math.max(u.GOM.clipArea.height, e.top - u.GOM.clipArea.top + e.height), e.neverDisplayed) {
                        var l = u.GOM.cache.containerOffset.top + (e.top - u.GOM.clipArea.top);
                        if (l + e.height >= u.GOM.cache.viewport.t - 50 && l <= u.GOM.cache.viewport.t + u.GOM.cache.viewport.h + 50) {
                            let t = u.I[e.thumbnailIdx];
                            null == t.$elt && A(t, e.thumbnailIdx, i), a.push({
                                idx: i,
                                delay: n,
                                top: e.top,
                                left: e.left
                            }), n++
                        }
                    } else o.push({
                        idx: i,
                        delay: 0,
                        top: e.top,
                        left: e.left
                    });
                    r = i
                } else {
                    e.displayed = !1;
                    let t = u.I[e.thumbnailIdx];
                    null != t.$elt && t.$elt.css({
                        opacity: 0,
                        display: "none"
                    })
                }
            }
            var s = u.$E.conTnParent.width();
            if (u.GOM.displayArea.width == u.GOM.displayAreaLast.width && u.GOM.clipArea.height == u.GOM.displayAreaLast.height || (u.$E.conTn.width(u.GOM.displayArea.width).height(u.GOM.clipArea.height), u.GOM.displayAreaLast.width = u.GOM.displayArea.width, u.GOM.displayAreaLast.height = u.GOM.clipArea.height), s != u.$E.conTnParent.width()) return u.GOM.cache.areaWidth = u.$E.conTnParent.width(), S(), L(), void E(e);
            if (u.layout.support.rows && ("ROWS" == u.galleryDisplayMode.Get() || "FULLCONTENT" == u.galleryDisplayMode.Get() && u.galleryLastRowFull.Get() && -1 != u.GOM.lastFullRow) && (u.GOM.lastDisplayedIdxNew = r < t - 1 ? r : -1, -1 != u.GOM.lastDisplayedIdx)) {
                u.I[u.GOM.items[u.GOM.lastDisplayedIdx].thumbnailIdx].$getElt(".nGY2GThumbnailIconsFullThumbnail").html("")
            }
            u.GOM.thumbnails2Display = [];
            var c = k(a);
            k(o), u.GOM.thumbnails2Display.forEach((function (e) {
                ! function (e, t) {
                    function n(e, t) {
                        return Math.floor(Math.random() * (t - e + 1) + e)
                    }
                    var i = {},
                        a = {};
                    switch (u.tn.opt.Get("displayTransition")) {
                        case "RANDOMSCALE": {
                            for (var o = n(0, 3); o == u.GOM.lastRandomValue;) o = n(0, 3);
                            u.GOM.lastRandomValue = o;
                            let t = [.95, 1, 1.05, 1.1][o];
                            e.$elt.css({
                                "z-index": u.GOM.lastZIndex + [1, 2, 3, 4][o],
                                "box-shadow": "0px 0px 5px 3px rgba(0,0,0,0.74)"
                            }), i = {
                                scale: .5,
                                opacity: 0
                            }, a = {
                                scale: t,
                                opacity: 1
                            };
                            break
                        }
                        case "SCALEUP": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = .6), i = {
                                scale: e,
                                opacity: 0
                            }, a = {
                                scale: 1,
                                opacity: 1
                            };
                            break
                        }
                        case "SCALEDOWN": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = 1.3), i = {
                                scale: e,
                                opacity: 0
                            }, a = {
                                scale: 1,
                                opacity: 1
                            };
                            break
                        }
                        case "SLIDEUP": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = 50), i = {
                                opacity: 0,
                                translateY: e
                            }, a = {
                                opacity: 1,
                                translateY: 0
                            };
                            break
                        }
                        case "SLIDEDOWN": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = -50), i = {
                                opacity: 0,
                                translateY: e
                            }, a = {
                                opacity: 1,
                                translateY: 0
                            };
                            break
                        }
                        case "FLIPUP": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = 100), i = {
                                opacity: 0,
                                translateY: e,
                                rotateX: 45
                            }, a = {
                                opacity: 1,
                                translateY: 0,
                                rotateX: 0
                            };
                            break
                        }
                        case "FLIPDOWN": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = -100), i = {
                                opacity: 0,
                                translateY: e,
                                rotateX: -45
                            }, a = {
                                opacity: 1,
                                translateY: 0,
                                rotateX: 0
                            };
                            break
                        }
                        case "SLIDEUP2": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = 100), i = {
                                opacity: 0,
                                translateY: e,
                                rotateY: 40
                            }, a = {
                                opacity: 1,
                                translateY: 0,
                                rotateY: 0
                            };
                            break
                        }
                        case "IMAGESLIDEUP":
                            i = {
                                opacity: 0,
                                top: "100%"
                            }, a = {
                                opacity: 1,
                                top: "0%"
                            };
                            break;
                        case "SLIDEDOWN2": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = -100), i = {
                                opacity: 0,
                                translateY: e,
                                rotateY: 40
                            }, a = {
                                opacity: 1,
                                translateY: 0,
                                rotateY: 0
                            };
                            break
                        }
                        case "SLIDERIGHT": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = -150), i = {
                                opacity: 0,
                                translateX: e
                            }, a = {
                                opacity: 1,
                                translateX: 0
                            };
                            break
                        }
                        case "SLIDELEFT": {
                            let e = u.tn.opt.Get("displayTransitionStartVal");
                            0 == e && (e = 150), i = {
                                opacity: 0,
                                translateX: e
                            }, a = {
                                opacity: 1,
                                translateX: 0
                            };
                            break
                        }
                        case "FADEIN":
                            i = {
                                opacity: 0
                            }, a = {
                                opacity: 1
                            }
                    }
                    var r = new NGTweenable;
                    r.tween({
                        from: i,
                        to: a,
                        attachment: {
                            $e: e.$elt,
                            item: e,
                            tw: r
                        },
                        delay: t,
                        duration: u.tn.opt.Get("displayTransitionDuration"),
                        easing: u.tn.opt.Get("displayTransitionEasing"),
                        step: function (e, t) {
                            window.requestAnimationFrame((function () {
                                if (null !== t.item.$elt) switch (u.tn.opt.Get("displayTransition")) {
                                    case "RANDOMSCALE":
                                    case "SCALEUP":
                                        t.$e.css(u.CSStransformName, "scale(" + e.scale + ")").css("opacity", e.opacity);
                                        break;
                                    case "SCALEDOWN":
                                        t.item.$elt.last().css("opacity", e.opacity), t.item.CSSTransformSet(".nGY2GThumbnail", "scale", e.scale), t.item.CSSTransformApply(".nGY2GThumbnail");
                                        break;
                                    case "SLIDEUP":
                                        t.item.$elt.css("opacity", e.opacity), t.item.CSSTransformSet(".nGY2GThumbnail", "translate", "0px, " + e.translateY + "px"), t.item.CSSTransformApply(".nGY2GThumbnail");
                                        break;
                                    case "SLIDEDOWN":
                                        t.item.$elt.css("opacity", e.opacity), t.item.CSSTransformSet(".nGY2GThumbnail", "translate", "0px," + e.translateY + "px"), t.item.CSSTransformApply(".nGY2GThumbnail");
                                        break;
                                    case "FLIPUP":
                                        t.item.CSSTransformSet(".nGY2GThumbnail", "translate", "0px," + e.translateY + "px"), t.item.CSSTransformSet(".nGY2GThumbnail", "rotateX", e.rotateX + "deg"), t.item.$elt.css("opacity", e.opacity), t.item.CSSTransformApply(".nGY2GThumbnail");
                                        break;
                                    case "FLIPDOWN":
                                        t.item.$elt.css("opacity", e.opacity), t.item.CSSTransformSet(".nGY2GThumbnail", "translate", "0px," + e.translateY + "px"), t.item.CSSTransformSet(".nGY2GThumbnail", "rotateX", e.rotateX + "deg"), t.item.CSSTransformApply(".nGY2GThumbnail");
                                        break;
                                    case "SLIDEUP2":
                                        t.item.$elt.css("opacity", e.opacity), t.item.CSSTransformSet(".nGY2GThumbnail", "translate", "0px," + e.translateY + "px"), t.item.CSSTransformSet(".nGY2GThumbnail", "rotateY", e.rotateY + "deg"), t.item.CSSTransformApply(".nGY2GThumbnail");
                                        break;
                                    case "IMAGESLIDEUP":
                                        t.item.$elt.css("opacity", e.opacity), t.item.$Elts[".nGY2GThumbnailImage"].css("top", e.top);
                                        break;
                                    case "SLIDEDOWN2":
                                        t.item.$elt.css("opacity", e.opacity), t.item.CSSTransformSet(".nGY2GThumbnail", "translate", "0px, " + e.translateY + "px"), t.item.CSSTransformSet(".nGY2GThumbnail", "rotateY", e.rotateY + "deg"), t.item.CSSTransformApply(".nGY2GThumbnail");
                                        break;
                                    case "SLIDERIGHT":
                                        t.item.$elt.css("opacity", e.opacity), t.item.CSSTransformSet(".nGY2GThumbnail", "translate", e.translateX + "px, 0px"), t.item.CSSTransformApply(".nGY2GThumbnail");
                                        break;
                                    case "SLIDELEFT":
                                        t.item.CSSTransformSet(".nGY2GThumbnail", "translate", e.translateX + "px, 0px"), t.item.$elt.css("opacity", e.opacity), t.item.CSSTransformApply(".nGY2GThumbnail");
                                        break;
                                    case "FADEIN":
                                        t.$e.css(e)
                                } else t.tw.stop(!1)
                            }))
                        },
                        finish: function (e, t) {
                            window.requestAnimationFrame((function () {
                                if (null !== t.item.$elt) {
                                    switch (u.tn.opt.Get("displayTransition")) {
                                        case "RANDOMSCALE":
                                            t.$e.css(u.CSStransformName, "scale(" + e.scale + ")").css("opacity", "");
                                            break;
                                        case "SCALEUP":
                                            t.$e.css(u.CSStransformName, "").css("opacity", "");
                                            break;
                                        case "SCALEDOWN":
                                            t.item.$elt.last().css("opacity", ""), t.item.CSSTransformSet(".nGY2GThumbnail", "scale", e.scale), t.item.CSSTransformApply(".nGY2GThumbnail");
                                            break;
                                        case "IMAGESLIDEUP":
                                            t.item.$elt.css("opacity", ""), t.item.$Elts[".nGY2GThumbnailImage"].css("top", 0);
                                            break;
                                        case "SLIDEDOWN2":
                                            t.item.$elt.css("opacity", ""), t.item.CSSTransformApply(".nGY2GThumbnail");
                                            break;
                                        default:
                                            t.item.$elt.css("opacity", "")
                                    }
                                    B(t.item)
                                }
                            }))
                        }
                    })
                }(e.itm, e.d)
            })), u.GOM.thumbnails2Display = [], "NONE" == u.tn.opt.Get("displayTransition") ? (u.galleryResizeEventEnabled = !0, at("galleryDisplayed")) : requestTimeout((function () {
                u.galleryResizeEventEnabled = !0, at("galleryDisplayed")
            }), c * u.tn.opt.Get("displayInterval"))
        }

        function k(e) {
            var t = e.length;
            if (0 == t) return 0;
            var n = u.tn.opt.Get("displayOrder");
            if ("random" == n ? NGY2Tools.AreaShuffle(e) : ("rowByRow" == n && "JUSTIFIED" != u.layout.engine && "GRID" != u.layout.engine && (n = ""), "colFromRight" != n && "colFromLeft" != n || "CASCADING" == u.layout.engine || "GRID" == u.layout.engine || (n = "")), "colFromRight" == n || "colFromLeft" == n) {
                for (var i = [], a = [], o = 0; o < t; o++) null == i[e[o].left] && (i[e[o].left] = [], a.push(e[o].left)), i[e[o].left].push(e[o].idx);
                "colFromRight" == n && (a = a.reverse());
                for (o = 0; o < a.length; o++)
                    for (var r = a[o], l = 0; l < i[r].length; l++) D(i[r][l], o);
                return o
            }
            var s = 0,
                c = e[0].top;
            for (o = 0; o < t; o++) "rowByRow" == n ? e[o].top > c && (s++, c = e[o].top) : s++, D(e[o].idx, s);
            return s
        }

        function D(e, t) {
            var n = 0,
                i = u.GOM.items[e],
                a = u.GOM.items[e].thumbnailIdx,
                o = u.I[a];
            if (i.neverDisplayed) {
                var r = i.top - u.GOM.clipArea.top;
                if (u.tn.opt.Get("stacks") > 0 ? (o.$elt.last().css({
                        display: "block"
                    }), o.$elt.css({
                        top: r,
                        left: i.left
                    })) : o.$elt.css({
                        display: "block",
                        top: r,
                        left: i.left
                    }), n = r, !0 === u.O.thumbnailWaitImageLoaded) ngimagesLoaded(o.$getElt(".nGY2TnImg2")).on("progress", (function (e, t) {
                    if (t.isLoaded && t.img.getAttribute("data-albumidx") == u.GOM.albumIdx) {
                        var n = t.img.getAttribute("data-idx");
                        u.I[n].ThumbnailImageReveal()
                    }
                }));
                ! function (e, t) {
                    var n = u.GOM.items[e],
                        i = u.I[n.thumbnailIdx];
                    if ("NONE" == u.tn.opt.Get("displayTransition")) i.$elt.css({
                        opacity: 1
                    }), B(i);
                    else {
                        if (null == i.$elt) return;
                        var a = u.GOM.cache.containerOffset.top + (n.top - u.GOM.clipArea.top),
                            o = u.GOM.cache.viewport;
                        if (a + (n.top - u.GOM.clipArea.top) >= o.t - 50 && a <= o.t + o.h + 50) {
                            var r = t * u.tn.opt.Get("displayInterval");
                            return void("CUSTOM" == u.tn.opt.Get("displayTransition") ? "lN" == u.GOM.curNavLevel ? u.O.fnThumbnailDisplayEffect(i.$elt, i, e, r) : u.O.fnThumbnailL1DisplayEffect(i.$elt, i, e, r) : u.GOM.thumbnails2Display.push({
                                itm: i,
                                d: r
                            }))
                        }
                        i.$elt.css({
                            opacity: 1
                        }), B(i)
                    }
                }(e, t), i.displayed = !0, i.neverDisplayed = !1
            } else {
                var l = u.GOM.cache.containerOffset.top + o.top;
                r = u.GOM.cache.containerOffset.top + (i.top - u.GOM.clipArea.top);
                n = i.top - u.GOM.clipArea.top;
                var s = u.GOM.cache.viewport;
                if (u.O.thumbnailDisplayOutsideScreen || l + i.height >= s.t - s.h && l <= s.t + 4 * s.h || r + i.height >= s.t - s.h && r <= s.t + 4 * s.h)
                    if (i.displayed) {
                        if (o.top != i.top || o.left != i.left)
                            if (1 == u.O.galleryResizeAnimation)(new NGTweenable).tween({
                                from: {
                                    top: o.top,
                                    left: o.left,
                                    height: o.height,
                                    width: o.width
                                },
                                to: {
                                    top: n,
                                    left: i.left,
                                    height: i.height,
                                    width: i.width
                                },
                                attachment: {
                                    $e: o.$elt
                                },
                                duration: 100,
                                delay: t * u.tn.opt.Get("displayInterval") / 5,
                                easing: "easeOutQuart",
                                step: function (e, t) {
                                    t.$e.css(e)
                                },
                                finish: function (e, t) {
                                    this.dispose()
                                }
                            });
                            else o.$elt.css({
                                top: n,
                                left: i.left
                            })
                    } else i.displayed = !0, o.$elt.css({
                        display: "block",
                        top: n,
                        left: i.left,
                        opacity: 1
                    }), B(o);
                else i.displayed = !1, o.$elt.css({
                    display: "none"
                })
            }
            if (o.left = i.left, o.top = n, o.width == i.width && o.height == i.height || (o.$elt.css({
                    width: i.width,
                    height: i.height
                }), o.width = i.width, o.height = i.height, o.resizedContentWidth == i.resizedContentWidth && o.resizedContentHeight == i.resizedContentHeight || ("albumUp" == o.kind || (o.$getElt(".nGY2GThumbnailImage").css({
                    height: i.resizedContentHeight,
                    width: i.resizedContentWidth
                }), "JUSTIFIED" == u.layout.engine && o.$getElt(".nGY2GThumbnailImg").css({
                    height: i.resizedContentHeight,
                    width: i.resizedContentWidth
                })), o.resizedContentWidth = i.resizedContentWidth, o.resizedContentHeight = i.resizedContentHeight)), u.GOM.lastDisplayedIdxNew == e && u.layout.support.rows && ("ROWS" == u.galleryDisplayMode.Get() && u.galleryMaxRows.Get() > 0 || "FULLCONTENT" == u.galleryDisplayMode.Get() && u.galleryLastRowFull.Get() && -1 != u.GOM.lastFullRow)) {
                var c = u.GOM.items.length - e - 1;
                "0" != o.albumID && u.O.thumbnailLevelUp && c--, c > 0 ? ((u.O.thumbnailOpenInLightox || u.O.thumbnailSliderDelay > 0) && o.$getElt(".nGY2GThumbnailIconsFullThumbnail").html("+" + c), "right" != u.O.thumbnailLabel.get("position") && "left" != u.O.thumbnailLabel.get("position") && u.GOM.slider.hostItem != u.GOM.NGY2Item(e) && (V(u.GOM.slider.hostItem), u.GOM.slider.hostIdx = e, u.GOM.slider.hostItem = u.GOM.NGY2Item(e), u.GOM.slider.nextIdx = e, u.GOM.slider.currentIdx = e, function () {
                    if (0 == u.O.thumbnailSliderDelay || -1 == u.GOM.slider.hostIdx) return;
                    clearTimeout(u.GOM.slider.timerID);
                    var e = u.GOM.slider.hostItem;
                    0 == e.$getElt(".nGY2TnImgNext").length && (e.$getElt(".nGY2TnImg").clone().removeClass("nGY2TnImg").addClass("nGY2TnImgNext").insertAfter(e.$getElt(".nGY2TnImg")), e.$getElt(".nGY2TnImgBack").clone().removeClass("nGY2TnImgBack").addClass("nGY2TnImgBackNext").insertAfter(e.$getElt(".nGY2TnImg", !0)), e.$getElt(".nGY2GThumbnailImage", !0), e.$getElt(".nGY2GThumbnailImg", !0));
                    e.CSSTransformSet(".nGY2TnImgNext", "translateX", "100%", !0), e.CSSTransformApply(".nGY2TnImgNext"), e.CSSTransformSet(".nGY2TnImgBackNext", "translateX", "100%", !0), e.CSSTransformApply(".nGY2TnImgBackNext"), N(), u.GOM.slider.timerID = requestTimeout((function () {
                        ! function e() {
                            if (null != u.GOM.slider.hostItem.$getElt()) {
                                var t = new NGTweenable;
                                u.GOM.slider.tween = t, t.tween({
                                    from: {
                                        left: 100
                                    },
                                    to: {
                                        left: 0
                                    },
                                    duration: 800,
                                    delay: 0,
                                    easing: "easeOutQuart",
                                    step: function (e) {
                                        null != u.GOM.slider.hostItem.$getElt() ? (u.GOM.slider.hostItem.CSSTransformSet(".nGY2TnImgBack", "translateX", -(100 - e.left) + "%"), u.GOM.slider.hostItem.CSSTransformApply(".nGY2TnImgBack"), u.GOM.slider.hostItem.CSSTransformSet(".nGY2TnImg", "translateX", -(100 - e.left) + "%"), u.GOM.slider.hostItem.CSSTransformApply(".nGY2TnImg"), u.GOM.slider.hostItem.CSSTransformSet(".nGY2TnImgBackNext", "translateX", e.left + "%"), u.GOM.slider.hostItem.CSSTransformApply(".nGY2TnImgBackNext"), u.GOM.slider.hostItem.CSSTransformSet(".nGY2TnImgNext", "translateX", e.left + "%"), u.GOM.slider.hostItem.CSSTransformApply(".nGY2TnImgNext")) : u.GOM.slider.tween.stop(!1)
                                    },
                                    finish: function (t) {
                                        null != u.GOM.slider.hostItem.$getElt() && null != u.GOM.NGY2Item(u.GOM.slider.nextIdx) && (V(u.GOM.NGY2Item(u.GOM.slider.nextIdx)), u.GOM.slider.currentIdx = u.GOM.slider.nextIdx, N(), clearTimeout(u.GOM.slider.timerID), u.GOM.slider.timerID = requestTimeout((function () {
                                            e()
                                        }), u.O.thumbnailSliderDelay))
                                    }
                                })
                            }
                        }()
                    }), u.O.thumbnailSliderDelay)
                }())) : (V(u.GOM.slider.hostItem), u.GOM.slider.hostIdx = -1), u.GOM.lastDisplayedIdx = e
            }
        }

        function N() {
            u.GOM.slider.nextIdx++, u.GOM.slider.nextIdx >= u.GOM.items.length && (u.GOM.slider.nextIdx = u.GOM.slider.hostIdx);
            var e = u.GOM.NGY2Item(u.GOM.slider.nextIdx),
                t = "url('" + u.emptyGif + "')";
            null != e.imageDominantColors && (t = "url('" + e.imageDominantColors + "')"), u.GOM.slider.hostItem.$getElt(".nGY2TnImgBackNext", !0).css({
                "background-image": t,
                opacity: 1
            }), u.GOM.slider.hostItem.$getElt(".nGY2TnImgNext", !0).css({
                "background-image": "url('" + e.thumbImg().src + "')",
                opacity: 1
            }), u.GOM.slider.hostItem.$getElt(".nGY2TnImgNext .nGY2GThumbnailImg", !0).attr("src", e.thumbImg().src)
        }

        function V(e) {
            if (-1 != u.GOM.slider.hostIdx) {
                null != u.GOM.slider.tween && 1 == u.GOM.slider.tween._isTweening && u.GOM.slider.tween.stop(!1);
                var t = "url('" + u.emptyGif + "')";
                if (null != e.imageDominantColors && (t = "url('" + e.imageDominantColors + "')"), u.GOM.slider.hostItem.$getElt(".nGY2TnImgBack").css("background-image", t), u.GOM.slider.hostItem.$getElt(".nGY2TnImg").css("background-image", "url('" + e.thumbImg().src + "')"), u.GOM.slider.hostItem.$getElt(".nGY2TnImg .nGY2GThumbnailImg").attr("src", e.thumbImg().src), u.GOM.slider.hostItem.CSSTransformSet(".nGY2TnImgBack", "translateX", "0"), u.GOM.slider.hostItem.CSSTransformApply(".nGY2TnImgBack"), u.GOM.slider.hostItem.CSSTransformSet(".nGY2TnImg", "translateX", "0"), u.GOM.slider.hostItem.CSSTransformApply(".nGY2TnImg"), u.GOM.slider.hostItem.CSSTransformSet(".nGY2TnImgBackNext", "translateX", "100%", !0), u.GOM.slider.hostItem.CSSTransformApply(".nGY2TnImgBackNext"), u.GOM.slider.hostItem.CSSTransformSet(".nGY2TnImgNext", "translateX", "100%", !0), u.GOM.slider.hostItem.CSSTransformApply(".nGY2TnImgNext"), 1 == u.O.thumbnailLabel.get("display")) {
                    var n = u.O.icons.thumbnailAlbum;
                    "album" != e.kind && (n = u.O.icons.thumbnailImage), u.GOM.slider.hostItem.$getElt(".nGY2GThumbnailTitle").html(n + $(e)), u.GOM.slider.hostItem.$getElt(".nGY2GThumbnailDescription").html(n + F(e))
                }
            }
        }

        function Y(e) {
            var t = u.tn.opt.Get("stacks");
            if (0 == t) return "";
            for (var n = "", i = 0; i < t; i++) n = '<div class="nGY2GThumbnailStack " style="display:none;' + e + '"></div>' + n;
            return n
        }

        function A(e, t, n) {
            if (e.eltTransform = [], e.eltFilter = [], e.hoverInitDone = !1, e.$Elts = [], "albumUp" != e.kind) {
                var i = [],
                    a = 0,
                    o = "";
                !1 === u.O.thumbnailOpenInLightox && (o = "cursor:default;");
                var r = e.thumbImg().src.replace(/'/g, "%27"),
                    l = $(e),
                    s = "",
                    c = "background-image: url('" + u.emptyGif + "');";
                null != e.imageDominantColors ? c = "background-image: url('" + e.imageDominantColors + "');" : null != e.imageDominantColor ? s = "background-color:" + e.imageDominantColor + ";" : c = "";
                var h = "opacity:1;";
                1 == u.O.thumbnailWaitImageLoaded && (h = "opacity:0;"), i[a++] = Y(s) + '<div class="nGY2GThumbnail nGY2GThumbnail_' + u.GOM.curNavLevel + '" style="display:none;opacity:0;' + o + '"><div class="nGY2GThumbnailSub ' + (u.O.thumbnailSelectable && e.selected ? "nGY2GThumbnailSubSelected" : "") + '">';
                var d = u.tn.settings.getW(),
                    m = u.tn.settings.getH();
                null !== u.tn.settings.getMosaic() && (d = u.GOM.items[n].width, m = u.GOM.items[n].height);
                var p = "contain";
                u.tn.opt.Get("crop") && (p = "cover");
                var g = "position: absolute; top: 0px; left: 0px; width:" + d + "px; height:" + m + "px;" + s + c + " background-position: center center;  background-repeat: no-repeat; background-size:" + p + "; overflow: hidden;";
                i[a++] = '<div class="nGY2GThumbnailImage nGY2TnImgBack" style="' + g + '"></div>';
                var f = h + "position: absolute; top: 0px; left: 0px; width:" + d + "px; height:" + m + "px; background-image: url('" + r.replace(/\\/g, "\\\\") + "'); background-position: center center; background-repeat: no-repeat; background-size:" + p + "; overflow: hidden;";
                i[a++] = '<div class="nGY2GThumbnailImage nGY2TnImg" style="' + f + '">', i[a++] = '  <img class="nGY2GThumbnailImg nGY2TnImg2" src="' + r + '" alt="' + l + '" style="opacity:0;" data-idx="' + t + '" data-albumidx="' + u.GOM.albumIdx + '" >', i[a++] = "</div>", i[a++] = '<div class="nGY2GThumbnailCustomLayer"></div>', 1 == u.O.thumbnailLabel.get("display") && (i[a++] = '  <div class="nGY2GThumbnailLabel" ' + u.tn.style.getLabel(e) + ">", "album" == e.kind ? i[a++] = '    <div class="nGY2GThumbnailTitle nGY2GThumbnailAlbumTitle" ' + u.tn.style.getTitle() + ">" + u.O.icons.thumbnailAlbum + l + "</div>" : i[a++] = '    <div class="nGY2GThumbnailTitle nGY2GThumbnailImageTitle" ' + u.tn.style.getTitle() + ">" + u.O.icons.thumbnailImage + l + "</div>", i[a++] = '    <div class="nGY2GThumbnailDescription" ' + u.tn.style.getDesc() + ">" + F(e) + "</div>", i[a++] = "  </div>"), i[a++] = function (e) {
                    var t = _(e, "topLeft") + _(e, "topRight") + _(e, "bottomLeft") + _(e, "bottomRight");
                    return t += '<div class="nGY2GThumbnailIconsFullThumbnail"></div>'
                }(e), i[a++] = "</div></div>";
                var b = jQuery(i.join("")).appendTo(u.$E.conTn);
                e.$elt = b, b.data("index", n), e.$getElt(".nGY2GThumbnailImg").data("index", n);
                var v = u.O.fnThumbnailInit;
                null !== v && ("function" == typeof v ? v(b, e, n) : window[v](b, e, n)), "image gallery by nanogallery2 [build]" != e.title && H(n)
            } else ! function (e, t) {
                var n = [],
                    i = 0,
                    a = "";
                !1 === u.O.thumbnailOpenInLightox && (a = "cursor:default;"), n[i++] = Y("") + '<div class="nGY2GThumbnail" style="display:none;opacity:0;' + a + '" >', n[i++] = '  <div class="nGY2GThumbnailSub">';
                var o = u.tn.defaultSize.getHeight(),
                    r = u.tn.defaultSize.getWidth();
                n[i++] = '    <div class="nGY2GThumbnailImage" style="width:' + r + "px;height:" + o + 'px;"><img class="nGY2GThumbnailImg" src="' + u.emptyGif + '" alt="" style="max-width:' + r + "px;max-height:" + o + 'px;" ></div>', n[i++] = '    <div class="nGY2GThumbnailAlbumUp" >' + u.O.icons.thumbnailAlbumUp + "</div>", n[i++] = "  </div>", n[i++] = "</div>";
                var l = jQuery(n.join("")).appendTo(u.$E.conTn);
                e.$elt = l, l.data("index", t), e.$getElt(".nGY2GThumbnailImg").data("index", t)
            }(e, n)
        }

        function _(e, t) {
            var n = "",
                i = u.tn.toolbar.get(e),
                a = {
                    xs: 0,
                    sm: 1,
                    me: 2,
                    la: 3,
                    xl: 4
                },
                o = 0;
            if ("" != i[t]) {
                var r = "top: 0; right: 0; text-align: right;";
                switch (t) {
                    case "topLeft":
                        r = "top: 0; left: 0; text-align: left;";
                        break;
                    case "bottomRight":
                        r = "bottom: 0; right: 0; text-align: right;";
                        break;
                    case "bottomLeft":
                        r = "bottom: 0; left: 0; text-align: left;"
                }
                n += '  <ul class="nGY2GThumbnailIcons" style="' + r + '">';
                for (var l = i[t].split(","), s = l.length, c = 0; c < s; c++) {
                    var h = l[c].replace(/^\s*|\s*$/, ""),
                        d = h.substring(0, 2).toLowerCase(),
                        m = h,
                        p = !0;
                    if (/xs|sm|me|la|xl/i.test(d) && (a[d] > a[u.GOM.curWidth] && (p = !1), m = h.substring(2)), p) {
                        var g = c + 1 < s ? "&nbsp;" : "";
                        switch (m) {
                            case "COUNTER":
                                "album" == e.kind && (n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="">', n += '      <div class="nGY2GThumbnailIconImageCounter"></div>', n += '      <div class="nGY2GThumbnailIconText">' + u.O.icons.thumbnailCounter + Math.max(e.getContentLength(!1), e.numberItems) + g + "</div>", n += "    </li>", o++);
                                break;
                            case "COUNTER2":
                                "album" == e.kind && (n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="">', n += '      <div class="nGY2GThumbnailIconTextBadge">' + u.O.icons.thumbnailCounter + Math.max(e.getContentLength(!1), e.numberItems) + g + "</div>", n += "    </li>", o++);
                                break;
                            case "SHARE":
                                n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="' + m + '">', n += "      <div>" + u.O.icons.thumbnailShare + "</div>", n += "    </li>", o++;
                                break;
                            case "DOWNLOAD":
                                n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="' + m + '">', n += "      <div>" + u.O.icons.thumbnailDownload + "</div>", n += "    </li>", o++;
                                break;
                            case "INFO":
                                n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="' + m + '">', n += "      <div>" + u.O.icons.thumbnailInfo + "</div>", n += "    </li>", o++;
                                break;
                            case "SHOPPINGCART":
                                n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="' + m + '">', n += P(e), n += "    </li>", o++;
                                break;
                            case "DISPLAY":
                                n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="DISPLAY">', n += '      <div class="nGY2GThumbnailIconImageShare">' + u.O.icons.thumbnailDisplay + "</div>", n += "    </li>", o++;
                                break;
                            case "CUSTOM1":
                            case "CUSTOM2":
                            case "CUSTOM3":
                            case "CUSTOM4":
                            case "CUSTOM5":
                            case "CUSTOM6":
                            case "CUSTOM7":
                            case "CUSTOM8":
                            case "CUSTOM9":
                            case "CUSTOM10":
                                var f = m.replace("CUSTOM", "");
                                n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="' + m.toLowerCase() + '">', n += '      <div class="nGY2GThumbnailIconImageShare">' + u.O.icons["thumbnailCustomTool" + f] + "</div>", n += "    </li>", o++;
                                break;
                            case "FEATURED":
                                !0 === e.featured && (n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="">', n += '      <div class="nGY2GThumbnailIconImageFeatured">' + u.O.icons.thumbnailFeatured + "</div>", n += "    </li>", o++);
                                break;
                            case "SELECT":
                                1 == u.O.thumbnailSelectable && (n += '    <li class="nGY2GThumbnailIcon" data-ngy2action="TOGGLESELECT">', !0 === e.selected ? n += '      <div class="nGY2GThumbnailIconImageSelect nGY2ThumbnailSelected">' + u.O.icons.thumbnailSelected + "</div>" : n += '      <div class="nGY2GThumbnailIconImageSelect nGY2ThumbnailUnselected">' + u.O.icons.thumbnailUnselected + "</div>", n += "    </li>", o++)
                        }
                    }
                }
                n += "  </ul>"
            }
            return o > 0 ? n : ""
        }

        function P(e) {
            for (var t = 0, n = e.GetID(), i = 0; i < u.shoppingCart.length; i++) u.I[u.shoppingCart[i].idx].GetID() == n && (t = u.shoppingCart[i].qty);
            return 0 == t && (t = ""), "      <div>" + u.O.icons.thumbnailShoppingcart + t + "</div>"
        }

        function R(e) {
            var t = e.$elt;
            if (null != t) {
                var n = t.find('*[data-ngy2action="SHOPPINGCART"]');
                void 0 !== n && n.html(P(e))
            }
        }

        function $(e) {
            var t = e.title;
            if (1 == u.O.thumbnailLabel.get("display")) {
                void 0 !== t && 0 != t.length || (t = "&nbsp;"), "" != u.i18nTranslations.thumbnailImageTitle && (t = u.i18nTranslations.thumbnailImageTitle);
                var n = u.O.thumbnailLabel.get("titleMaxLength");
                n > 3 && t.length > n && (t = t.substring(0, n) + "...")
            }
            return t
        }

        function F(e) {
            var t = "";
            if (1 == u.O.thumbnailLabel.get("displayDescription")) {
                t = "album" == e.kind ? "" != u.i18nTranslations.thumbnailImageDescription ? u.i18nTranslations.thumbnailAlbumDescription : e.description : "" != u.i18nTranslations.thumbnailImageDescription ? u.i18nTranslations.thumbnailImageDescription : e.description;
                var n = u.O.thumbnailLabel.get("descriptionMaxLength");
                n > 3 && t.length > n && (t = t.substring(0, n) + "..."), 0 == t.length && (t = "&nbsp;")
            }
            return t
        }

        function z(e) {
            var t = u.tn.defaultSize.getOuterWidth(),
                n = 0;
            return n = "justified" == u.O.thumbnailAlignment ? Math.floor(e / t) : Math.floor((e + u.tn.settings.GetResponsive("gutterWidth")) / (t + u.tn.settings.GetResponsive("gutterWidth"))), u.O.maxItemsPerLine > 0 && n > u.O.maxItemsPerLine && (n = u.O.maxItemsPerLine), n < 1 && (n = 1), n
        }

        function B(e) {
            var t = u.tn.opt.Get("stacks");
            if (t > 0) {
                e.$elt.css({
                    display: "block"
                });
                for (var n = .9, i = t - 1; i >= 0; i--) e.$elt.eq(i).css("opacity", n), n -= .2
            }
        }

        function H(e) {
            var t = u.GOM.items[e],
                n = u.I[t.thumbnailIdx];
            if (null != n.$elt) {
                var i = u.O.fnThumbnailHoverInit;
                null !== i && ("function" == typeof i ? i($e, n, e) : window[i]($e, n, e));
                for (var a = u.tn.buildInit.get(), o = 0; o < a.length; o++) switch (a[o].property) {
                    case "scale":
                    case "rotateX":
                    case "rotateY":
                    case "rotateZ":
                    case "translateX":
                    case "translateY":
                    case "translateZ":
                        n.CSSTransformSet(a[o].element, a[o].property, a[o].value), n.CSSTransformApply(a[o].element);
                        break;
                    case "blur":
                    case "brightness":
                    case "grayscale":
                    case "sepia":
                    case "contrast":
                    case "opacity":
                    case "saturate":
                        n.CSSFilterSet(a[o].element, a[o].property, a[o].value), n.CSSFilterApply(a[o].element);
                        break;
                    default:
                        n.$getElt(a[o].element).css(a[o].property, a[o].value)
                }
                var r = u.tn.hoverEffects.get();
                for (o = 0; o < r.length; o++)
                    if (!0 === r[o].firstKeyframe) switch (r[o].type) {
                        case "scale":
                        case "rotateX":
                        case "rotateY":
                        case "rotateZ":
                        case "translateX":
                        case "translateY":
                        case "translateZ":
                            n.CSSTransformSet(r[o].element, r[o].type, r[o].from), n.CSSTransformApply(r[o].element);
                            break;
                        case "blur":
                        case "brightness":
                        case "grayscale":
                        case "sepia":
                        case "contrast":
                        case "opacity":
                        case "saturate":
                            n.CSSFilterSet(r[o].element, r[o].type, r[o].from), n.CSSFilterApply(r[o].element);
                            break;
                        default:
                            n.$getElt(r[o].element).css(r[o].type, r[o].from)
                    }
                n.hoverInitDone = !0
            }
        }

        function U() {
            if (-1 != u.GOM.albumIdx)
                for (var e = u.GOM.items.length, t = 0; t < e; t++) H(t), u.I[u.GOM.items[t].thumbnailIdx].hovered = !1
        }

        function W(e) {
            if (-1 != u.GOM.albumIdx && u.galleryResizeEventEnabled && u.GOM.slider.hostIdx != e) {
                var t = u.GOM.items[e],
                    n = u.I[t.thumbnailIdx];
                if ("albumUp" != n.kind && null != n.$elt) {
                    n.hovered = !0;
                    var i = u.O.fnThumbnailHover;
                    null !== i && ("function" == typeof i ? i(n.$elt, n, e) : window[i](n.$elt, n, e));
                    var a = u.tn.hoverEffects.get();
                    try {
                        for (var o = 0; o < a.length; o++) !0 === a[o].hoverin && n.animate(a[o], 0, !0)
                    } catch (e) {
                        h(u, "error on hover: " + e.message)
                    }
                }
            }
        }

        function j() {
            if (-1 != u.GOM.albumIdx)
                for (var e = u.GOM.items.length, t = 0; t < e; t++) u.GOM.items[t].inDisplayArea ? X(t) : u.I[u.GOM.items[t].thumbnailIdx].hovered = !1
        }

        function X(e) {
            if (-1 != u.GOM.albumIdx && u.galleryResizeEventEnabled && u.GOM.slider.hostIdx != e) {
                var t = u.GOM.items[e],
                    n = u.I[t.thumbnailIdx];
                if ("albumUp" != n.kind && n.hovered && (n.hovered = !1, null != n.$elt)) {
                    var i = u.O.fnThumbnailHoverOut;
                    null !== i && ("function" == typeof i ? i(n.$elt, n, e) : window[i](n.$elt, n, e));
                    var a = u.tn.hoverEffects.get();
                    try {
                        for (var o = 0; o < a.length; o++) !0 === a[o].hoverout && n.animate(a[o], 0, !1)
                    } catch (e) {
                        h(u, "error on hoverOut: " + e.message)
                    }
                }
            }
        }

        function Q(e, t) {
            u.O.debugMode && console.log("#DisplayPhoto : " + t + "-" + e);
            var n = NGY2Item.GetIdx(u, t);
            u.GOM.curNavLevel = 0 == n ? "l1" : "lN", -1 == n && "" != u.O.kind && NGY2Item.New(u, "", "", t, "0", "album");
            var i = NGY2Item.GetIdx(u, e); - 1 != i ? (u.O.debugMode && console.log("#DisplayPhoto : " + i), we(i)) : q(t, Q, e, t)
        }

        function q(e, t, n, i) {
            switch (u.O.kind) {
                case "":
                    ! function (e, t, n) {
                        if (!0 === u.markupOrApiProcessed) return void g("-1", 0);
                        if (void 0 !== u.O.items && null !== u.O.items) K();
                        else {
                            if (!(u.O.$markup.length > 0)) return void d(u, "error: no media to process.");
                            te(u.O.$markup), u.O.$markup = []
                        }
                        u.markupOrApiProcessed = !0, null != e && e(t, n, null)
                    }(t, n, i);
                    break;
                default:
                    jQuery.nanogallery2["data_" + u.O.kind](u, "AlbumGetContent", e, t, n, i)
            }
        }
        this.initiateGallery2 = function (e, t) {
            if (u.O = t, u.$E.base = jQuery(e), u.baseEltID = u.$E.base.attr("id"), null == u.baseEltID) {
                for (var n = "", i = !0; i;) document.getElementById("my_nanogallery" + n) ? "" == n ? n = 1 : n++ : (i = !1, u.baseEltID = "my_nanogallery" + n);
                u.$E.base.attr("id", u.baseEltID)
            }
            if (u.O.$markup = [], function () {
                    "PICASA" != u.O.kind.toUpperCase() && "GOOGLE" != u.O.kind.toUpperCase() || (u.O.kind = "google2");
                    u.GOM.cache.viewport = a(), u.GOM.curWidth = ht(), jQuery.extend(!0, u.tn.toolbar.image, u.O.thumbnailToolbarImage), jQuery.extend(!0, u.tn.toolbar.album, u.O.thumbnailToolbarAlbum);
                    for (var e = ["image", "album"], t = ["topLeft", "topRight", "bottomLeft", "bottomRight"], n = 0; n < e.length; n++)
                        for (var i = 0; i < t.length; i++) u.tn.toolbar[e[n]][t[i]] = u.tn.toolbar[e[n]][t[i]].toUpperCase();
                    "overImageOnBottom" == u.O.thumbnailLabel.position && (u.O.thumbnailLabel.valign = "bottom", u.O.thumbnailLabel.position = "overImage");
                    "overImageOnMiddle" == u.O.thumbnailLabel.position && (u.O.thumbnailLabel.valign = "middle", u.O.thumbnailLabel.position = "overImage");
                    "overImageOnTop" == u.O.thumbnailLabel.position && (u.O.thumbnailLabel.valign = "top", u.O.thumbnailLabel.position = "overImage");
                    void 0 !== u.O.thumbnailL1Label && void 0 !== u.O.thumbnailL1Label.position && ("overImageOnBottom" == u.O.thumbnailL1Label.position && (u.O.thumbnailL1Label.valign = "bottom", u.O.thumbnailL1Label.position = "overImage"), "overImageOnMiddle" == u.O.thumbnailL1Label.position && (u.O.thumbnailL1Label.valign = "middle", u.O.thumbnailL1Label.position = "overImage"), "overImageOnTop" == u.O.thumbnailL1Label.position && (u.O.thumbnailL1Label.valign = "top", u.O.thumbnailL1Label.position = "overImage"));
                    u.O.thumbnailLabel.get = function (e) {
                        return "l1" == u.GOM.curNavLevel && void 0 !== u.O.thumbnailL1Label && void 0 !== u.O.thumbnailL1Label[e] ? u.O.thumbnailL1Label[e] : u.O.thumbnailLabel[e]
                    }, u.O.thumbnailLabel.set = function (e, t) {
                        "l1" == u.GOM.curNavLevel && void 0 !== u.O.thumbnailL1Label && void 0 !== u.O.thumbnailL1Label[e] ? u.O.thumbnailL1Label[e] = t : u.O.thumbnailLabel[e] = t
                    }, "" != u.O.blockList && (u.blockList = u.O.blockList.toUpperCase().split("|"));
                    "" != u.O.allowList && (u.allowList = u.O.allowList.toUpperCase().split("|"));
                    if (void 0 !== u.O.albumList2 && null !== u.O.albumList2 && u.O.albumList2.constructor === Array) {
                        var o = u.O.albumList2.length;
                        for (n = 0; n < o; n++) u.albumList.push(u.O.albumList2[n])
                    }
                    void 0 !== u.O.albumList2 && "string" == typeof u.O.albumList2 && u.albumList.push(u.O.albumList2);

                    function l(e, t, n) {
                        u.tn.opt.lN[n] = u.O[e], u.tn.opt.l1[n] = u.O[e], "number" == r(u.O[t]) && (u.tn.opt.l1[n] = u.O[t])
                    }

                    function s(e, t, n) {
                        u.tn.settings[e][t].xs = n, u.tn.settings[e][t].sm = n, u.tn.settings[e][t].me = n, u.tn.settings[e][t].la = n, u.tn.settings[e][t].xl = n
                    }

                    function c(e, t, n) {
                        var i = u.O[e];
                        if (null != i)
                            if ("number" == r(i) || -1 == i.indexOf(" ")) {
                                var a = "auto";
                                "auto" != i && (a = parseInt(i)), s(t, n, a)
                            } else {
                                var o = i.split(" ");
                                if (o.length > 0 && +o[0] == +o[0]) {
                                    a = "auto";
                                    "auto" != o[0] && (a = parseInt(o[0])), s(t, n, a)
                                }
                                for (var l = 1; l < o.length; l++)
                                    if (/^xs|sm|me|la|xl/i.test(o[l])) {
                                        var c = o[l].substring(0, 2).toLowerCase(),
                                            h = o[l].substring(2);
                                        a = "auto";
                                        "auto" != h && (a = parseInt(h)), u.tn.settings[t][n][c] = a
                                    }
                            }
                    }
                    u.tn.opt.lN.crop = u.O.thumbnailCrop, u.tn.opt.l1.crop = null != u.O.thumbnailL1Crop ? u.O.thumbnailL1Crop : u.O.thumbnailCrop, l("thumbnailStacks", "thumbnailL1Stacks", "stacks"), l("thumbnailStacksTranslateX", "thumbnailL1StacksTranslateX", "stacksTranslateX"), l("thumbnailStacksTranslateY", "thumbnailL1StacksTranslateY", "stacksTranslateY"), l("thumbnailStacksTranslateZ", "thumbnailL1StacksTranslateZ", "stacksTranslateZ"), l("thumbnailStacksRotateX", "thumbnailL1StacksRotateX", "stacksRotateX"), l("thumbnailStacksRotateY", "thumbnailL1StacksRotateY", "stacksRotateY"), l("thumbnailStacksRotateZ", "thumbnailL1StacksRotateZ", "stacksRotateZ"), l("thumbnailStacksScale", "thumbnailL1StacksScale", "stacksScale"), l("thumbnailBorderHorizontal", "thumbnailL1BorderHorizontal", "borderHorizontal"), l("thumbnailBorderVertical", "thumbnailL1BorderVertical", "borderVertical"), l("thumbnailBaseGridHeight", "thumbnailL1BaseGridHeight", "baseGridHeight"), c("thumbnailGutterWidth", "gutterWidth", "lN"), c("thumbnailGutterWidth", "gutterWidth", "l1"), c("thumbnailL1GutterWidth", "gutterWidth", "l1"), c("thumbnailGutterHeight", "gutterHeight", "lN"), c("thumbnailGutterHeight", "gutterHeight", "l1"), c("thumbnailL1GutterHeight", "gutterHeight", "l1"), u.galleryDisplayMode.lN = u.O.galleryDisplayMode.toUpperCase(), u.galleryDisplayMode.l1 = null != u.O.galleryL1DisplayMode ? u.O.galleryL1DisplayMode.toUpperCase() : u.O.galleryDisplayMode.toUpperCase(), u.galleryMaxRows.lN = u.O.galleryMaxRows, u.galleryMaxRows.l1 = "number" == r(u.O.galleryL1MaxRows) ? u.O.galleryL1MaxRows : u.O.galleryMaxRows, u.galleryLastRowFull.lN = u.O.galleryLastRowFull, u.galleryLastRowFull.l1 = null != u.O.galleryL1LastRowFull ? u.O.galleryL1LastRowFull : u.O.galleryLastRowFull, u.gallerySorting.lN = u.O.gallerySorting.toUpperCase(), u.gallerySorting.l1 = null != u.O.galleryL1Sorting ? u.O.galleryL1Sorting.toUpperCase() : u.gallerySorting.lN, u.galleryDisplayTransition.lN = u.O.galleryDisplayTransition.toUpperCase(), u.galleryDisplayTransition.l1 = null != u.O.galleryL1DisplayTransition ? u.O.galleryL1DisplayTransition.toUpperCase() : u.galleryDisplayTransition.lN, u.galleryDisplayTransitionDuration.lN = u.O.galleryDisplayTransitionDuration, u.galleryDisplayTransitionDuration.l1 = null != u.O.galleryL1DisplayTransitionDuration ? u.O.galleryL1DisplayTransitionDuration : u.galleryDisplayTransitionDuration.lN, u.galleryMaxItems.lN = u.O.galleryMaxItems, u.galleryMaxItems.l1 = "number" == r(u.O.galleryL1MaxItems) ? u.O.galleryL1MaxItems : u.O.galleryMaxItems, u.galleryFilterTags.lN = u.O.galleryFilterTags, u.galleryFilterTags.l1 = null != u.O.galleryL1FilterTags ? u.O.galleryL1FilterTags : u.O.galleryFilterTags, u.galleryFilterTagsMode.lN = u.O.galleryFilterTagsMode, u.galleryFilterTagsMode.l1 = null != u.O.galleryL1FilterTagsMode ? u.O.galleryL1FilterTagsMode : u.O.galleryFilterTagsMode, u.O.galleryPaginationMode = u.O.galleryPaginationMode.toUpperCase(), "number" == r(u.O.slideshowDelay) && u.O.slideshowDelay >= 2e3 ? u.VOM.slideshowDelay = u.O.slideshowDelay : d(u, 'Parameter "slideshowDelay" must be an integer >= 2000 ms.');
                    "boolean" == typeof u.O.thumbnailDisplayTransition && (!0 === u.O.thumbnailDisplayTransition ? (u.tn.opt.lN.displayTransition = "FADEIN", u.tn.opt.l1.displayTransition = "FADEIN") : (u.tn.opt.lN.displayTransition = "NONE", u.tn.opt.l1.displayTransition = "NONE"));
                    "" !== u.O.fnThumbnailDisplayEffect && (u.tn.opt.lN.displayTransition = "CUSTOM", u.tn.opt.l1.displayTransition = "CUSTOM");
                    "" !== u.O.fnThumbnailL1DisplayEffect && (u.tn.opt.l1.displayTransition = "CUSTOM");

                    function m(e, t) {
                        if ("string" == typeof e) {
                            var n = e.split("_");
                            1 == n.length && (u.tn.opt[t].displayTransition = e.toUpperCase()), 2 == n.length && (u.tn.opt[t].displayTransition = n[0].toUpperCase(), u.tn.opt[t].displayTransitionStartVal = Number(n[1])), 3 == n.length && (u.tn.opt[t].displayTransition = n[0].toUpperCase(), u.tn.opt[t].displayTransitionStartVal = Number(n[1]), u.tn.opt[t].displayTransitionEasing = n[2])
                        }
                    }
                    l("thumbnailDisplayTransitionEasing", "thumbnailL1DisplayTransitionEasing", "displayTransitionEasing"), m(u.O.thumbnailDisplayTransition, "lN"), m(u.O.thumbnailDisplayTransition, "l1"), m(u.O.thumbnailL1DisplayTransition, "l1"), l("thumbnailDisplayTransitionDuration", "thumbnailL1DisplayTransitionDuration", "displayTransitionDuration"), l("thumbnailDisplayInterval", "thumbnailL1DisplayInterval", "displayInterval"), l("thumbnailDisplayOrder", "thumbnailL1DisplayOrder", "displayOrder"), void 0 !== u.O.thumbnailSizeSM && (u.O.breakpointSizeSM = u.O.thumbnailSizeSM);
                    void 0 !== u.O.thumbnailSizeME && (u.O.breakpointSizeME = u.O.thumbnailSizeME);
                    void 0 !== u.O.thumbnailSizeLA && (u.O.breakpointSizeLA = u.O.thumbnailSizeLA);
                    void 0 !== u.O.thumbnailSizeXL && (u.O.breakpointSizeXL = u.O.thumbnailSizeXL);
                    if (void 0 !== u.O.thumbnailL1BuildInit2) {
                        var p = u.O.thumbnailL1BuildInit2.split("|");
                        for (n = 0; n < p.length; n++) {
                            if (3 == (g = p[n].trim().split("_")).length)(f = re()).element = ie(g[0], ""), f.property = g[1], f.value = g[2], u.tn.buildInit.level1.push(f)
                        }
                    }
                    if (void 0 !== u.O.thumbnailBuildInit2)
                        for (p = u.O.thumbnailBuildInit2.split("|"), n = 0; n < p.length; n++) {
                            var g, f;
                            if (3 == (g = p[n].trim().split("_")).length)(f = re()).element = ie(g[0], ""), f.property = g[1], f.value = g[2], u.tn.buildInit.std.push(f)
                        }
                    var b = u.O.thumbnailL1HoverEffect2;
                    if (void 0 !== b) switch (r(b)) {
                        case "string": {
                            let e = b.split("|");
                            for (n = 0; n < e.length; n++) {
                                let t = oe();
                                t = ne(e[n].trim(), t), null != t && u.tn.hoverEffects.level1.push(t)
                            }
                            break
                        }
                        case "object": {
                            let e = oe();
                            e = jQuery.extend(e, b), e = ne(e.name, e), null != e && u.tn.hoverEffects.level1.push(e);
                            break
                        }
                        case "array":
                            for (n = 0; n < b.length; n++) {
                                let e = oe();
                                e = jQuery.extend(e, b[n]), e = ne(e.name, e), null != e && u.tn.hoverEffects.level1.push(e)
                            }
                            break;
                        case "null":
                            break;
                        default:
                            h(u, 'incorrect parameter for "thumbnailL1HoverEffect2".')
                    }
                    u.tn.hoverEffects.level1 = ae(u.tn.hoverEffects.level1);
                    var v = u.O.thumbnailHoverEffect2;
                    switch (r(v)) {
                        case "string": {
                            let e = v.split("|");
                            for (n = 0; n < e.length; n++) {
                                let t = oe();
                                t = ne(e[n].trim(), t), null != t && u.tn.hoverEffects.std.push(t)
                            }
                            break
                        }
                        case "object": {
                            let e = oe();
                            e = jQuery.extend(e, v), e = ne(e.name, e), null != e && u.tn.hoverEffects.std.push(e);
                            break
                        }
                        case "array":
                            for (n = 0; n < v.length; n++) {
                                let e = oe();
                                e = jQuery.extend(e, v[n]), e = ne(e.name, e), null != e && u.tn.hoverEffects.std.push(e)
                            }
                            break;
                        case "null":
                            break;
                        default:
                            h(u, 'incorrect parameter for "thumbnailHoverEffect2".')
                    }
                    u.tn.hoverEffects.std = ae(u.tn.hoverEffects.std), null == u.O.touchAnimationL1 && (u.O.touchAnimationL1 = u.O.touchAnimation);
                    0 == u.tn.hoverEffects.std.length && (0 == u.tn.hoverEffects.level1.length && (u.O.touchAnimationL1 = !1), u.O.touchAnimation = !1);
                    0 != u.O.thumbnailHeight && "" != u.O.thumbnailHeight || (u.O.thumbnailHeight = "auto");
                    0 != u.O.thumbnailWidth && "" != u.O.thumbnailWidth || (u.O.thumbnailWidth = "auto");
                    0 != u.O.thumbnailL1Height && "" != u.O.thumbnailL1Height || (u.O.thumbnailL1Height = "auto");
                    0 != u.O.thumbnailL1Width && "" != u.O.thumbnailL1Width || (u.O.thumbnailL1Width = "auto");
                    c("thumbnailWidth", "width", "lN"), c("thumbnailWidth", "width", "l1"), c("thumbnailL1Width", "width", "l1"), c("thumbnailHeight", "height", "lN"), c("thumbnailHeight", "height", "l1"), c("thumbnailL1Height", "height", "l1"), u.O.thumbnailLabelHeight = parseInt(u.O.thumbnailLabelHeight), null != u.O.galleryMosaic && (u.tn.settings.mosaic.l1.xs = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaic.l1.sm = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaic.l1.me = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaic.l1.la = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaic.l1.xl = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaic.lN.xs = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaic.lN.sm = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaic.lN.me = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaic.lN.la = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaic.lN.xl = JSON.parse(JSON.stringify(u.O.galleryMosaic)), u.tn.settings.mosaicCalcFactor("l1", "xs"), u.tn.settings.mosaicCalcFactor("l1", "sm"), u.tn.settings.mosaicCalcFactor("l1", "me"), u.tn.settings.mosaicCalcFactor("l1", "la"), u.tn.settings.mosaicCalcFactor("l1", "xl"), u.tn.settings.mosaicCalcFactor("lN", "xs"), u.tn.settings.mosaicCalcFactor("lN", "sm"), u.tn.settings.mosaicCalcFactor("lN", "me"), u.tn.settings.mosaicCalcFactor("lN", "la"), u.tn.settings.mosaicCalcFactor("lN", "xl"));
                    null != u.O.galleryL1Mosaic && (u.tn.settings.mosaic.l1.xs = JSON.parse(JSON.stringify(u.O.galleryL1Mosaic)), u.tn.settings.mosaic.l1.sm = JSON.parse(JSON.stringify(u.O.galleryL1Mosaic)), u.tn.settings.mosaic.l1.me = JSON.parse(JSON.stringify(u.O.galleryL1Mosaic)), u.tn.settings.mosaic.l1.la = JSON.parse(JSON.stringify(u.O.galleryL1Mosaic)), u.tn.settings.mosaic.l1.xl = JSON.parse(JSON.stringify(u.O.galleryL1Mosaic)), u.tn.settings.mosaicCalcFactor("l1", "xs"), u.tn.settings.mosaicCalcFactor("l1", "sm"), u.tn.settings.mosaicCalcFactor("l1", "me"), u.tn.settings.mosaicCalcFactor("l1", "la"), u.tn.settings.mosaicCalcFactor("l1", "xl"));
                    for (var O = ["xs", "sm", "me", "la", "xl"], y = 0; y < O.length; y++) null != u.O["galleryMosaic" + O[y].toUpperCase()] && (u.tn.settings.mosaic.lN[O[y]] = JSON.parse(JSON.stringify(u.O["galleryMosaic" + O[y].toUpperCase()])), u.tn.settings.mosaic.l1[O[y]] = JSON.parse(JSON.stringify(u.O["galleryMosaic" + O[y].toUpperCase()])), u.tn.settings.mosaicCalcFactor("lN", O[y]), u.tn.settings.mosaicCalcFactor("l1", O[y]));
                    for (y = 0; y < O.length; y++) null != u.O["galleryL1Mosaic" + O[y].toUpperCase()] && (u.tn.settings.mosaic.l1[O[y]] = JSON.parse(JSON.stringify(u.O["galleryL1Mosaic" + O[y].toUpperCase()])), u.tn.settings.mosaicCalcFactor("l1", O[y]));
                    switch (u.O.imageTransition = u.O.imageTransition.toUpperCase(), u.layout.SetEngine(), u.O.kind) {
                        case "":
                            break;
                        default:
                            jQuery.nanogallery2["data_" + u.O.kind](u, "Init")
                    }
                }(), function () {
                    Function.prototype.bind || (Function.prototype.bind = function (e) {
                        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                        var t = Array.prototype.slice.call(arguments, 1),
                            n = this,
                            i = function () {},
                            a = function () {
                                return n.apply(this instanceof i && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
                            };
                        return i.prototype = this.prototype, a.prototype = new i, a
                    });
                    // thanks to @lichtamberg - https://github.com/lichtamberg
                    (function () {
                        for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
                        window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
                            var i = (new Date).getTime(),
                                a = Math.max(0, 16 - (i - e)),
                                o = window.setTimeout((function () {
                                    t(i + a)
                                }), a);
                            return e = i + a, o
                        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
                            clearTimeout(e)
                        })
                    })(), Array.prototype.ngy2removeIf = function (e) {
                        for (var t = this.length; t--;) e(this[t], t) && this.splice(t, 1)
                    }, String.prototype.startsWith || (String.prototype.startsWith = function (e, t) {
                        return t = t || 0, this.indexOf(e, t) === t
                    })
                }(), function () {
                    var e = u.$E.base.children();
                    e.length > 0 && (u.O.$markup = e);
                    if (!u.O.lightboxStandalone) {
                        u.$E.base.text(""), u.$E.base.addClass("ngy2_container"), u.$E.base.addClass(u.O.theme),
                            function () {
                                void 0 !== u.O.colorScheme && (u.O.galleryTheme = u.O.colorScheme);
                                var e = null,
                                    t = "";
                                switch (r(u.O.galleryTheme)) {
                                    case "object":
                                        e = u.galleryTheme_dark, jQuery.extend(!0, e, u.O.galleryTheme), t = "nanogallery_gallerytheme_custom_" + u.baseEltID;
                                        break;
                                    case "string":
                                        switch (u.O.galleryTheme) {
                                            case "light":
                                                e = u.galleryTheme_light, t = "nanogallery_gallerytheme_light_" + u.baseEltID;
                                                break;
                                            case "default":
                                            case "dark":
                                            case "none":
                                            default:
                                                e = u.galleryTheme_dark, t = "nanogallery_gallerytheme_dark_" + u.baseEltID
                                        }
                                        break;
                                    default:
                                        return void h(u, "Error in galleryTheme parameter.")
                                }
                                var n = "." + t + " ",
                                    i = e.navigationBar,
                                    a = n + ".nGY2Navigationbar { background:" + i.background + "; }\n";
                                void 0 !== i.border && "" !== i.border && (a += n + ".nGY2Navigationbar { border:" + i.border + "; }\n");
                                void 0 !== i.borderTop && "" !== i.borderTop && (a += n + ".nGY2Navigationbar { border-top:" + i.borderTop + "; }\n");
                                void 0 !== i.borderBottom && "" !== i.borderBottom && (a += n + ".nGY2Navigationbar { border-bottom:" + i.borderBottom + "; }\n");
                                void 0 !== i.borderRight && "" !== i.borderRight && (a += n + ".nGY2Navigationbar { border-right:" + i.borderRight + "; }\n");
                                void 0 !== i.borderLeft && "" !== i.borderLeft && (a += n + ".nGY2Navigationbar { border-left:" + i.borderLeft + "; }\n");
                                i = e.navigationBreadcrumb;
                                a += n + ".nGY2Breadcrumb { background:" + i.background + "; border-radius:" + i.borderRadius + "; }\n", a += n + ".nGY2Breadcrumb .oneItem  { color:" + i.color + "; }\n", a += n + ".nGY2Breadcrumb .oneItem:hover { color:" + i.colorHover + "; }\n";
                                i = e.navigationFilter;
                                a += n + ".nGY2NavFilterUnselected { color:" + i.color + "; background:" + i.background + "; border-radius:" + i.borderRadius + "; }\n", a += n + ".nGY2NavFilterSelected { color:" + i.colorSelected + "; background:" + i.backgroundSelected + "; border-radius:" + i.borderRadius + "; }\n", a += n + ".nGY2NavFilterSelectAll { color:" + i.colorSelected + "; background:" + i.background + "; border-radius:" + i.borderRadius + "; }\n";
                                i = e.navigationPagination;
                                a += n + ".nGY2NavPagination { color:" + i.color + "; background:" + i.background + "; border-radius:" + i.borderRadius + "; }\n", a += n + ".nGY2NavPagination:hover { color:" + i.colorHover + "; }\n";
                                i = e.thumbnail;
                                a += n + ".nGY2GThumbnail { border-radius: " + i.borderRadius + "; background:" + i.background + "; border-color:" + i.borderColor + "; }\n", a += n + ".nGY2GThumbnail_l1 { border-top-width:" + u.tn.opt.l1.borderVertical + "px; border-right-width:" + u.tn.opt.l1.borderHorizontal + "px; border-bottom-width:" + u.tn.opt.l1.borderVertical + "px; border-left-width:" + u.tn.opt.l1.borderHorizontal + "px;}\n", a += n + ".nGY2GThumbnail_lN { border-top-width:" + u.tn.opt.lN.borderVertical + "px; border-right-width:" + u.tn.opt.lN.borderHorizontal + "px; border-bottom-width:" + u.tn.opt.lN.borderVertical + "px; border-left-width:" + u.tn.opt.lN.borderHorizontal + "px;}\n", a += n + ".nGY2GThumbnailStack { background:" + i.stackBackground + "; }\n", a += n + ".nGY2TnImgBack { background:" + i.background + "; background-image:" + i.backgroundImage + "; }\n", a += n + ".nGY2GThumbnailAlbumUp { background:" + i.background + "; background-image:" + i.backgroundImage + "; color:" + e.thumbnail.titleColor + "; }\n", a += n + ".nGY2GThumbnailIconsFullThumbnail { color:" + i.titleColor + "; }\n", a += n + ".nGY2GThumbnailLabel { background:" + i.labelBackground + "; opacity:" + i.labelOpacity + "; }\n", a += n + ".nGY2GThumbnailImageTitle  { color:" + i.titleColor + "; background-color:" + i.titleBgColor + "; " + ("" == i.titleShadow ? "" : "Text-Shadow:" + i.titleShadow + ";") + " }\n", a += n + ".nGY2GThumbnailAlbumTitle { color:" + i.titleColor + "; background-color:" + i.titleBgColor + "; " + ("" == i.titleShadow ? "" : "Text-Shadow:" + i.titleShadow + ";") + " }\n", a += n + ".nGY2GThumbnailDescription { color:" + i.descriptionColor + "; background-color:" + i.descriptionBgColor + "; " + ("" == i.descriptionShadow ? "" : "Text-Shadow:" + i.descriptionShadow + ";") + " }\n";
                                i = e.thumbnailIcon;
                                a += n + ".nGY2GThumbnailIcons { padding:" + i.padding + "; }\n", a += n + ".nGY2GThumbnailIcon { color:" + i.color + "; " + ("" == i.shadow ? "" : "Text-Shadow:" + i.shadow + ";") + " }\n", a += n + ".nGY2GThumbnailIconTextBadge { background-color:" + i.color + "; }\n";
                                i = e.pagination;
                                "NUMBERS" != u.O.galleryPaginationMode ? (a += n + ".nGY2paginationDot { border:" + i.shapeBorder + "; background:" + i.shapeColor + ";}\n", a += n + ".nGY2paginationDotCurrentPage { border:" + i.shapeBorder + "; background:" + i.shapeSelectedColor + ";}\n", a += n + ".nGY2paginationRectangle { border:" + i.shapeBorder + "; background:" + i.shapeColor + ";}\n", a += n + ".nGY2paginationRectangleCurrentPage { border:" + i.shapeBorder + "; background:" + i.shapeSelectedColor + ";}\n") : (a += n + ".nGY2paginationItem { background:" + i.background + "; color:" + i.color + "; border-radius:" + i.borderRadius + "; }\n", a += n + ".nGY2paginationItemCurrentPage { background:" + i.background + "; color:" + i.color + "; border-radius:" + i.borderRadius + "; }\n", a += n + ".nGY2PaginationPrev { background:" + i.background + "; color:" + i.color + "; border-radius:" + i.borderRadius + "; }\n", a += n + ".nGY2PaginationNext { background:" + i.background + "; color:" + i.color + "; border-radius:" + i.borderRadius + "; }\n", a += n + ".nGY2paginationItemCurrentPage { background:" + i.backgroundSelected + "; }\n");
                                i = e.thumbnail;
                                a += n + ".nGY2GalleryMoreButtonAnnotation { background:" + i.background + "; border-color:" + i.borderColor + "; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px;}\n", a += n + ".nGY2GalleryMoreButtonAnnotation  { color:" + i.titleColor + "; " + ("" == i.titleShadow ? "" : "Text-Shadow:" + i.titleShadow) + "; }\n", jQuery("head").append('<style id="ngycs_' + u.baseEltID + '">' + a + "</style>"), u.$E.base.addClass(t)
                            }(), u.O.thumbnailLabel.get("hideIcons") && (u.O.icons.thumbnailAlbum = "", u.O.icons.thumbnailImage = "");
                        var t = "";
                        switch (null != u.O.navigationFontSize && "" != u.O.navigationFontSize && (t = ' style="font-size:' + u.O.navigationFontSize + ';"'), u.$E.conNavigationBar = jQuery('<div class="nGY2Navigationbar" ' + t + "></div>").appendTo(u.$E.base), u.$E.conLoadingB = jQuery('<div class="nanoGalleryLBarOff"><div></div><div></div><div></div><div></div><div></div></div>').appendTo(u.$E.base), u.$E.conTnParent = jQuery('<div class="nGY2Gallery"></div>').appendTo(u.$E.base), u.$E.conTn = jQuery('<div class="nGY2GallerySub"></div>').appendTo(u.$E.conTnParent), u.O.thumbnailAlignment) {
                            case "left":
                                u.$E.conTnParent.css({
                                    "text-align": "left"
                                });
                                break;
                            case "right":
                                u.$E.conTnParent.css({
                                    "text-align": "right"
                                })
                        }
                        if (void 0 !== u.O.galleryBuildInit2)
                            for (var n = u.O.galleryBuildInit2.split("|"), i = 0; i < n.length; i++) {
                                var a = n[i].split("_");
                                2 == a.length && u.$E.conTn.css(a[0], a[1])
                            }
                        for (var o = u.tn.hoverEffects.std.concat(u.tn.hoverEffects.level1), l = 0; l < o.length; l++) switch (o[l].type) {
                            case "scale":
                            case "rotateZ":
                            case "rotateX":
                            case "rotateY":
                            case "translateX":
                            case "translateY":
                                ".nGY2GThumbnail" == o[l].element && (u.$E.base.css("overflow", "visible"), u.$E.base.find(".nGY2GallerySub").css("overflow", "visible"), u.$E.conTnParent.css("overflow", "visible"))
                        }
                        if (u.$E.conTnBottom = jQuery('<div class="nGY2GalleryBottom" ' + t + "></div>").appendTo(u.$E.conTnParent), u.O.portable) {
                            var s = "font-weight:bold !important;color: #FF0075 !important;font-size: 14px !important;text-transform: lowercase !important;cursor:pointer !important;text-align: center !important;Text-Shadow: #000000 1px 0px 0px, #000000 1px 1px 0px, #000000 1px -1px 0px, #000000 -1px 1px 0px, #000000 -1px 0px 0px, #000000 -1px -1px 0px, #000000 0px 1px 0px, #000000 0px -1px 0px !important;";
                            u.$E.ngy2i = jQuery('<div class="nGY2PortInfo"><a href="http://nano.gallery" target="_blank" title="nanogallery2 | easy photo gallery for your website" style="' + s + '"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4QgDBCAWVVC/hwAABRxJREFUSMetll9oVFcexz/nnDvJRBmSzWTrmD9uNGZsHta0/qFIFQTxRcnCBgTFNlX0YR8W+1AK9lGwCBJYgn0KKr5136S4gpUQTR4caJRslcxYWV3iaphQapJJppO5957z60Mmk4mN1q75wg/OPefc+/v9vt/fueenKEFEqICqsNWAVNiCA7XwaS0iZeejo6OIiCltdIBdJXMLOYp5/PjxsoTVS5nr0mYDJIE/lObeBhaYAn4oJbboAwBvBedHJicnPx8YGGh/8eJF1dvKoJSShoYGf//+/Zl4PP4l8M2yIEoSLErx6c2bN6W1tXVRglWzLVu2SCqVEhE5LiI457SIoEREW2udMaZtcnLy+2QyWZ3L5XRHR4f+4MNdoBUahUJhcWilmZ/NE4ZhOQHn3LIi1lqjtS6vjY6O8uTJE9vc3MyDBw+mYrHYn0Uk63me8gCtlHLA7uHh4bW5XC7oePddPTQ8xHffDjM/PYe3thqMws35iAcHPj5ENBp9Yxmy2Sw7d+40z549C+7du9ewb9++D6y13wDaK+kE0DAzMyNKKbXtvfd5EfzM+Ef/4C+8x23+wzPm+IhtfMf3/Ksuyl+7u9FaY63l+vXrpFIpCoUCmzdvpquri9bWVoIgQClFIpFg48aNPH/+XE9NTQkQLTGmvEXKRERprZWIEIYhQRjQbN6hmUb+tCaPNnM055v40f3If7XBGMPT8af0fNLD0NDQsozPnDlDb28vx44dIwxDRARrLSKCKmUbiUQQkWWnoLJ20UpjFYAjVA6rBJTFV5ZIJIIfBBw4eICxsTHq6uo4dOgQ8XicgYEB7t69y/Hjx4nH43R1dVHB8q+w4hlXSmGd5edwmjCco5DLkZ+aJvTnyIdTrFmzhn9+/TVjY2M0NTVx+/Zt+vv7OXfuHKlUip6eHgBOnz6N7/vlYl0JKzIw78/T+sdGbn6yjf5ZS2HtJgIP+mcC5kySI1uSXPjqAlprTp06RWdnJ8ViEaUUVVVVnD9/nqtXr5LJZHj48CFbt279fQEEYUisZi2fXel9bWU750gmkwRBgNYaz/Ow1lJfX088Hmd2dpZcLvdaBl4pgQChH4B1iHU4a8E6Qj9ARGhpaUFrzeDgIJFIBGMM1lqMMWQyGSYmJohEIqxfv/7314CIoADtGTAaZTTaLI2VUhw+fBjnHBcvXuTy5cs45/A8j3Q6zcmTJ/F9n71799LW1rbgSOs3D+B1lBljcM7R3d3N0aNHKRQKnDhxgs7OTnbt2sX27dsZGRkhHo/T19e3+Kt/fQ1YawFwzolSCs/zUEqVtX1VcJcuXSKRSNDf3086nS6v79mzh76+Pjo6OigWi1RXV2OMWZC29PL8/PxSAL7vE41Gf4rFYkpEePToEb7vU1VVxW+ht7eXs2fPcv/+fQqFAps2baKlpaW8Xl1dTS6XY3x8HBFxtbW1BiiW4hAlInp8fNxt2LChPZvN/ru9vT2Sz+e93bt3qx07diwrzJWYcM5RU1NDNBots5bP53HOlS+kO3fuMDIy4hKJhKTT6ena2tqtxWJxoqamRr98HX9x7do1qaurExYaiXCVzK5bt04GBwdFRP728nVcWZAO+Hsmk/nsxo0bTTMzM5FXHZ83hYhQX1/vHzx48H9tbW1ngSsVvpYCmJ2dJRaLKRbapjpgOxB7K+9LmAbuAnOAnpiYcI2NjUsRLlo2myUMQ1M5t5rmnDO3bt1aNlfmd4W2XL/0/H8pUDF2rNCW/wLRuCkxx8V6wgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wOC0wM1QwNDozMjoyMi0wNDowMO7mdkwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDgtMDNUMDQ6MzI6MjItMDQ6MDCfu87wAAAAAElFTkSuQmCC" style="height:32px !important;width:initial !important;box-shadow: none !important;vertical-align: middle !important;"/> &nbsp; nanogallery2</a></div>').appendTo(u.$E.base), u.$E.ngy2i.find("a").on({
                                mouseenter: function () {
                                    jQuery(this).attr("style", s)
                                },
                                mouseleave: function () {
                                    jQuery(this).attr("style", s)
                                }
                            })
                        }
                    }
                    if (u.$E.conConsole = jQuery('<div class="nGY2ConsoleParent"></div>').appendTo(u.$E.base), function () {
                            u.i18nLang = (navigator.language || navigator.userLanguage).toUpperCase(), "UNDEFINED" === u.i18nLang && (u.i18nLang = "");
                            var e = -("_" + u.i18nLang).length;
                            if ("object" == r(u.O.i18n))
                                for (var t in u.O.i18n) {
                                    var n = t.substr(e);
                                    n == "_" + u.i18nLang ? u.i18nTranslations[t.substr(0, t.length - n.length)] = u.O.i18n[t] : u.i18nTranslations[t] = u.O.i18n[t]
                                }
                        }(), !u.O.lightboxStandalone) switch (function () {
                        le(u.O.thumbnailLabel, "lN"), void 0 !== u.O.thumbnailL1Label ? le(u.O.thumbnailL1Label, "l1") : le(u.O.thumbnailLabel, "l1");
                        u.O.thumbnailL1Label && u.O.thumbnailL1Label.display && le(u.O.thumbnailL1Label, "l1");
                        for (var e = ["xs", "sm", "me", "la", "xl"], t = 0; t < e.length; t++) {
                            if ("auto" != (i = u.tn.settings.width.lN[e[t]])) u.tn.defaultSize.width.lN[e[t]] = i, u.tn.defaultSize.width.l1[e[t]] = i;
                            else {
                                var n = u.tn.settings.height.lN[e[t]];
                                u.tn.defaultSize.width.lN[e[t]] = n, u.tn.defaultSize.width.l1[e[t]] = n
                            }
                        }
                        for (t = 0; t < e.length; t++) {
                            if ("auto" != (n = u.tn.settings.height.lN[e[t]])) u.tn.defaultSize.height.lN[e[t]] = n, u.tn.defaultSize.height.l1[e[t]] = n;
                            else {
                                var i = u.tn.settings.width.lN[e[t]];
                                u.tn.defaultSize.height.lN[e[t]] = i, u.tn.defaultSize.height.l1[e[t]] = i
                            }
                        }
                        for (t = 0; t < e.length; t++) {
                            if ("auto" != (i = u.tn.settings.width.l1[e[t]])) u.tn.defaultSize.width.l1[e[t]] = i;
                            else {
                                n = u.tn.settings.height.l1[e[t]];
                                u.tn.defaultSize.width.l1[e[t]] = n
                            }
                        }
                        for (t = 0; t < e.length; t++) {
                            if ("auto" != (n = u.tn.settings.height.l1[e[t]])) u.tn.defaultSize.height.l1[e[t]] = n;
                            else {
                                i = u.tn.settings.width.l1[e[t]];
                                u.tn.defaultSize.height.l1[e[t]] = i
                            }
                        }
                    }(), u.tn.opt.Get("displayTransition")) {
                        case "SCALEDOWN":
                        case "RANDOMSCALE":
                        default:
                            u.$E.base.css("overflow", "visible"), u.$E.conTnParent.css("overflow", "visible"), u.$E.conTn.css("overflow", "visible")
                    }
                }(), u.GOM.firstDisplayTime = Date.now(), function () {
                    u.O.lightboxStandalone || (u.$E.conTnParent.on({
                        mouseenter: be,
                        mouseleave: ve
                    }, ".nGY2GThumbnail"), u.GOM.hammertime = new NGHammer(u.$E.conTn[0]), u.GOM.hammertime.on("pan", (function (e) {
                        u.VOM.viewerDisplayed || u.O.paginationSwipe && u.layout.support.rows && "PAGINATION" == u.galleryDisplayMode.Get() && (Math.abs(e.deltaY) > u.GOM.panThreshold && (u.GOM.panYOnly = !0), u.GOM.panYOnly || u.$E.conTn.css(u.CSStransformName, "translate(" + e.deltaX + "px,0px)"))
                    })), u.GOM.hammertime.on("panend", (function (e) {
                        if (!u.VOM.viewerDisplayed && u.O.paginationSwipe && u.layout.support.rows && "PAGINATION" == u.galleryDisplayMode.Get()) {
                            if (!u.GOM.panYOnly) {
                                if (e.deltaX > 50) return void G();
                                if (e.deltaX < -50) return void y()
                            }
                            u.GOM.panYOnly = !1, u.$E.conTn.css(u.CSStransformName, "translate(0px,0px)")
                        }
                    })), u.GOM.hammertime.on("tap", (function (e) {
                        if (!u.VOM.viewerDisplayed)
                            if (e.srcEvent.stopPropagation(), e.srcEvent.preventDefault(), "mouse" == e.pointerType) {
                                if ("exit" == ue(e.srcEvent)) return
                            } else {
                                var t = Oe(e.srcEvent, !1);
                                if (-1 == t.GOMidx) return;
                                if ("NONE" != t.action && "OPEN" != t.action) return void ue(e.srcEvent);
                                if (u.GOM.slider.hostIdx == t.GOMidx) return j(), void ye(u.GOM.items[u.GOM.slider.currentIdx].thumbnailIdx, !0);
                                if ("l1" == u.GOM.curNavLevel && 0 == u.O.touchAnimationL1 || "lN" == u.GOM.curNavLevel && 0 == u.O.touchAnimation) return void ye(u.GOM.items[t.GOMidx].thumbnailIdx, !0);
                                u.O.touchAutoOpenDelay > 0 ? (j(), W(t.GOMidx), window.clearInterval(u.touchAutoOpenDelayTimerID), u.touchAutoOpenDelayTimerID = window.setInterval((function () {
                                    window.clearInterval(u.touchAutoOpenDelayTimerID), ye(u.GOM.items[t.GOMidx].thumbnailIdx, !0)
                                }), u.O.touchAutoOpenDelay)) : u.I[u.GOM.items[t.GOMidx].thumbnailIdx].hovered ? ye(u.GOM.items[t.GOMidx].thumbnailIdx, !0) : (j(), W(t.GOMidx))
                            }
                    })), u.O.locationHash && jQuery(window).on("hashchange.nanogallery2." + u.baseEltID, (function () {
                        ot()
                    })));
                    if (jQuery(window).on("resize.nanogallery2." + u.baseEltID + " orientationChange.nanogallery2." + u.baseEltID, s(lt, u.O.eventsDebounceDelay, !1)), jQuery(window).on("scroll.nanogallery2." + u.baseEltID, s(st, u.O.eventsDebounceDelay, !1)), !u.O.lightboxStandalone) {
                        u.$E.scrollableParent = it(u.$E.base[0]);
                        var e = it(u.$E.base[0]);
                        null !== e && (u.$E.scrollableParent = jQuery(e), u.$E.scrollableParent.on("scroll.nanogallery2." + u.baseEltID, s(st, u.O.eventsDebounceDelay, !1)))
                    }
                    u.VOM.toolsHide = s(Ye, u.O.viewerHideToolsDelay, !1), jQuery(document).keyup((function (e) {
                        if (u.popup.isDisplayed) switch (e.keyCode) {
                            case 27:
                                u.popup.close()
                        } else if (u.VOM.viewerDisplayed) switch (Ae(), e.keyCode) {
                            case 27:
                            case 40:
                            case 38:
                                tt();
                                break;
                            case 32:
                            case 13:
                                He();
                                break;
                            case 39:
                            case 33:
                                Qe();
                                break;
                            case 37:
                            case 34:
                                qe()
                        }
                    })), jQuery(window).bind("mousewheel wheel", (function (e) {
                        if (u.VOM.viewerDisplayed && "img" == u.VOM.content.current.NGY2Item().mediaKind) {
                            var t = 0;
                            e.preventDefault(), Ie() && (e.originalEvent.deltaY ? t = e.originalEvent.deltaY : e.originalEvent.wheelDelta && (t = -e.originalEvent.wheelDelta), Te(t <= 0))
                        }
                    })), jQuery(window).bind("mousemove", (function (e) {
                        u.VOM.viewerDisplayed && 0 == u.VOM.toolbarsDisplayed && (u.VOM.singletapTime = (new Date).getTime(), s(Ae, 100, !1)())
                    })), ngscreenfull.enabled && ngscreenfull.onchange((function () {
                        u.VOM.viewerDisplayed && (ngscreenfull.isFullscreen ? (u.VOM.viewerIsFullscreen = !0, u.VOM.$viewer.find(".fullscreenButton").html(u.O.icons.viewerFullscreenOff)) : (u.VOM.viewerIsFullscreen = !1, u.VOM.$viewer.find(".fullscreenButton").html(u.O.icons.viewerFullscreenOn)))
                    }))
                }(), !u.O.lightboxStandalone) {
                var o = u.O.album;
                if ("" == o && "" != u.O.photoset && (o = u.O.photoset, u.O.album = u.O.photoset), "" != o && (u.O.displayBreadcrumb = !1, "NONE" != o.toUpperCase())) return "nano_photos_provider2" == u.O.kind && o == decodeURIComponent(o) && (o = encodeURIComponent(o), u.O.album = o), NGY2Item.New(u, "", "", o, "-1", "album"), void(ot() || g("-1", o))
            }
            NGY2Item.New(u, u.i18nTranslations.breadcrumbHome, "", "0", "-1", "album"), ot() || function () {
                if (u.O.lightboxStandalone) ! function () {
                    if (u.GOM.curNavLevel = "l1", null == u.O.items) {
                        var e = jQuery("[data-nanogallery2-Lightbox"),
                            t = u.$E.base[0].dataset.nanogallery2Lgroup;
                        te(e, t)
                    } else K();
                    m()
                }();
                else if ("" != u.O.openOnStart) {
                    var e = p(u.O.openOnStart);
                    "0" != e.imageID ? Q(e.imageID, e.albumID) : g("-1", e.albumID)
                } else g("-1", 0)
            }()
        };
        var Z = {
            youtube: {
                getID: function (e) {
                    var t = e.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                    return null != t ? t[1] : null
                },
                thumbUrl: function (e) {
                    return "https://img.youtube.com/vi/" + e + "/hqdefault.jpg"
                },
                url: function (e) {
                    return "https://www.youtube.com/embed/" + e
                },
                markup: function (e) {
                    return '<iframe class="nGY2ViewerMedia" src="https://www.youtube.com/embed/' + e + '?rel=0" frameborder="0" allow="autoplay" allowfullscreen></iframe>'
                },
                kind: "iframe"
            },
            vimeo: {
                getID: function (e) {
                    var t = e.match(/(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/);
                    return null != t ? t[4] : null
                },
                url: function (e) {
                    return "https://player.vimeo.com/video/" + e
                },
                markup: function (e) {
                    return '<iframe class="nGY2ViewerMedia" src="https://player.vimeo.com/video/' + e + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
                },
                kind: "iframe"
            },
            dailymotion: {
                getID: function (e) {
                    var t = e.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                    return null !== t ? void 0 !== t[4] ? t[4] : t[2] : null
                },
                thumbUrl: function (e) {
                    return "https://www.dailymotion.com/thumbnail/video/" + e
                },
                url: function (e) {
                    return "https://www.dailymotion.com/embed/video/" + e
                },
                markup: function (e) {
                    return '<iframe class="nGY2ViewerMedia" src="https://www.dailymotion.com/embed/video/' + e + '?rel=0" frameborder="0" allow="autoplay" allowfullscreen></iframe>'
                },
                kind: "iframe"
            },
            selfhosted: {
                getID: function (e) {
                    var t = e.split(".").pop().toLowerCase();
                    return "mp4" === t || "webm" === t || "ogv" === t || "3gp" === t ? t : null
                },
                markup: function (e) {
                    var t = e.split(".").pop();
                    return '<video controls class="nGY2ViewerMedia"><source src="' + e + '" type="video/' + t + '" preload="auto">Your browser does not support the video tag (HTML 5).</video>'
                },
                kind: "video",
                selfhosted: !0
            }
        };

        function J(e) {
            if (null == e) return !1;
            return !!/^((http|https|ftp|ftps|file):\/\/)/.test(e)
        }

        function K() {
            var e = 0,
                t = NGY2Tools.AlbumPostProcess.bind(u);
            u.I[0].contentIsLoaded = !0, jQuery.each(u.O.items, (function (n, a) {
                var o = "";
                void 0 === (o = ct(a, "title")) && (o = "");
                var r = "";
                J(r = void 0 !== a["src" + ht().toUpperCase()] ? a["src" + ht().toUpperCase()] : a.src) || (r = u.O.itemsBaseURL + r);
                var l = "";
                void 0 !== a.srct && a.srct.length > 0 ? J(l = a.srct) || (l = u.O.itemsBaseURL + l) : l = r, "" != u.O.thumbnailLabel.get("title") && (o = GetImageTitle(r));
                var s = "";
                void 0 === (s = ct(a, "description")) && (s = "");
                var c = ct(a, "tags");
                void 0 === c && (c = "");
                var h = 0;
                void 0 !== a.albumID && (h = a.albumID, !0);
                var d = null;
                void 0 !== a.ID && (d = a.ID);
                var m = "image";
                void 0 !== a.kind && a.kind.length > 0 && (m = a.kind);
                var p = NGY2Item.New(u, o, s, d, h, m, c);
                "" != o && e++, p.setMediaURL(r, "img"), jQuery.each(Z, (function (e, t) {
                    var n = t.getID(r);
                    if (null != n) return l == r && "function" == typeof t.thumbUrl && (l = t.thumbUrl(n)), "function" == typeof t.url && (r = t.url(n)), p.mediaKind = t.kind, p.mediaMarkup = t.selfhosted ? t.markup(r) : t.markup(n), !1
                })), void 0 !== a.imageWidth && (p.imageWidth = a.width), void 0 !== a.imageHeight && (p.imageHeight = a.height);
                var g = void 0 !== a.imgtWidth ? a.imgtWidth : 0,
                    f = void 0 !== a.imgtHeight ? a.imgtHeight : 0;
                if (p.thumbs = {
                        url: {
                            l1: {
                                xs: l,
                                sm: l,
                                me: l,
                                la: l,
                                xl: l
                            },
                            lN: {
                                xs: l,
                                sm: l,
                                me: l,
                                la: l,
                                xl: l
                            }
                        },
                        width: {
                            l1: {
                                xs: g,
                                sm: g,
                                me: g,
                                la: g,
                                xl: g
                            },
                            lN: {
                                xs: g,
                                sm: g,
                                me: g,
                                la: g,
                                xl: g
                            }
                        },
                        height: {
                            l1: {
                                xs: f,
                                sm: f,
                                me: f,
                                la: f,
                                xl: f
                            },
                            lN: {
                                xs: f,
                                sm: f,
                                me: f,
                                la: f,
                                xl: f
                            }
                        }
                    }, "img" == p.mediaKind) {
                    var b = ["xs", "sm", "me", "la", "xl"];
                    for (n = 0; n < b.length; n++) {
                        var v = a["srct" + b[n].toUpperCase()];
                        void 0 !== v && (J(v) || (v = u.O.itemsBaseURL + v), p.url.l1[b[n]] = v, p.url.lN[b[n]] = v), null != (g = a["imgt" + b[n].toUpperCase() + "Width"]) && (p.width.l1[b[n]] = parseInt(g), p.width.lN[b[n]] = parseInt(g)), null != (f = a["imgt" + b[n].toUpperCase() + "Height"]) && (p.height.l1[b[n]] = parseInt(f), p.height.lN[b[n]] = parseInt(f))
                    }
                }
                void 0 !== a.imageDominantColors && (p.imageDominantColors = a.imageDominantColors), void 0 !== a.imageDominantColor && (p.imageDominantColor = a.imageDominantColor), void 0 !== a.destURL && a.destURL.length > 0 && (p.destinationURL = a.destURL), void 0 !== a.downloadURL && a.downloadURL.length > 0 && (p.downloadURL = a.downloadURL), void 0 !== a.exifModel && (p.exif.model = a.exifModel), void 0 !== a.exifFlash && (p.exif.flash = a.exifFlash), void 0 !== a.exifFocalLength && (p.exif.focallength = a.exifFocalLength), void 0 !== a.exifFStop && (p.exif.fstop = a.exifFStop), void 0 !== a.exifExposure && (p.exif.exposure = a.exifExposure), void 0 !== a.exifIso && (p.exif.iso = a.exifIso), void 0 !== a.exifTime && (p.exif.time = a.exifTime), void 0 !== a.exifLocation && (p.exif.location = a.exifLocation), null !== a.customData && (p.customData = i(a.customData)), p.contentIsLoaded = !0;
                var O = u.O.fnProcessData;
                null !== O && ("function" == typeof O ? O(p, "api", a) : window[O](p, "api", a)), t(h)
            })), 0 == e && (u.O.thumbnailLabel.display = !1)
        }

        function ee(e) {
            var t = "";
            return void 0 !== e.childNodes[0] && null !== e.childNodes[0].nodeValue && void 0 !== e.childNodes[0].nodeValue && (t = e.childNodes[0].nodeValue.trim()), t
        }

        function te(t, n) {
            var a = 0,
                o = NGY2Tools.AlbumPostProcess.bind(u),
                r = NGY2Tools.GetImageTitleFromURL.bind(u);
            u.I[0].contentIsLoaded = !0, jQuery.each(t, (function (t, l) {
                if (l.dataset.nanogallery2Lgroup == n && "SCRIPT" != l.nodeName) {
                    var s = {
                        "data-ngdesc": "",
                        "data-ngid": null,
                        "data-ngkind": "image",
                        "data-ngtags": null,
                        "data-ngdest": "",
                        "data-ngthumbimgwidth": 0,
                        "data-ngthumbimgheight": 0,
                        "data-ngimagewidth": 0,
                        "data-ngimageheight": 0,
                        "data-ngimagedominantcolors": null,
                        "data-ngimagedominantcolor": null,
                        "data-ngexifmodel": "",
                        "data-ngexifflash": "",
                        "data-ngexiffocallength": "",
                        "data-ngexiffstop": "",
                        "data-ngexifexposure": "",
                        "data-ngexifiso": "",
                        "data-ngexiftime": "",
                        "data-ngexiflocation": "",
                        "data-ngsrc": "",
                        alt: ""
                    };
                    [].forEach.call(l.attributes, (function (e) {
                        s[e.name.toLowerCase()] = e.value.trim()
                    }));
                    var c = ee(l);
                    "" == c && "" != s.alt && (c = s.alt), jQuery.each(e(l).children(), (function (e, t) {
                        "" == c && (c = ee(t)), [].forEach.call(t.attributes, (function (e) {
                            s[e.name.toLowerCase()] = e.value.trim()
                        })), "" == c && "" != s.alt && (c = s.alt)
                    }));
                    var h = "",
                        d = ht().toUpperCase();
                    s.hasOwnProperty("data-ngsrc" + d) && (h = s["data-ngsrc" + d]), void 0 === (h = h || s["data-ngsrc"] || s.href) || J(h) || (h = u.O.itemsBaseURL + h);
                    var m = "";
                    if (s.hasOwnProperty("src") && (m = s.src), "" == m && s.hasOwnProperty("data-ngthumb") && (m = s["data-ngthumb"]), "" == m && (m = h), void 0 === m || J(m) || (m = u.O.itemsBaseURL + m), void 0 !== h || void 0 !== m) {
                        var p = s["data-ngdesc"],
                            g = s.id || s["data-ngid"],
                            f = s["data-ngkind"],
                            b = s["data-ngtags"],
                            v = "0";
                        s.hasOwnProperty("data-ngalbumid") && (v = s["data-ngalbumid"], !0);
                        var O = r(h);
                        "" != O && (c = O);
                        var y = NGY2Item.New(u, c, p, g, v, f, b);
                        "" != c && a++, y.setMediaURL(h, "img"), jQuery.each(Z, (function (e, t) {
                            var n = t.getID(h);
                            if (null != n) return m == h && "function" == typeof t.thumbUrl && (m = t.thumbUrl(n)), "function" == typeof t.url && (h = t.url(n)), y.mediaKind = t.kind, y.mediaMarkup = t.selfhosted ? t.markup(h) : t.markup(n), !1
                        })), y.imageWidth = parseInt(s["data-ngimagewidth"]), y.imageHeight = parseInt(s["data-ngimageheight"]);
                        var G = parseInt(s["data-ngthumbimgwidth"]),
                            M = parseInt(s["data-ngthumbimgheight"]);
                        if (y.thumbs = {
                                url: {
                                    l1: {
                                        xs: m,
                                        sm: m,
                                        me: m,
                                        la: m,
                                        xl: m
                                    },
                                    lN: {
                                        xs: m,
                                        sm: m,
                                        me: m,
                                        la: m,
                                        xl: m
                                    }
                                },
                                width: {
                                    l1: {
                                        xs: G,
                                        sm: G,
                                        me: G,
                                        la: G,
                                        xl: G
                                    },
                                    lN: {
                                        xs: G,
                                        sm: G,
                                        me: G,
                                        la: G,
                                        xl: G
                                    }
                                },
                                height: {
                                    l1: {
                                        xs: M,
                                        sm: M,
                                        me: M,
                                        la: M,
                                        xl: M
                                    },
                                    lN: {
                                        xs: M,
                                        sm: M,
                                        me: M,
                                        la: M,
                                        xl: M
                                    }
                                }
                            }, "img" == y.mediaKind) {
                            var w = ["xs", "sm", "me", "la", "xl"];
                            for (t = 0; t < w.length; t++) {
                                if (s.hasOwnProperty("data-ngthumb" + w[t])) {
                                    var I = s["data-ngthumb" + w[t]];
                                    J(I) || (I = u.O.itemsBaseURL + I), y.url.l1[w[t]] = I, y.url.lN[w[t]] = I
                                }
                                if (s.hasOwnProperty("data-ngthumb" + w[t] + "width")) {
                                    G = parseInt(s["data-ngthumb" + w[t] + "width"]);
                                    y.width.l1[w[t]] = G, y.width.lN[w[t]] = G
                                }
                                if (s.hasOwnProperty("data-ngthumb" + w[t] + "height")) {
                                    M = parseInt("data-ngthumb" + w[t] + "height");
                                    y.height.l1[w[t]] = M, y.height.lN[w[t]] = M
                                }
                            }
                        }
                        y.imageDominantColors = s["data-ngimagedominantcolors"], y.imageDominantColor = s["data-ngimagedominantcolors"], y.destinationURL = s["data-ngdest"], y.downloadURL = s["data-ngdownloadurl"], y.exif.model = s["data-ngexifmodel"], y.exif.flash = s["data-ngexifflash"], y.exif.focallength = s["data-ngexiffocallength"], y.exif.fstop = s["data-ngexiffstop"], y.exif.exposure = s["data-ngexifexposure"], y.exif.iso = s["data-ngexifiso"], y.exif.time = s["data-ngexiftime"], y.exif.location = s["data-ngexiflocation"], y.contentIsLoaded = !0, void 0 !== jQuery(l).data("customdata") && (y.customData = i(jQuery(l).data("customdata"))), void 0 !== jQuery(l).data("ngcustomdata") && (y.customData = i(jQuery(l).data("ngcustomdata")));
                        var T = u.O.fnProcessData;
                        null !== T && ("function" == typeof T ? T(y, "markup", l) : window[T](y, "markup", l)), o(v)
                    }
                }
            })), 0 == a && (u.O.thumbnailLabel.display = !1)
        }

        function ne(e, t) {
            var n = ["easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic", "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint", "easeInSine", "easeOutSine", "easeInOutSine", "easeInExpo", "easeOutExpo", "easeInOutExpo", "easeInCirc", "easeOutCirc", "easeInOutCirc", "easeOutBounce", "easeInBack", "easeOutBack", "easeInOutBack", "elastic", "bounce"],
                i = e.split("_");
            if (i.length >= 4) {
                if (t.name = "", t.type = i[1], t.from = i[2], t.to = i[3], i.length >= 5)
                    for (var a = 4; a < i.length; a++) {
                        for (var o = i[a], r = !1, l = 0; l < n.length; l++)
                            if (o == n[l]) {
                                r = !0, t.easing = o;
                                break
                            } if (!0 !== r)
                            if ("HOVERIN" != (o = o.toUpperCase()))
                                if ("HOVEROUT" != o)
                                    if ("KEYFRAME" != o) {
                                        var s = parseInt(o.replace(/[^0-9\.]/g, ""), 10);
                                        if (s > 0) {
                                            if (o.indexOf("DURATION") >= 0) {
                                                t.duration = s;
                                                continue
                                            }
                                            if (o.indexOf("DURATIONBACK") >= 0) {
                                                t.durationBack = s;
                                                continue
                                            }
                                            if (o.indexOf("DELAY") >= 0) {
                                                t.delay = s;
                                                continue
                                            }
                                            if (o.indexOf("DELAYBACK") >= 0) {
                                                t.delayBack = s;
                                                continue
                                            }
                                            t.duration = s
                                        }
                                    } else t.firstKeyframe = !1;
                        else t.hoverin = !1;
                        else t.hoverout = !1
                    }
                t.element = ie(i[0], t.type)
            } else t.name = e;
            return t
        }

        function ie(e, t) {
            var n = {
                image: ".nGY2GThumbnailImage",
                thumbnail: ".nGY2GThumbnail",
                label: ".nGY2GThumbnailLabel",
                title: ".nGY2GThumbnailTitle",
                description: ".nGY2GThumbnailDescription",
                tools: ".nGY2GThumbnailIcons",
                customlayer: ".nGY2GThumbnailCustomLayer",
                default: "nGY2GThumbnailImage"
            };
            return n[e] || n.default
        }

        function ae(e) {
            for (var a = [], o = 0; o < e.length; o++) switch (e[o].name.toUpperCase()) {
                case "BORDERLIGHTER": {
                    let i = t(se().thumbnail.borderColor),
                        r = "thumbnail_borderColor_" + i + "_" + n(.5, i);
                    a.push(ne(r, e[o]));
                    break
                }
                case "BORDERDARKER": {
                    let i = t(se().thumbnail.borderColor),
                        r = "thumbnail_borderColor_" + i + "_" + n(-.5, i);
                    a.push(ne(r, e[o]));
                    break
                }
                case "SCALE120":
                    a.push(ne("thumbnail_scale_1.00_1.20", e[o]));
                    break;
                case "LABELAPPEAR":
                case "LABELAPPEAR75":
                    a.push(ne("label_opacity_0.00_1.00", e[o]));
                    break;
                case "TOOLSAPPEAR":
                    a.push(ne("tools_opacity_0_1", e[o]));
                    break;
                case "TOOLSSLIDEDOWN":
                    a.push(ne("tools_translateY_-100%_0%", e[o]));
                    break;
                case "TOOLSSLIDEUP":
                    a.push(ne("tools_translateY_100%_0%", e[o]));
                    break;
                case "LABELOPACITY50":
                    a.push(ne("label_opacity_1.00_0.50", e[o]));
                    break;
                case "LABELSLIDEUPTOP":
                case "LABELSLIDEUP":
                    a.push(ne("label_translateY_100%_0%", e[o])), a.push(ne("label_translateY_100%_0%", e[o]));
                    break;
                case "LABELSLIDEDOWN":
                    a.push(ne("label_translateY_-100%_0%", e[o]));
                    break;
                case "SCALELABELOVERIMAGE":
                    a.push(ne("label_scale_0.00_1.00", e[o]));
                    var r = i(e[o]);
                    a.push(ne("image_scale_1.00_0.00", r));
                    break;
                case "OVERSCALE":
                case "OVERSCALEOUTSIDE":
                    a.push(ne("label_scale_2.00_1.00", e[o]));
                    r = i(e[o]);
                    a.push(ne("label_opacity_0.00_1.00", r)), r = i(e[o]), a.push(ne("image_scale_1.00_0.00", r)), r = i(e[o]), a.push(ne("image_opacity_1.00_0.00", r));
                    break;
                case "DESCRIPTIONAPPEAR":
                    a.push(ne("description_opacity_0_1", e[o]));
                    break;
                case "SLIDERIGHT":
                    a.push(ne("image_translateX_0%_100%", e[o])), a.push(ne("label_translateX_-100%_0%", i(e[o])));
                    break;
                case "SLIDELEFT":
                    a.push(ne("image_translateX_0%_-100%", e[o])), a.push(ne("label_translateX_100%_0%", i(e[o])));
                    break;
                case "SLIDEUP":
                    a.push(ne("image_translateY_0%_-100%", e[o])), a.push(ne("label_translateY_100%_0%", i(e[o])));
                    break;
                case "SLIDEDOWN":
                    a.push(ne("image_translateY_0%_100%", e[o])), a.push(ne("label_translateY_-100%_0%", i(e[o])));
                    break;
                case "IMAGESCALE150":
                case "IMAGESCALE150OUTSIDE":
                    a.push(ne("image_scale_1.00_1.50", e[o]));
                    break;
                case "IMAGESCALEIN80":
                    a.push(ne("image_scale_1.20_1.00", e[o]));
                    break;
                case "IMAGESLIDERIGHT":
                    a.push(ne("image_translateX_0%_100%", e[o]));
                    break;
                case "IMAGESLIDELEFT":
                    a.push(ne("image_translateX_0%_-100%", e[o]));
                    break;
                case "IMAGESLIDEUP":
                    a.push(ne("image_translateY_0%_-100%", e[o]));
                    break;
                case "IMAGESLIDEDOWN":
                    a.push(ne("image_translateY_0%_100%", e[o]));
                    break;
                case "LABELSLIDEUPDOWN":
                    a.push(ne("label_translateY_0%_100%", e[o]));
                    break;
                case "DESCRIPTIONSLIDEUP":
                    a.push(ne("description_translateY_110%_0%", e[o]));
                    break;
                case "IMAGEBLURON":
                    a.push(ne("image_blur_2.00px_0.00px", e[o]));
                    break;
                case "IMAGEBLUROFF":
                    a.push(ne("image_blur_0.00px_2.00px", e[o]));
                    break;
                case "IMAGEGRAYON":
                    a.push(ne("image_grayscale_0%_100%", e[o]));
                    break;
                case "IMAGEGRAYOFF":
                    a.push(ne("image_grayscale_100%_0%", e[o]));
                    break;
                case "IMAGESEPIAON":
                    a.push(ne("image_sepia_100%_1%", e[o]));
                    break;
                case "IMAGESEPIAOFF":
                    a.push(ne("image_sepia_1%_100%", e[o]));
                    break;
                default:
                    a.push(e[o])
            }
            return a
        }

        function oe() {
            return {
                name: "",
                element: "",
                type: "",
                from: "",
                to: "",
                hoverin: !0,
                hoverout: !0,
                firstKeyframe: !0,
                delay: 0,
                delayBack: 0,
                duration: 400,
                durationBack: 300,
                easing: "easeOutQuart",
                easingBack: "easeOutQuart",
                animParam: null
            }
        }

        function re() {
            return {
                element: "",
                property: "",
                value: ""
            }
        }

        function le(e, t) {
            switch (e.position) {
                case "onBottom":
                    u.tn.style[t].label = "bottom:0; ";
                    break;
                case "right":
                    switch (e.valign) {
                        case "top":
                            u.tn.style[t].label = "top:0; position:absolute; left: 50%;";
                            break;
                        case "middle":
                            u.tn.style[t].label = "top:0; bottom:0; left: 50%;", u.tn.style[t].title = "position:absolute; bottom:50%;", u.tn.style[t].desc = "position:absolute; top:50%;";
                            break;
                        case "bottom":
                        default:
                            u.tn.style[t].label = "bottom:0; position:absolute; left: 50%;", u.tn.style[t].title = "position:absolute;bottom:0;"
                    }
                    break;
                case "custom":
                    break;
                default:
                case "overImage":
                    switch (e.valign) {
                        case "top":
                            u.tn.style[t].label = "top:0; position:absolute;";
                            break;
                        case "middle":
                            u.tn.style[t].label = "top:0; bottom:0;", u.tn.style[t].title = "position:absolute; bottom:50%;", u.tn.style[t].desc = "position:absolute; top:50%;";
                            break;
                        case "bottom":
                        default:
                            u.tn.style[t].label = "bottom:0; position:absolute;"
                    }
            }
            switch ("onBottom" != e.position && (e.titleMultiLine && (u.tn.style[t].title += "white-space:normal;"), e.descriptionMultiLine && (u.tn.style[t].desc += "white-space:normal;")), e.align) {
                case "right":
                    u.tn.style[t].label += "text-align:right;";
                    break;
                case "left":
                    u.tn.style[t].label += "text-align:left;";
                    break;
                default:
                    u.tn.style[t].label += "text-align:center;"
            }
            null != e.titleFontSize && "" != e.titleFontSize && (u.tn.style[t].title += "font-size:" + e.titleFontSize + ";"), null != e.descriptionFontSize && "" != e.descriptionFontSize && (u.tn.style[t].desc += "font-size:" + e.descriptionFontSize + ";"), 0 == e.displayDescription && (u.tn.style[t].desc += "display:none;")
        }

        function se() {
            var e = null;
            switch (r(u.O.galleryTheme)) {
                case "object":
                    e = u.galleryTheme_dark, jQuery.extend(!0, e, u.O.galleryTheme);
                    break;
                case "string":
                    switch (u.O.galleryTheme) {
                        case "light":
                            e = u.galleryTheme_light;
                            break;
                        case "default":
                        case "dark":
                        case "none":
                        default:
                            e = u.galleryTheme_dark
                    }
                    break;
                default:
                    e = u.galleryTheme_dark
            }
            return e
        }

        function ue(e) {
            var t = Oe(e, !1);
            if (-1 == t.GOMidx) return "exit";
            var n = u.GOM.items[t.GOMidx].thumbnailIdx;
            switch (u.GOM.slider.hostIdx == t.GOMidx && (n = u.GOM.items[u.GOM.slider.currentIdx].thumbnailIdx), t.action) {
                case "OPEN":
                    return ye(n, !1), "exit";
                case "DISPLAY":
                    return ye(n, !0), "exit";
                case "TOGGLESELECT":
                    return me(n), "exit";
                case "SHARE":
                    return ge(n), "exit";
                case "DOWNLOAD":
                    return ce(n), "exit";
                case "INFO":
                    return ze(u.I[n]), "exit";
                case "SHOPPINGCART":
                    return he(n, "gallery"), "exit";
                default:
                    var i = u.O.fnThumbnailToolCustAction;
                    null !== i && ("function" == typeof i ? i(t.action, u.I[n]) : window[i](t.action, u.I[n]))
            }
        }

        function ce(e) {
            if ("img" == u.I[e].mediaKind) {
                var t = u.I[e].src;
                null != u.I[e].downloadURL && "" != u.I[e].downloadURL && (t = u.I[e].downloadURL);
                var n = document.createElement("a");
                n.href = t, n.download = t.split("/").pop(), n.target = "_blank", n.style.display = "none", document.body.appendChild(n), n.click(), document.body.removeChild(n)
            }
        }

        function he(e, t) {
            for (var n = 0; n < u.shoppingCart.length; n++) {
                var i;
                if (u.shoppingCart[n].idx == e) return u.shoppingCart[n].qty++, R(u.I[e]), null !== (i = u.O.fnShoppingCartUpdated) && ("function" == typeof i ? i(u.shoppingCart, u.I[e], t) : window[i](u.shoppingCart, u.I[e], t)), void at("shoppingCartUpdated")
            }
            u.shoppingCart.push({
                idx: e,
                ID: u.I[e].GetID(),
                qty: 1
            }), R(u.I[e]), null !== (i = u.O.fnShoppingCartUpdated) && ("function" == typeof i ? i(u.shoppingCart, u.I[e], t) : window[i](u.shoppingCart, u.I[e], t)), at("shoppingCartUpdated")
        }

        function de() {
            u.GOM.nbSelected = 0;
            for (var e = 0, t = u.GOM.items.length; e < t; e++) {
                var n = u.I[u.GOM.items[e].thumbnailIdx];
                if (n.selected) {
                    n.selected = !1;
                    var i = u.O.fnThumbnailSelection;
                    null !== i && ("function" == typeof i ? i(n.$elt, n, u.I) : window[i](n.$elt, n, u.I))
                }
                n.selected = !1
            }
        }

        function me(e) {
            var t = u.I[e];
            !0 === t.selected ? (pe(t, !1), u.GOM.nbSelected--, at("itemUnSelected")) : (pe(t, !0), u.GOM.nbSelected++, at("itemSelected"))
        }

        function pe(e, t) {
            e.selected = t,
                function (e) {
                    if (null == e.$elt) return;
                    var t = e.$getElt(".nGY2GThumbnail"),
                        n = e.$getElt(".nGY2GThumbnailIconImageSelect");
                    !0 === e.selected ? (t.addClass("nGY2GThumbnailSubSelected"), n.addClass("nGY2ThumbnailSelected"), n.removeClass("nGY2ThumbnailUnselected"), n.html(u.O.icons.thumbnailSelected)) : (t.removeClass("nGY2GThumbnailSubSelected"), n.removeClass("nGY2ThumbnailSelected"), n.addClass("nGY2ThumbnailUnselected"), n.html(u.O.icons.thumbnailUnselected))
                }(e);
            var n = u.O.fnThumbnailSelection;
            null !== n && ("function" == typeof n ? n(e.$elt, e, u.I) : window[n](e.$elt, e, u.I))
        }

        function ge(e) {
            var t = u.I[e],
                n = document.location.protocol + "//" + document.location.hostname + document.location.pathname,
                i = "#nanogallery/" + u.baseEltID + "/";
            "image" == t.kind ? i += t.albumID + "/" + t.GetID() : i += t.GetID();
            var a = "<br><br>";
            a += '<div class="nGY2PopupOneItem" style="text-align:center;" data-share="facebook">' + u.O.icons.shareFacebook + "</div>", a += '<div class="nGY2PopupOneItem" style="text-align:center;" data-share="pinterest">' + u.O.icons.sharePinterest + "</div>", a += '<div class="nGY2PopupOneItem" style="text-align:center;" data-share="tumblr">' + u.O.icons.shareTumblr + "</div>", a += '<div class="nGY2PopupOneItem" style="text-align:center;" data-share="twitter">' + u.O.icons.shareTwitter + "</div>", a += '<div class="nGY2PopupOneItem" style="text-align:center;" data-share="vk">' + u.O.icons.shareVK + "</div>", a += '<div class="nGY2PopupOneItem" style="text-align:center;" data-share="mail">' + u.O.icons.shareMail + "</div>", a += '<div class="nGY2PopupOneItem" style="text-align:center;"></div>', a += '<input class="nGY2PopupOneItemText" readonly type="text" value="' + n + i + '" style="width:100%;text-align:center;">', a += "<br>", n = encodeURIComponent(document.location.protocol + "//" + document.location.hostname + document.location.pathname + i);
            var o = t.title,
                r = t.thumbImg().src;
            fe("nanogallery2 - share to:", a, "Center"), u.popup.$elt.find(".nGY2PopupOneItem").on("click", (function (e) {
                e.stopPropagation();
                var t = "",
                    i = !0;
                switch (jQuery(this).attr("data-share").toUpperCase()) {
                    case "FACEBOOK":
                        t = "https://www.facebook.com/sharer.php?u=" + n;
                        break;
                    case "VK":
                        t = "http://vk.com/share.php?url=" + n;
                        break;
                    case "GOOGLEPLUS":
                        t = "https://plus.google.com/share?url=" + n;
                        break;
                    case "TWITTER":
                        t = "https://twitter.com/intent/tweet?text=" + o + "url=" + n;
                        break;
                    case "PINTEREST":
                        t = "https://pinterest.com/pin/create/button/?media=" + r + "&url=" + n + "&description=" + o;
                        break;
                    case "TUMBLR":
                        t = "http://www.tumblr.com/share/link?url=" + n + "&name=" + o;
                        break;
                    case "MAIL":
                        t = "mailto:?subject=" + o + "&body=" + n;
                        break;
                    default:
                        i = !1
                }
                i && (window.open(t, "", "height=550,width=500,left=100,top=100,menubar=0"), u.popup.close())
            }))
        }

        function fe(e, t, n) {
            var i = '<div class="nGY2Popup" style="opacity:0;"><div class="nGY2PopupContent' + n + '">';
            i += '<div class="nGY2PopupCloseButton" style="font-size:0.9em;">' + u.O.icons.buttonClose + "</div>", i += '<div class="nGY2PopupTitle">' + e + "</div>", i += t, i += "</div></div>", u.popup.$elt = jQuery(i).appendTo("body"), o(u.VOM.$viewer, u.popup.$elt), u.popup.isDisplayed = !0, (new NGTweenable).tween({
                from: {
                    o: 0,
                    y: 100
                },
                to: {
                    o: 1,
                    y: 0
                },
                easing: "easeInOutSine",
                duration: 250,
                step: function (e, t) {
                    u.popup.$elt[0].style.opacity = e.o, u.popup.$elt[0].style[u.CSStransformName] = "translateY(" + e.y + "px)"
                }
            }), u.popup.$elt.find(".nGY2PopupCloseButton").on("click", (function (e) {
                e.stopPropagation(), u.popup.close()
            }))
        }

        function be(e) {
            if (!u.VOM.viewerDisplayed && -1 != u.GOM.albumIdx) {
                var t = Oe(e, !0); - 1 != t.GOMidx && W(t.GOMidx)
            }
        }

        function ve(e) {
            if (!u.VOM.viewerDisplayed && -1 != u.GOM.albumIdx) {
                var t = Oe(e, !0); - 1 != t.GOMidx && X(t.GOMidx)
            }
        }

        function Oe(e, t) {
            var n = {
                action: "NONE",
                GOMidx: -1
            };
            if (null == e) return n;
            for (var i = e.target || e.srcElement; i != u.$E.conTnParent[0];) {
                if (jQuery(i).hasClass("nGY2GThumbnail")) return "NONE" == n.action && (n.action = "OPEN"), n.GOMidx = jQuery(i).data("index"), n;
                if (!t) {
                    var a = jQuery(i).data("ngy2action");
                    "" != a && null != a && (n.action = a)
                }
                if (null == i.parentNode) return n;
                i = i.parentNode
            }
            return n
        }

        function ye(e, t) {
            var n = u.I[e];
            u.GOM.albumIdxLoading = e;
            var i = u.O.fnThumbnailClicked;
            if (null !== i && ("function" == typeof i ? i(n.$elt, n) : window[i](n.$elt, n)), void 0 !== n.destinationURL && n.destinationURL.length > 0) window.location = n.destinationURL;
            else switch (n.kind) {
                case "image":
                    !1 === t && u.GOM.nbSelected > 0 ? me(e) : we(e);
                    break;
                case "album":
                    if (!1 === t && u.GOM.nbSelected > 0) me(e);
                    else {
                        if (u.O.thumbnailAlbumDisplayImage && 0 != e) return void Ge(e);
                        g("-1", n.GetID())
                    }
                    break;
                case "albumUp":
                    g("-1", NGY2Item.Get(u, n.albumID).albumID)
            }
        }

        function Ge(e) {
            u.O.debugMode && console.log("#DisplayFirstPhotoInAlbum : " + e);
            for (var t = u.I[e], n = u.I.length, i = 0; i < n; i++)
                if (u.I[i].albumID == t.GetID()) return void we(i);
            q(t.GetID(), Ge, e, null)
        }

        function Me(e) {
            switch (u.O.kind) {
                case "flickr":
                    var t = "https://www.flickr.com/photos/" + u.O.userID + "/" + e.GetID();
                    "0" != e.albumID && (t += "/in/album-" + e.albumID + "/"), window.open(t, "_blank");
                    break;
                case "picasa":
                case "google":
                case "google2":
                default:
                    t = e.responsiveURL();
                    window.open(t, "_blank")
            }
        }

        function we(e) {
            if (u.O.thumbnailOpenInLightox)
                if (u.O.thumbnailOpenOriginal) Me(u.I[e]);
                else {
                    var t = [];
                    u.VOM.content.current.vIdx = 0, u.VOM.items = [], u.VOM.albumID = u.I[e].albumID;
                    var n = new c(e);
                    u.VOM.items.push(n), t.push(u.I[e]);
                    var i = u.I.length;
                    for (let n = e + 1; n < i; n++) {
                        let e = u.I[n];
                        if ("image" == e.kind && e.isToDisplay(u.VOM.albumID) && "" == e.destinationURL) {
                            let i = new c(n);
                            u.VOM.items.push(i), t.push(e)
                        }
                    }
                    var a = u.VOM.items.length,
                        o = 1;
                    for (let n = 0; n < e; n++) {
                        let e = u.I[n];
                        if ("image" == e.kind && e.isToDisplay(u.VOM.albumID) && "" == e.destinationURL) {
                            let i = new c(n);
                            i.mediaNumber = o, u.VOM.items.push(i), t.push(e), o++
                        }
                    }
                    for (let e = 0; e < a; e++) u.VOM.items[e].mediaNumber = o, o++;
                    var r = u.O.fnThumbnailOpen;
                    if (null === r)
                        if (u.VOM.viewerDisplayed) {
                            u.VOM.content.current.$media.empty();
                            let e = u.VOM.content.current.NGY2Item();
                            var l = '<div class="nGY2ViewerMediaLoaderDisplayed"></div>';
                            "img" == e.mediaKind && 0 != e.imageWidth && 0 != e.imageHeight && (l = '<div class="nGY2ViewerMediaLoaderHidden"></div>'), u.VOM.content.current.$media.append(l + e.mediaMarkup), et(u.VOM.content.next, 0), et(u.VOM.content.previous, 0), "img" == e.mediaKind && u.VOM.ImageLoader.loadImage(Ke, e), Ze("")
                        } else De();
                    else "function" == typeof r ? r(t) : window[r](t)
                }
        }

        function Ie() {
            if (u.O.viewerZoom && !u.VOM.viewerMediaIsChanged) {
                var e = u.VOM.content.current.NGY2Item();
                if ("img" == e.mediaKind && e.imageHeight > 0 && e.imageWidth > 0) return !1 === u.VOM.zoom.isZooming && (u.VOM.zoom.userFactor = 1, u.VOM.zoom.isZooming = !0), !0
            }
            return !1
        }

        function Te(e) {
            e ? (u.VOM.zoom.userFactor += .1, xe()) : (u.VOM.zoom.userFactor -= .1, Se()), Le()
        }

        function xe() {
            u.VOM.zoom.userFactor > 3 && (u.VOM.zoom.userFactor = 3)
        }

        function Se() {
            u.VOM.zoom.userFactor < .2 && (u.VOM.zoom.userFactor = .2)
        }

        function Le() {
            u.VOM.zoom.isZooming || (u.VOM.zoom.userFactor = 1), Ee(u.VOM.content.current, !0), Ee(u.VOM.content.previous, !1), Ee(u.VOM.content.next, !1)
        }

        function Ce(e) {
            var t = e.children().eq(1),
                n = 90;
            "none" != u.O.viewerGallery && (n -= 10), "none" != u.O.viewerToolbar.display && (n -= 10), t.css({
                height: n + "%"
            }), t.css({
                width: "90%"
            }), t[0].style[u.CSStransformName] = 'translate(0px, "50%") '
        }

        function Ee(e, t) {
            var n = e.NGY2Item(),
                i = e.$media;
            if ("img" == n.mediaKind)
                if (0 != n.imageHeight && 0 != n.imageWidth) {
                    var a = 1 == t ? u.VOM.zoom.userFactor : 1,
                        o = 1;
                    "bestImageQuality" == u.O.viewerImageDisplay && (o = window.devicePixelRatio);
                    var r = (u.VOM.window.lastWidth - u.VOM.padding.V) / (n.imageWidth / o),
                        l = (u.VOM.window.lastHeight - u.VOM.padding.H) / (n.imageHeight / o),
                        s = Math.min(r, l);
                    s > 1 && "upscale" != u.O.viewerImageDisplay && (s = 1);
                    var c = n.imageHeight / o * a * s,
                        h = n.imageWidth / o * a * s;
                    i.children().eq(1).css({
                        height: c
                    }), i.children().eq(1).css({
                        width: h
                    });
                    var d = 0;
                    h > u.VOM.window.lastWidth && (d = -(h - u.VOM.window.lastWidth) / 2);
                    t ? (u.VOM.zoom.isZooming || (u.VOM.panPosX = 0, u.VOM.panPosY = 0), u.VOM.zoom.posX = d, u.VOM.zoom.posY = 0, ke(u.VOM.panPosX, u.VOM.panPosY, i, !1)) : (Xe(u.VOM.swipePosX), i.children().eq(1)[0].style[u.CSStransformName] = "translate(0px, 0px) rotate(" + n.rotationAngle + "deg)")
                } else et(e, 0);
            else Ce(i)
        }

        function ke(e, t, n, i) {
            i && (u.VOM.panPosX = e, u.VOM.panPosY = t), e += u.VOM.zoom.posX, t += u.VOM.zoom.posY, n.children().eq(1)[0].style[u.CSStransformName] = "translate(" + e + "px, " + t + "px) rotate(" + u.VOM.content.current.NGY2Item().rotationAngle + "deg)"
        }

        function De(e) {
            u.GOM.firstDisplay = !1, jQuery("head").append('<style id="nGY2_body_scrollbar_style" type="text/css">.nGY2_body_scrollbar{margin-right: ' + (window.innerWidth - document.documentElement.clientWidth) + "px;}</style>"), jQuery("body").addClass("nGY2_body_scrollbar"), u.VOM.$baseCont = jQuery('<div  class="nGY2 nGY2ViewerContainer" style="opacity:1"></div>').appendTo("body"),
                function () {
                    if ("" == u.VOM.viewerTheme) {
                        void 0 !== u.O.colorSchemeViewer && (u.O.viewerTheme = u.O.colorSchemeViewer);
                        var e = null;
                        switch (r(u.O.viewerTheme)) {
                            case "object":
                                e = u.viewerTheme_dark, jQuery.extend(!0, e, u.O.viewerTheme), u.VOM.viewerTheme = "nanogallery_viewertheme_custom_" + u.baseEltID;
                                break;
                            case "string":
                                switch (u.O.viewerTheme) {
                                    case "none":
                                        return;
                                    case "light":
                                        e = u.viewerTheme_light, u.VOM.viewerTheme = "nanogallery_viewertheme_light_" + u.baseEltID;
                                        break;
                                    case "dark":
                                    case "default":
                                        e = u.viewerTheme_dark, u.VOM.viewerTheme = "nanogallery_viewertheme_dark_" + u.baseEltID
                                }
                                break;
                            default:
                                return void h(u, "Error in viewerTheme parameter.")
                        }
                        var t = "." + u.VOM.viewerTheme + " ",
                            n = t + ".nGY2Viewer { background:" + e.background + "; }\n";
                        n += t + ".nGY2Viewer .toolbarBackground { background:" + e.barBackground + "; }\n", n += t + ".nGY2Viewer .toolbar { border:" + e.barBorder + "; color:" + e.barColor + "; }\n", n += t + ".nGY2Viewer .toolbar .previousButton:after { color:" + e.barColor + "; }\n", n += t + ".nGY2Viewer .toolbar .nextButton:after { color:" + e.barColor + "; }\n", n += t + ".nGY2Viewer .toolbar .closeButton:after { color:" + e.barColor + "; }\n", n += t + ".nGY2Viewer .toolbar .label .title { color:" + e.barColor + "; }\n", n += t + ".nGY2Viewer .toolbar .label .description { color:" + e.barDescriptionColor + "; }\n", jQuery("head").append("<style>" + n + "</style>"), u.VOM.$baseCont.addClass(u.VOM.viewerTheme)
                    } else u.VOM.$baseCont.addClass(u.VOM.viewerTheme)
                }(), u.VOM.$viewer = jQuery('<div class="nGY2Viewer" style="opacity:0" itemscope itemtype="http://schema.org/ImageObject"></div>').appendTo(u.VOM.$baseCont), u.VOM.$viewer.css({
                    msTouchAction: "none",
                    touchAction: "none"
                }), u.VOM.content.current.vIdx = null == e ? 0 : e, u.VOM.content.previous.vIdx = u.VOM.IdxNext(), u.VOM.content.next.vIdx = u.VOM.IdxPrevious();
            var t = '<div class="nGY2ViewerMediaPan"><div class="nGY2ViewerMediaLoaderDisplayed"></div>' + u.VOM.content.previous.NGY2Item().mediaMarkup + "</div>";
            t += '<div class="nGY2ViewerMediaPan"><div class="nGY2ViewerMediaLoaderDisplayed"></div>' + u.VOM.content.current.NGY2Item().mediaMarkup + "</div>", t += '<div class="nGY2ViewerMediaPan"><div class="nGY2ViewerMediaLoaderDisplayed"></div>' + u.VOM.content.next.NGY2Item().mediaMarkup + "</div>";
            var n = "",
                i = u.O.icons.viewerImgPrevious;
            null != i && "" != i && (n += '<div class="nGY2ViewerAreaPrevious ngy2viewerToolAction" data-ngy2action="previous">' + i + "</div>");
            var a = u.O.icons.viewerImgNext;
            null != a && "" != a && (n += '<div class="nGY2ViewerAreaNext ngy2viewerToolAction" data-ngy2action="next">' + a + "</div>"), u.VOM.$content = jQuery('<div class="nGY2ViewerContent">' + t + n + "</div>").appendTo(u.VOM.$viewer), u.VOM.$buttonLeft = u.VOM.$content.find(".nGY2ViewerAreaPrevious"), u.VOM.$buttonRight = u.VOM.$content.find(".nGY2ViewerAreaNext");
            var l = u.VOM.$content.find(".nGY2ViewerMediaPan");
            u.VOM.content.previous.$media = l.eq(0), u.VOM.content.current.$media = l.eq(1), u.VOM.content.next.$media = l.eq(2);
            var c = u.GOM.cache.viewport;
            u.VOM.content.previous.$media[0].style[u.CSStransformName] = "translate(-" + c.w + "px, 0px)", u.VOM.content.next.$media[0].style[u.CSStransformName] = "translate(" + c.w + "px, 0px)", u.VOM.ImageLoader.loadImage(Ke, u.VOM.content.current.NGY2Item()), u.VOM.ImageLoader.loadImage(Ke, u.VOM.content.previous.NGY2Item()), u.VOM.ImageLoader.loadImage(Ke, u.VOM.content.next.NGY2Item()), u.VOM.padding.H = parseInt(u.VOM.$content.css("padding-left")) + parseInt(u.VOM.$content.css("padding-right")), u.VOM.padding.V = parseInt(u.VOM.$content.css("padding-top")) + parseInt(u.VOM.$content.css("padding-bottom"));
            var d = "",
                m = " toolbarBackground";
            u.O.viewerToolbar.fullWidth && (d = " toolbarBackground", m = "");
            var p = "text-align:center;";
            switch (u.O.viewerToolbar.align) {
                case "left":
                    p = "text-align:left;";
                    break;
                case "right":
                    p = "text-align:right;"
            }
            var g = '<div class="toolbarContainer nGEvent' + d + '" style="visibility:' + (u.O.viewerToolbar.display ? "visible" : "hidden") + ";" + p + '"><div class="toolbar nGEvent' + m + '"></div></div>';
            u.VOM.$toolbar = jQuery(g).appendTo(u.VOM.$viewer), "min" == u.VOM.toolbarMode || u.O.viewerToolbar.autoMinimize > 0 && u.O.viewerToolbar.autoMinimize >= u.GOM.cache.viewport.w ? We() : Ue();
            for (var f = '<div class="nGY2ViewerToolsTopLeft nGEvent"><div class="toolbar nGEvent">', b = u.O.viewerTools.topLeft.split(","), v = 0, O = b.length; v < O; v++) f += Be(b[v]);
            f += "</div></div>", u.VOM.$toolbarTL = jQuery(f).appendTo(u.VOM.$viewer);
            for (var y = '<div class="nGY2ViewerToolsTopRight nGEvent"><div class="toolbar nGEvent">', G = u.O.viewerTools.topRight.split(","), M = (v = 0, G.length); v < M; v++) y += Be(G[v]);
            y += "</div></div>", u.VOM.$toolbarTR = jQuery(y).appendTo(u.VOM.$viewer), Pe(), ngscreenfull.enabled && u.O.viewerFullscreen && (ngscreenfull.request(), u.VOM.viewerIsFullscreen = !0),
                function () {
                    if (u.VOM.gallery.firstDisplay = !0, "none" != u.O.viewerGallery) {
                        for (var e = u.O.viewerGalleryTWidth, t = u.O.viewerGalleryTHeight, n = "", i = 0; i < u.VOM.items.length; i++) {
                            var a = u.VOM.items[i].ngy2ItemIdx,
                                o = u.I[a].thumbImg().src.replace(/'/g, "%27");
                            o = o.replace(/\\/g, "\\\\"), n += '<div class="nGY2VThumbnail" style="width:' + e + "px;height:" + t + "px;left:" + i * (e + 4) + "px;background-image: url(&apos;" + o + '&apos;);" data-ngy2_lightbox_thumbnail="true" data-ngy2_idx="' + a + '" data-ngy2_vidx="' + i + '" ></div>'
                        }
                        u.VOM.gallery.gwidth = (e + 4) * u.VOM.items.length, u.VOM.gallery.oneTmbWidth = e + 4;
                        var r = "<div class='nGY2VThumbnailContainer' style='height:" + (t + 4) + "px;left:0;width:" + u.VOM.gallery.gwidth + "px;' data-ngy2_lightbox_gallery='true'>" + n + "</div>";
                        u.VOM.gallery.$elt = jQuery('<div class="nGY2viewerGallery" style="display: inline-block;height:' + (t + 4) + 'px;left:0;right:0;">' + r + "</div>").appendTo(u.VOM.$viewer), u.VOM.gallery.$tmbCont = u.VOM.gallery.$elt.find(".nGY2VThumbnailContainer"), u.VOM.gallery.Resize(), u.VOM.gallery.SetThumbnailActive()
                    }
                }(), o("", u.VOM.$viewer), nt(!0), u.VOM.gallery.Resize(), u.VOM.timeImgChanged = (new Date).getTime(), u.VOM.$toolbarTL.css("opacity", 0), u.VOM.$toolbarTR.css("opacity", 0), u.VOM.$buttonLeft.css("opacity", 0), u.VOM.$buttonRight.css("opacity", 0), "none" != u.O.viewerGallery && u.VOM.gallery.$elt.css("opacity", 0), u.VOM.$content.css("opacity", 0), u.VOM.$toolbarTR[0].style[u.CSStransformName] = "translateY(-40px) ", u.VOM.$toolbarTL[0].style[u.CSStransformName] = "translateY(-40px) ", u.VOM.$buttonLeft[0].style[u.CSStransformName] = "translateX(-40px) ", u.VOM.$buttonRight[0].style[u.CSStransformName] = "translateX(40px) ", (new NGTweenable).tween({
                    from: {
                        opacity: 0,
                        posY: .5 * u.VOM.window.lastHeight
                    },
                    to: {
                        opacity: 1,
                        posY: 0
                    },
                    delay: 10,
                    duration: 450,
                    easing: "easeInOutQuint",
                    step: function (e) {
                        u.VOM.$viewer.css("opacity", e.opacity), u.VOM.$viewer[0].style[u.CSStransformName] = "translateY(" + e.posY + "px) ", u.VOM.$content.css("opacity", e.opacity)
                    }
                }), (new NGTweenable).tween({
                    from: {
                        posY: -40,
                        opacity: 0,
                        scale: 3
                    },
                    to: {
                        posY: 0,
                        opacity: 1,
                        scale: 1
                    },
                    delay: 300,
                    duration: 400,
                    easing: "easeInOutQuint",
                    step: function (e) {
                        u.VOM.$toolbarTR[0].style[u.CSStransformName] = "translateY(" + e.posY + "px) ", u.VOM.$toolbarTL[0].style[u.CSStransformName] = "translateY(" + e.posY + "px) ", u.VOM.$buttonLeft[0].style[u.CSStransformName] = "translateX(" + e.posY + "px) ", u.VOM.$buttonRight[0].style[u.CSStransformName] = "translateX(" + -e.posY + "px) ", "none" != u.O.viewerGallery && (u.VOM.gallery.$elt.css({
                            opacity: e.opacity
                        }), u.VOM.gallery.$elt[0].style[u.CSStransformName] = "scale(" + e.scale + ")")
                    },
                    finish: function () {
                        u.VOM.viewerDisplayed = !0, Xe(0), null == u.VOM.hammertime && (u.VOM.hammertime = new NGHammer.Manager(u.VOM.$baseCont[0], {
                            recognizers: [
                                [NGHammer.Pinch, {
                                    enable: !0
                                }],
                                [NGHammer.Pan, {
                                    direction: NGHammer.DIRECTION_ALL
                                }]
                            ]
                        }), u.VOM.hammertime.on("pan", (function (e) {
                            if (Ne()) switch ("off" == u.VOM.panMode && (null != e.target.dataset.ngy2_lightbox_thumbnail || null != e.target.dataset.ngy2_lightbox_gallery ? u.VOM.panMode = "gallery" : u.VOM.zoom.isZooming ? u.VOM.panMode = "zoom" : u.VOM.panMode = "media"), u.VOM.panMode) {
                                case "zoom":
                                    ke(u.VOM.panPosX + e.deltaX, u.VOM.panPosY + e.deltaY, u.VOM.content.current.$media, !1), u.VOM.toolsHide();
                                    break;
                                case "media":
                                    if (Math.abs(e.deltaY) > u.VOM.panThreshold && Math.abs(e.deltaX) < u.VOM.panThreshold && !u.VOM.panXOnly) {
                                        Xe(0);
                                        var t = 0;
                                        t = e.deltaY < 0 ? Math.max(e.deltaY, -200) : Math.min(e.deltaY, 200), u.VOM.$viewer[0].style[u.CSStransformName] = "translateY(" + t + "px) ", u.VOM.$viewer.css("opacity", 1 - Math.abs(t) / 200 / 2)
                                    } else Math.abs(e.deltaX) > u.VOM.panThreshold && (u.VOM.panXOnly = !0), Xe(e.deltaX), u.VOM.$viewer[0].style[u.CSStransformName] = "translateY(0px)", u.VOM.$viewer.css("opacity", 1);
                                    break;
                                case "gallery":
                                    u.VOM.gallery.PanGallery(e.deltaX)
                            }
                        })), u.VOM.hammertime.on("panend", (function (e) {
                            if (Ne()) {
                                switch (u.VOM.panMode) {
                                    case "zoom":
                                        u.VOM.timeImgChanged = (new Date).getTime(), ke(u.VOM.panPosX + e.deltaX, u.VOM.panPosY + e.deltaY, u.VOM.content.current.$media, !0);
                                        break;
                                    case "media":
                                        var t = !1;
                                        u.VOM.panXOnly || Math.abs(e.deltaY) > 50 && Math.abs(e.deltaX) < 50 && (tt(), t = !0), t || (Math.abs(e.deltaX) < 50 ? Xe(0) : e.deltaX > 50 ? qe(Math.abs(e.velocityX)) : Qe(Math.abs(e.velocityX))), u.VOM.panXOnly = !1;
                                        break;
                                    case "gallery":
                                        u.VOM.gallery.posX += e.deltaX, u.VOM.gallery.PanGallery(0), u.VOM.gallery.PanGalleryEnd(e.velocityX)
                                }
                                u.VOM.panMode = "off"
                            }
                        })), u.O.viewerZoom ? (u.VOM.hammertime.add(new NGHammer.Tap({
                            event: "doubletap",
                            taps: 2,
                            interval: 250
                        })), u.VOM.hammertime.add(new NGHammer.Tap({
                            event: "singletap"
                        })), u.VOM.hammertime.get("doubletap").recognizeWith("singletap"), u.VOM.hammertime.get("singletap").requireFailure("doubletap"), u.VOM.hammertime.on("singletap", (function (e) {
                            if (Ne()) {
                                if (null != e.target.dataset.ngy2_lightbox_thumbnail) {
                                    var t = parseInt(e.target.dataset.ngy2_idx),
                                        n = parseInt(e.target.dataset.ngy2_vidx);
                                    if (!isNaN(t) && n != u.VOM.content.current.vIdx) {
                                        if (n > u.VOM.content.current.vIdx) {
                                            at("lightboxNextImage"), u.VOM.content.next.$media.empty();
                                            var i = u.I[t];
                                            u.VOM.content.next.vIdx = n;
                                            let e = '<div class="nGY2ViewerMediaLoaderDisplayed"></div>';
                                            "img" == i.mediaKind && 0 != i.imageWidth && 0 != i.imageHeight && (e = '<div class="nGY2ViewerMediaLoaderHidden"></div>'), u.VOM.content.next.$media.append(e + i.mediaMarkup), "img" == i.mediaKind ? u.VOM.ImageLoader.loadImage(Ke, i) : Ce(u.VOM.content.next.$media), Ze("nextImage")
                                        } else {
                                            at("lightboxPreviousImage"), u.VOM.content.previous.$media.empty();
                                            var a = u.I[t];
                                            u.VOM.content.previous.vIdx = n;
                                            let e = '<div class="nGY2ViewerMediaLoaderDisplayed"></div>';
                                            "img" == a.mediaKind && 0 != a.imageWidth && 0 != a.imageHeight && (e = '<div class="nGY2ViewerMediaLoaderHidden"></div>'), u.VOM.content.previous.$media.append(e + a.mediaMarkup), "img" == a.mediaKind ? u.VOM.ImageLoader.loadImage(Ke, a) : Ce(u.VOM.content.previous.$media), Ze("previousImage")
                                        }
                                        return
                                    }
                                }
                                if (Ve(e.srcEvent), 0 == u.VOM.toolbarsDisplayed) s(Ae, 100, !1)(), u.VOM.singletapTime = (new Date).getTime();
                                else {
                                    if ((new Date).getTime() - u.VOM.singletapTime < 400) return;
                                    "img" == u.VOM.content.current.NGY2Item().mediaKind && -1 !== e.target.className.indexOf("nGY2ViewerMedia") && ((e.srcEvent instanceof MouseEvent ? e.srcEvent.pageX : e.srcEvent.changedTouches[0].pageX) < u.GOM.cache.viewport.w / 2 ? qe() : Qe())
                                }
                            }
                        })), u.VOM.hammertime.on("doubletap", (function (e) {
                            Ne() && (Ve(e.srcEvent), -1 !== e.target.className.indexOf("nGY2ViewerMedia") && (u.VOM.zoom.isZooming ? (u.VOM.zoom.isZooming = !1, nt(!0)) : Ie() && (u.VOM.zoom.userFactor = 1.5, Le())))
                        })), u.VOM.hammertime.on("pinchend", (function (e) {
                            e.srcEvent.stopPropagation(), e.srcEvent.preventDefault(), u.VOM.timeImgChanged = (new Date).getTime()
                        })), u.VOM.hammertime.on("pinch", (function (e) {
                            e.srcEvent.stopPropagation(), e.srcEvent.preventDefault(), Ie() && (u.VOM.zoom.userFactor = e.scale, xe(), Se(), Le())
                        }))) : (u.VOM.hammertime.add(new NGHammer.Tap({
                            event: "singletap"
                        })), u.VOM.hammertime.on("singletap", (function (e) {
                            if (Ne())
                                if (Ve(e.srcEvent), 0 == u.VOM.toolbarsDisplayed) s(Ae, 100, !1)(), u.VOM.singletapTime = (new Date).getTime();
                                else {
                                    if ((new Date).getTime() - u.VOM.singletapTime < 400) return; - 1 !== e.target.className.indexOf("nGY2ViewerMedia") && ((e.srcEvent instanceof MouseEvent ? e.srcEvent.pageX : e.srcEvent.changedTouches[0].pageX) < u.GOM.cache.viewport.w / 2 ? qe() : Qe())
                                }
                        })))), Ze(""), u.O.slideshowAutoStart && (u.VOM.playSlideshow = !1, He()), Ae(), Je("")
                    }
                })
        }

        function Ne() {
            return !(!u.VOM.viewerDisplayed || u.VOM.viewerMediaIsChanged)
        }

        function Ve(e) {
            e.stopPropagation(), e.preventDefault()
        }

        function Ye() {
            u.VOM.viewerDisplayed && (u.VOM.toolbarsDisplayed = !1, _e(0))
        }

        function Ae() {
            u.VOM.viewerDisplayed && (u.VOM.toolbarsDisplayed = !0, _e(1), u.VOM.toolsHide())
        }

        function _e(e) {
            null != u.VOM.$toolbar && u.VOM.$toolbar.css("opacity", e), null != u.VOM.$toolbarTL && u.VOM.$toolbarTL.css("opacity", e), null != u.VOM.$toolbarTR && u.VOM.$toolbarTR.css("opacity", e), u.VOM.$content.find(".nGY2ViewerAreaNext").css("opacity", e), u.VOM.$content.find(".nGY2ViewerAreaPrevious").css("opacity", e)
        }

        function Pe() {
            u.VOM.$viewer.off("touchstart click", ".ngy2viewerToolAction", Re), u.VOM.$viewer.on("touchstart click", ".ngy2viewerToolAction", Re)
        }

        function Re(t) {
            if (!((new Date).getTime() - u.timeLastTouchStart < 300)) {
                u.timeLastTouchStart = (new Date).getTime();
                var n = e(this),
                    i = n.data("ngy2action");
                if (null != i) {
                    switch (i) {
                        case "next":
                            Ve(t), Qe();
                            break;
                        case "previous":
                            Ve(t), qe();
                            break;
                        case "playPause":
                            t.stopPropagation(), He();
                            break;
                        case "zoomIn":
                            Ve(t), Ie() && Te(!0);
                            break;
                        case "zoomOut":
                            Ve(t), Ie() && Te(!1);
                            break;
                        case "minimize":
                            Ve(t), "std" == u.VOM.toolbarMode ? We() : Ue();
                            break;
                        case "fullScreen":
                            t.stopPropagation(), ngscreenfull.enabled && ngscreenfull.toggle();
                            break;
                        case "info":
                            t.stopPropagation(), ze(u.VOM.content.current.NGY2Item());
                            break;
                        case "close":
                            if (Ve(t), (new Date).getTime() - u.VOM.timeImgChanged < 400) return;
                            tt();
                            break;
                        case "download":
                            Ve(t), ce(u.VOM.items[u.VOM.content.current.vIdx].ngy2ItemIdx);
                            break;
                        case "share":
                            Ve(t), ge(u.VOM.items[u.VOM.content.current.vIdx].ngy2ItemIdx);
                            break;
                        case "linkOriginal":
                            Ve(t), Me(u.VOM.content.current.NGY2Item());
                            break;
                        case "rotateLeft":
                            Ve(t), Fe(-90);
                            break;
                        case "rotateRight":
                            Ve(t), Fe(90);
                            break;
                        case "shoppingcart":
                            Ve(t), he(u.VOM.items[u.VOM.content.current.vIdx].ngy2ItemIdx, "lightbox")
                    }
                    var a = u.O.fnImgToolbarCustClick;
                    0 == i.indexOf("custom") && null !== a && ("function" == typeof a ? a(i, n, u.VOM.content.current.NGY2Item()) : window[a](i, n, u.VOM.content.current.NGY2Item()))
                }
            }
        }

        function Fe(e) {
            var t = u.VOM.content.current.NGY2Item();
            "img" == t.mediaKind && (t.rotationAngle += e, t.rotationAngle = t.rotationAngle % 360, t.rotationAngle < 0 && (t.rotationAngle += 360), Xe(0), Ee(u.VOM.content.current, !0))
        }

        function ze(e) {
            var t = '<div class="nGY2PopupOneItem">' + e.title + "</div>";
            t += '<div class="nGY2PopupOneItemText">' + e.description + "</div>", "" != e.author && (t += '<div class="nGY2PopupOneItemText">' + u.O.icons.user + " " + e.author + "</div>"), "" != e.exif.model && (t += '<div class="nGY2PopupOneItemText">' + u.O.icons.config + " " + e.exif.model + "</div>");
            var n = u.O.icons.picture + ":";
            "" != e.exif.flash || "" != e.exif.focallength || "" != e.exif.fstop || "" != e.exif.exposure || "" != e.exif.iso || "" != e.exif.time ? (n += "<br>", n += "" == e.exif.flash ? "" : " &nbsp; " + e.exif.flash, n += "" == e.exif.focallength ? "" : " &nbsp; " + e.exif.focallength + "mm", n += "" == e.exif.fstop ? "" : " &nbsp; f" + e.exif.fstop, n += "" == e.exif.exposure ? "" : " &nbsp; " + e.exif.exposure + "s", n += "" == e.exif.iso ? "" : " &nbsp; " + e.exif.iso + " ISO", "" != e.exif.time && (n += " &nbsp; " + e.exif.time)) : n += " n/a", t += '<div class="nGY2PopupOneItemText">' + n + "</div>", "" != e.exif.location ? (t += '<div class="nGY2PopupOneItemText">' + u.O.icons.location + ' <a href="http://maps.google.com/maps?z=12&t=m&q=' + encodeURIComponent(e.exif.location) + '" target="_blank">' + e.exif.location + "</a></div>", t += '<iframe width="300" height="150" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?&amp;t=m&amp;q=' + encodeURIComponent(e.exif.location) + '&amp;output=embed"></iframe>') : t += '<div class="nGY2PopupOneItemText">' + u.O.icons.location + ": n/a</div>";
            var i = {
                    title: u.O.icons.viewerInfo,
                    content: t
                },
                a = u.O.fnPopupMediaInfo;
            null !== a && (i = "function" == typeof a ? a(e, i.title, i.content) : window[a](e, i.title, i.content)), fe(i.title, i.content, "Left")
        }

        function Be(e) {
            var t = '<div class="ngbt ngy2viewerToolAction ',
                n = e.replace(/^\s+|\s+$/g, "");
            switch (n) {
                case "minimizeButton":
                case "minimize":
                    var i = u.O.icons.viewerToolbarMin;
                    "min" == u.VOM.toolbarMode && (i = u.O.icons.viewerToolbarStd), t += 'minimizeButton nGEvent" data-ngy2action="minimize">' + i + "</div>";
                    break;
                case "previousButton":
                case "previous":
                    t += 'previousButton nGEvent" data-ngy2action="previous">' + u.O.icons.viewerPrevious + "</div>";
                    break;
                case "pageCounter":
                    t += 'pageCounter nGEvent"></div>';
                    break;
                case "nextButton":
                case "next":
                    t += 'nextButton nGEvent" data-ngy2action="next">' + u.O.icons.viewerNext + "</div>";
                    break;
                case "playPauseButton":
                case "playPause":
                    t += 'playButton playPauseButton nGEvent" data-ngy2action="playPause">' + u.O.icons.viewerPlay + "</div>";
                    break;
                case "rotateLeft":
                    t += 'rotateLeftButton nGEvent" data-ngy2action="rotateLeft">' + u.O.icons.viewerRotateLeft + "</div>";
                    break;
                case "rotateRight":
                    t += 'rotateRightButton nGEvent" data-ngy2action="rotateRight">' + u.O.icons.viewerRotateRight + "</div>";
                    break;
                case "downloadButton":
                case "download":
                    t += 'downloadButton nGEvent" data-ngy2action="download">' + u.O.icons.viewerDownload + "</div>";
                    break;
                case "zoomButton":
                case "zoom":
                    t += 'nGEvent" data-ngy2action="zoomIn">' + u.O.icons.viewerZoomIn + '</div><div class="ngbt ngy2viewerToolAction nGEvent" data-ngy2action="zoomOut">' + u.O.icons.viewerZoomOut + "</div>";
                    break;
                case "fullscreenButton":
                case "fullscreen":
                    var a = u.O.icons.viewerFullscreenOn;
                    ngscreenfull.enabled && u.VOM.viewerIsFullscreen && (a = u.O.icons.viewerFullscreenOff), t += 'setFullscreenButton fullscreenButton nGEvent" data-ngy2action="fullScreen">' + a + "</div>";
                    break;
                case "infoButton":
                case "info":
                    t += 'infoButton nGEvent" data-ngy2action="info">' + u.O.icons.viewerInfo + "</div>";
                    break;
                case "linkOriginalButton":
                case "linkOriginal":
                    t += 'linkOriginalButton nGEvent" data-ngy2action="linkOriginal">' + u.O.icons.viewerLinkOriginal + "</div>";
                    break;
                case "closeButton":
                case "close":
                    t += 'closeButton nGEvent" data-ngy2action="close">' + u.O.icons.buttonClose + "</div>";
                    break;
                case "shareButton":
                case "share":
                    t += 'nGEvent" data-ngy2action="share">' + u.O.icons.viewerShare + "</div>";
                    break;
                case "label":
                    t += '"><div class="label"><div class="title nGEvent" itemprop="name"></div><div class="description nGEvent" itemprop="description"></div></div></div>';
                    break;
                case "shoppingcart":
                    t += 'closeButton nGEvent" data-ngy2action="shoppingcart">' + u.O.icons.viewerShoppingcart + "</div>";
                    break;
                default:
                    if (0 == n.indexOf("custom")) {
                        var o = "",
                            r = u.O.fnImgToolbarCustInit;
                        if (null !== r && ("function" == typeof r ? r(n) : window[r](n)), null == o || "" == o) {
                            var l = n.substring(6);
                            o = u.O.icons["viewerCustomTool" + l]
                        }
                        t += "ngy2CustomBtn " + n + ' nGEvent" data-ngy2action="' + n + '">' + o + "</div>"
                    } else t = ""
            }
            return t
        }

        function He() {
            u.VOM.playSlideshow ? (window.clearTimeout(u.VOM.playSlideshowTimerID), u.VOM.playSlideshow = !1, u.VOM.$viewer.find(".playPauseButton").html(u.O.icons.viewerPlay)) : (u.VOM.playSlideshow = !0, Qe(), u.VOM.$viewer.find(".playPauseButton").html(u.O.icons.viewerPause))
        }

        function Ue() {
            u.VOM.toolbarMode = "std";
            for (var e = "", t = u.O.viewerToolbar.standard.split(","), n = 0, i = t.length; n < i; n++) e += Be(t[n]);
            u.VOM.$toolbar.find(".toolbar").html(e), je()
        }

        function We() {
            if (null == u.O.viewerToolbar.minimized || "" == u.O.viewerToolbar.minimized) Ue();
            else {
                u.VOM.toolbarMode = "min";
                for (var e = "", t = u.O.viewerToolbar.minimized.split(","), n = 0, i = t.length; n < i; n++) e += Be(t[n]);
                u.VOM.$toolbar.find(".toolbar").html(e), je()
            }
        }

        function je() {
            var e = u.VOM.content.current.vIdx;
            if (null != e) {
                var t = u.VOM.content.current.NGY2Item(),
                    n = !1;
                void 0 !== t.title && "" != t.title ? (u.VOM.$viewer.find(".ngy2viewerToolAction").find(".title").html(t.title), n = !0) : u.VOM.$viewer.find(".ngy2viewerToolAction").find(".title").html(""), void 0 !== t.description && "" != t.description ? (u.VOM.$viewer.find(".ngy2viewerToolAction").find(".description").html(t.description), n = !0) : u.VOM.$viewer.find(".ngy2viewerToolAction").find(".description").html(""), n ? u.VOM.$viewer.find(".ngy2viewerToolAction").find(".label").show() : u.VOM.$viewer.find(".ngy2viewerToolAction").find(".label").hide();
                var i = u.VOM.items.length;
                i > 0 && u.VOM.$viewer.find(".pageCounter").html(u.VOM.items[e].mediaNumber + "/" + i);
                var a = u.VOM.$viewer.find(".ngy2CustomBtn"),
                    o = u.O.fnImgToolbarCustDisplay;
                a.length > 0 && null !== o && ("function" == typeof o ? o(a, t) : window[o](a, t)), Pe()
            }
        }

        function Xe(e) {
            if (u.VOM.swipePosX = e, null == u.CSStransformName);
            else {
                u.VOM.content.current.$media[0].style[u.CSStransformName] = "translate(" + e + "px, 0px)";
                var t = u.VOM.content.previous.NGY2Item(),
                    n = u.VOM.content.next.NGY2Item();
                if (u.O.imageTransition.startsWith("SWIPE")) {
                    t.mediaTransition() && et(u.VOM.content.previous, 1), n.mediaTransition() && et(u.VOM.content.next, 1);
                    var i = Math.min(Math.max(Math.abs(e) / u.VOM.window.lastWidth, .8), 1);
                    if ("SWIPE" == u.O.imageTransition && (i = 1), e > 0) {
                        let a = u.VOM.window.lastWidth;
                        t.mediaTransition() && (u.VOM.content.previous.$media[0].style[u.CSStransformName] = "translate(" + (-a + e) + "px, 0px) scale(" + i + ")"), n.mediaTransition() && (u.VOM.content.next.$media[0].style[u.CSStransformName] = "translate(" + a + "px, 0px) scale(" + i + ")")
                    } else {
                        let a = -u.VOM.window.lastWidth;
                        n.mediaTransition() && (u.VOM.content.next.$media[0].style[u.CSStransformName] = "translate(" + (-a + e) + "px, 0px) scale(" + i + ")"), t.mediaTransition() && (u.VOM.content.previous.$media[0].style[u.CSStransformName] = "translate(" + a + "px, 0px) scale(" + i + ")")
                    }
                }
                if ("SLIDEAPPEAR" == u.O.imageTransition)
                    if (u.VOM.content.previous.$media[0].style[u.CSStransformName] = "", u.VOM.content.next.$media[0].style[u.CSStransformName] = "", e < 0) {
                        let i = -e / u.VOM.window.lastWidth;
                        n.mediaTransition() && et(u.VOM.content.next, i), t.mediaTransition() && et(u.VOM.content.previous, 0)
                    } else {
                        let i = e / u.VOM.window.lastWidth;
                        t.mediaTransition() && et(u.VOM.content.previous, i), n.mediaTransition() && et(u.VOM.content.next, 0)
                    }
            }
        }

        function Qe(e) {
            e = e || 0, u.VOM.viewerMediaIsChanged || (new Date).getTime() - u.VOM.timeImgChanged < 300 || (at("lightboxNextImage"), Ze("nextImage", e))
        }

        function qe(e) {
            e = e || 0, u.VOM.viewerMediaIsChanged || (new Date).getTime() - u.VOM.timeImgChanged < 300 || (u.VOM.playSlideshow && He(), at("lightboxPreviousImage"), Ze("previousImage", e))
        }

        function Ze(e, t) {
            t = t || 0, u.O.debugMode && console.timeline && console.timeline("nanogallery2_viewer"), u.VOM.playSlideshow && window.clearTimeout(u.VOM.playSlideshowTimerID);
            var n = null,
                i = null;
            switch (u.VOM.timeImgChanged = (new Date).getTime(), u.VOM.viewerMediaIsChanged = !0, u.VOM.zoom.isZooming = !1, nt(!0), e) {
                case "":
                    n = u.VOM.content.current, i = u.VOM.content.current;
                    break;
                case "previousImage":
                    n = u.VOM.content.current, i = u.VOM.content.previous;
                    break;
                default:
                    n = u.VOM.content.current, i = u.VOM.content.next
            }
            if (rt(i.NGY2Item().albumID, i.NGY2Item().GetID()), "" != e) {
                var a = u.GOM.cache.viewport,
                    o = "",
                    r = 500 * (a.w - Math.abs(u.VOM.swipePosX)) / a.w;
                if (t > 0 && (r = Math.min((a.w - Math.abs(u.VOM.swipePosX)) / t, r), o = "linear"), null == u.CSStransformName) et(i, 1), et(n, 1), Je(e);
                else switch (u.O.imageTransition) {
                    case "SWIPE":
                    case "SWIPE2":
                        var l = "nextImage" == e ? -a.w : a.w;
                        i.$media[0].style[u.CSStransformName] = "translate(" + -l + "px, 0px) ", 0 == t && (o = "swipe" == u.O.imageTransition ? "easeInOutSine" : "easeOutCubic"), et(u.VOM.content.current, 1), u.VOM.content.current.$media[0].style[u.CSStransformName] = "translate(0px, 0px)", et(i, 1), (new NGTweenable).tween({
                            from: {
                                t: u.VOM.swipePosX
                            },
                            to: {
                                t: "nextImage" == e ? -a.w : a.w
                            },
                            attachment: {
                                dT: e,
                                new_content_item: i,
                                dir: l,
                                media_transition: i.NGY2Item().mediaTransition()
                            },
                            duration: r,
                            easing: o,
                            step: function (e, t) {
                                if (u.VOM.content.current.$media[0].style[u.CSStransformName] = "translate(" + e.t + "px, 0px)", t.media_transition) {
                                    var n = Math.min(Math.max(Math.abs(e.t) / u.VOM.window.lastWidth, .8), 1);
                                    "SWIPE" == u.O.imageTransition && (n = 1), t.new_content_item.$media[0].style[u.CSStransformName] = "translate(" + (-t.dir + e.t) + "px, 0px) scale(" + n + ")"
                                }
                            },
                            finish: function (e, t) {
                                u.VOM.content.current.$media[0].style[u.CSStransformName] = "", et(u.VOM.content.current, 0), t.new_content_item.$media[0].style[u.CSStransformName] = "", Je(t.dT)
                            }
                        });
                        break;
                    case "SLIDEAPPEAR":
                    default:
                        var s = Math.abs(u.VOM.swipePosX) / u.VOM.window.lastWidth;
                        i.$media[0].style[u.CSStransformName] = "", 0 == t && (o = "easeInOutSine"), (new NGTweenable).tween({
                            from: {
                                o: s,
                                t: u.VOM.swipePosX
                            },
                            to: {
                                o: 1,
                                t: "nextImage" == e ? -a.w : a.w
                            },
                            attachment: {
                                dT: e,
                                new_content_item: i,
                                media_transition: i.NGY2Item().mediaTransition()
                            },
                            delay: 30,
                            duration: r,
                            easing: o,
                            step: function (e, t) {
                                u.VOM.content.current.$media[0].style[u.CSStransformName] = "translate(" + e.t + "px, 0px)", t.media_transition && et(t.new_content_item, e.o)
                            },
                            finish: function (e, t) {
                                u.VOM.content.current.$media[0].style[u.CSStransformName] = "", Je(t.dT)
                            }
                        })
                }
            }
        }

        function Je(e) {
            var t = 0;
            switch (e) {
                case "":
                    t = u.VOM.content.current.vIdx;
                    break;
                case "previousImage":
                    t = u.VOM.content.previous.vIdx;
                    break;
                default:
                    t = u.VOM.content.next.vIdx
            }
            u.VOM.content.current.vIdx = t, u.VOM.content.next.vIdx = u.VOM.IdxNext(), u.VOM.content.previous.vIdx = u.VOM.IdxPrevious(), u.VOM.gallery.Resize(), u.VOM.gallery.SetThumbnailActive();
            var n = u.VOM.content.current.NGY2Item();
            je(), u.O.debugMode && console.timeline && console.timelineEnd("nanogallery2_viewer");
            var i = u.O.fnImgDisplayed;
            if (null !== i && ("function" == typeof i ? i(n) : window[i](n)), u.VOM.swipePosX = 0, "" != e) {
                u.VOM.content.current.$media.removeClass("imgCurrent");
                var a = u.VOM.content.current.$media;
                switch (e) {
                    case "nextImage":
                        u.VOM.content.current.$media = u.VOM.content.next.$media, u.VOM.content.next.$media = a;
                        break;
                    case "previousImage":
                        u.VOM.content.current.$media = u.VOM.content.previous.$media, u.VOM.content.previous.$media = a
                }
            }
            u.VOM.content.current.$media.addClass("imgCurrent");
            var o = u.VOM.$content.find(".nGY2ViewerMediaPan");
            u.VOM.content.current.$media.insertAfter(o.last()), "img" == n.mediaKind && 0 == n.imageWidth ? et(u.VOM.content.current, 0) : (u.VOM.content.current.$media.children().eq(0).attr("class", "nGY2ViewerMediaLoaderHidden"), et(u.VOM.content.current, 1)), u.VOM.content.next.$media.empty();
            var r = u.VOM.content.next.NGY2Item(),
                l = '<div class="nGY2ViewerMediaLoaderDisplayed"></div>';
            "img" == r.mediaKind && 0 != r.imageWidth && 0 != r.imageHeight && (l = '<div class="nGY2ViewerMediaLoaderHidden"></div>'), u.VOM.content.next.$media.append(l + r.mediaMarkup), et(u.VOM.content.next, 0), et(u.VOM.content.previous, 0), "img" == r.mediaKind ? u.VOM.ImageLoader.loadImage(Ke, r) : Ce(u.VOM.content.next.$media), u.VOM.content.previous.$media.empty();
            var s = u.VOM.content.previous.NGY2Item();
            l = '<div class="nGY2ViewerMediaLoaderDisplayed"></div>', "img" == s.mediaKind && 0 != s.imageWidth && 0 != s.imageHeight && (l = '<div class="nGY2ViewerMediaLoaderHidden"></div>'), u.VOM.content.previous.$media.append(l + s.mediaMarkup), et(u.VOM.content.previous, 0), et(u.VOM.content.next, 0), "img" == s.mediaKind ? u.VOM.ImageLoader.loadImage(Ke, s) : Ce(u.VOM.content.previous.$media), u.VOM.playSlideshow && u.VOM.content.current.$media.children().eq(1).ngimagesLoaded().always((function (e) {
                u.VOM.playSlideshow && (u.VOM.playSlideshowTimerID = window.setTimeout((function () {
                    Qe()
                }), u.VOM.slideshowDelay))
            })), nt(), u.VOM.viewerMediaIsChanged = !1, at("lightboxImageDisplayed")
        }

        function Ke(e, t, n, i) {
            n.imageWidth = e, n.imageHeight = t, u.VOM.content.current.NGY2Item() == n && (u.VOM.content.current.$media.children().eq(0).attr("class", "nGY2ViewerMediaLoaderHidden"), et(u.VOM.content.current, 1), u.VOM.zoom.userFactor = 1), u.VOM.content.next.NGY2Item() == n && u.VOM.content.next.$media.children().eq(0).attr("class", "nGY2ViewerMediaLoaderHidden"), u.VOM.content.previous.NGY2Item() == n && u.VOM.content.previous.$media.children().eq(0).attr("class", "nGY2ViewerMediaLoaderHidden"), Le()
        }

        function et(e, t) {
            var n = e.NGY2Item(),
                i = e.$media;
            "img" != n.mediaKind || 0 != n.imageWidth ? 0 == t ? i.children().css({
                opacity: 0,
                visibility: "hidden"
            }) : i.children().css({
                opacity: t,
                visibility: "visible"
            }) : i.children().eq(1).css({
                opacity: 0,
                visibility: "hidden"
            })
        }

        function tt(e) {
            if (null == e && (e = u.VOM.content.current.vIdx), u.VOM.viewerMediaIsChanged = !1, u.VOM.viewerDisplayed) {
                if (jQuery("body").removeClass("nGY2_body_scrollbar"), jQuery("#nGY2_body_scrollbar_style").remove(), u.VOM.playSlideshow && (window.clearTimeout(u.VOM.playSlideshowTimerID), u.VOM.playSlideshow = !1), u.VOM.hammertime.destroy(), u.VOM.hammertime = null, ngscreenfull.enabled && u.VOM.viewerIsFullscreen && (u.VOM.viewerIsFullscreen = !1, ngscreenfull.exit()), jQuery(".nGY2ViewerContainer").remove(), u.VOM.$baseCont = null, u.VOM.viewerDisplayed = !1, u.O.lightboxStandalone) return;
                if (u.O.thumbnailAlbumDisplayImage)
                    if (null == e);
                    else {
                        var t = u.I[u.VOM.items[e].ngy2ItemIdx],
                            n = NGY2Item.Get(u, t.albumID);
                        u.GOM.albumIdx != n.albumID ? g("-1", n.albumID) : (x(), rt("", ""), U())
                    }
                else null != e && (-1 == u.GOM.albumIdx ? g("", u.I[u.VOM.items[e].ngy2ItemIdx].albumID) : (x(), rt(u.I[u.VOM.items[e].ngy2ItemIdx].albumID, ""), U()));
                u.VOM.timeImgChanged = (new Date).getTime()
            }
        }

        function nt(e) {
            if (e = void 0 !== e && e, null !== u.VOM.$toolbar) {
                var t = u.VOM.$viewer.width(),
                    n = u.VOM.$viewer.height();
                if (null != u.VOM.content.current.$media.children().eq(1) && -1 != u.VOM.content.current.vIdx && (e || u.VOM.window.lastWidth != t || u.VOM.window.lastHeight != n)) {
                    u.VOM.window.lastWidth = t, u.VOM.window.lastHeight = n;
                    var i = 0,
                        a = 0;
                    switch ("none" != u.O.viewerGallery && (i = u.O.viewerGalleryTHeight + 10), "bottom" == u.O.viewerGallery && (a = i), u.O.viewerToolbar.position) {
                        case "top":
                        case "topOverImage":
                            u.VOM.$content.css({
                                height: n,
                                width: t,
                                top: 0
                            }), u.VOM.$toolbar.css({
                                top: 0,
                                bottom: ""
                            });
                            break;
                        case "bottom":
                        case "bottomOverImage":
                        default:
                            n -= a, u.VOM.$content.css({
                                height: n,
                                width: t,
                                bottom: -a,
                                top: 0
                            }), u.VOM.$toolbar.css({
                                bottom: i
                            })
                    }!u.VOM.viewerMediaIsChanged && u.VOM.zoom.isZooming ? Le() : u.VOM.zoom.isZooming || 0 == u.VOM.zoom.userFactor && 0 == u.VOM.panPosX && 0 == u.VOM.panPosY && 0 == u.VOM.zoom.posX && 0 == u.VOM.zoom.posY ? (u.VOM.zoom.userFactor = 1, u.VOM.zoom.isZooming = !1, u.VOM.panPosX = 0, u.VOM.panPosY = 0, u.VOM.zoom.posX = 0, u.VOM.zoom.posY = 0, Le()) : (u.VOM.zoom.isZooming = !0, (new NGTweenable).tween({
                        from: {
                            userFactor: u.VOM.zoom.userFactor,
                            panPosX: u.VOM.panPosX,
                            panPosY: u.VOM.panPosY,
                            zoomPosX: u.VOM.zoom.posX,
                            zoomPosY: u.VOM.zoom.posY
                        },
                        to: {
                            userFactor: 1,
                            panPosX: 0,
                            panPosY: 0,
                            zoomPosX: 0,
                            zoomPosY: 0
                        },
                        easing: "easeInOutSine",
                        delay: 0,
                        duration: 150,
                        step: function (e) {
                            u.VOM.zoom.userFactor = e.userFactor, u.VOM.panPosX = e.panPosX, u.VOM.panPosY = e.panPosY, u.VOM.zoom.posX = e.zoomPosX, u.VOM.zoom.posY = e.zoomPosY, Le()
                        },
                        finish: function (e) {
                            u.VOM.zoom.isZooming = !1
                        }
                    }))
                }
            }
        }

        function it(e) {
            const t = /(auto|scroll)/,
                n = (e, t) => null === e.parentNode ? t : n(e.parentNode, t.concat([e])),
                i = (e, t) => getComputedStyle(e, null).getPropertyValue(t),
                a = e => t.test((e => i(e, "overflow") + i(e, "overflow-y") + i(e, "overflow-x"))(e));
            return (e => {
                if (!(e instanceof HTMLElement || e instanceof SVGElement)) return;
                const t = n(e.parentNode, []);
                for (let e = 0; e < t.length; e += 1) {
                    if (t[e] === document.body) return null;
                    if (a(t[e])) return t[e]
                }
                return document.scrollingElement || document.documentElement
            })(e)
        }

        function at(e) {
            var t = e + ".nanogallery2",
                n = null;
            try {
                n = new Event(t)
            } catch (e) {
                (n = document.createEvent("Event")).initEvent(t, !1, !1)
            }
            u.$E.base.trigger(t, n)
        }

        function ot() {
            if (!u.O.locationHash) return !1;
            var e = "#nanogallery/" + u.baseEltID + "/",
                t = location.hash;
            if (u.O.debugMode && (console.log("------------------------ PROCESS LOCATION HASH"), console.log("newLocationHash1: " + t), console.log("G.locationHashLastUsed: " + u.locationHashLastUsed)), "" == t && "" !== u.locationHashLastUsed) return u.O.debugMode && console.log("display root album"), u.locationHashLastUsed = "", u.O.debugMode && console.log("new3 G.locationHashLastUsed: " + u.locationHashLastUsed), g("", "0"), !0;
            if (t != u.locationHashLastUsed) {
                if (0 == t.indexOf(e)) {
                    var n = p(t.substring(e.length));
                    return "0" != n.imageID ? (u.O.debugMode && console.log("display image: " + n.albumID + "-" + n.imageID), Q(n.imageID, n.albumID), !0) : (u.O.debugMode && console.log("display album: " + n.albumID), g("-1", n.albumID), !0)
                }
                return !1
            }
        }

        function rt(e, t) {
            if (!u.O.locationHash || u.O.lightboxStandalone) return !1;
            if (u.O.debugMode && console.log("------------------------ SET LOCATION HASH"), "" == t && ("-1" == e || "0" == e || u.O.album == e)) return "" != location.hash && ("pushState" in history ? history.pushState("", document.title, window.location.pathname + window.location.search) : location.hash = ""), u.locationHashLastUsed = "", void(u.O.debugMode && console.log("new2 G.locationHashLastUsed: " + u.locationHashLastUsed));
            var n = "#nanogallery/" + u.baseEltID + "/" + e;
            "" != t && (n += "/" + t);
            var i = location.hash;
            if (u.O.debugMode && (console.log("newLocationHash2: " + n), console.log("location.hash: " + i)), u.locationHashLastUsed = n, u.O.debugMode && console.log("new G.locationHashLastUsed: " + u.locationHashLastUsed), "" == i || i != n) try {
                top.location.hash = n
            } catch (e) {
                u.O.locationHash = !1
            }
        }

        function lt() {
            C();
            var e = u.GOM.curNavLevel,
                t = u.GOM.curWidth;
            if (u.VOM.viewerDisplayed) nt(), u.VOM.gallery.Resize();
            else if (u.galleryResizeEventEnabled) {
                var n = ht();
                if (-1 != u.GOM.albumIdx) {
                    var i = u.tn.settings;
                    if ("MOSAIC" == u.layout.engine) {
                        if (JSON.stringify(i.mosaic[e][t]) !== JSON.stringify(i.mosaic[e][n])) return u.GOM.curWidth = n, u.GOM.pagination.currentPage = 0, void w(u.GOM.albumIdx)
                    } else if (i.height[e][t] != i.height[e][n] || i.width[e][t] != i.width[e][n] || i.gutterHeight[e][t] != i.gutterHeight[e][n] || i.gutterWidth[e][t] != i.gutterWidth[e][n]) return u.GOM.curWidth = n, u.GOM.pagination.currentPage = 0, void w(u.GOM.albumIdx)
                }
                x()
            }
        }

        function st() {
            u.VOM.viewerDisplayed || ut()
        }

        function ut() {
            0 == u.galleryResizeEventEnabled ? window.setTimeout(ut, 10) : x()
        }

        function ct(e, t) {
            return "" != u.i18nLang && void 0 !== e[t + "_" + u.i18nLang] && e[t + "_" + u.i18nLang].length > 0 ? e[t + "_" + u.i18nLang] : e[t]
        }

        function ht() {
            var e = u.GOM.cache.viewport.w;
            return u.O.breakpointSizeSM > 0 && e < u.O.breakpointSizeSM ? "xs" : u.O.breakpointSizeME > 0 && e < u.O.breakpointSizeME ? "sm" : u.O.breakpointSizeLA > 0 && e < u.O.breakpointSizeLA ? "me" : u.O.breakpointSizeXL > 0 && e < u.O.breakpointSizeXL ? "la" : "xl"
        }

        function dt(e) {
            for (var t = document.createElement("div"), n = 0; n < e.length; ++n)
                if (void 0 !== t.style[e[n]]) return e[n];
            return null
        }
    }
    /*!
     * imagesLoaded PACKAGED v4.1.1
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */
    e.nanogallery2 = function (e, t) {
            var i = this;
            i.$e = jQuery(e), i.e = e, i.$e.data("nanogallery2data", i), i.init = function () {
                void 0 === window.NGY2Item && (window.NGY2Tools = function () {
                    function e() {}
                    return e.FilterAlbumName = function (e, t) {
                        var n = e.toUpperCase();
                        if (!(this.albumList.length > 0)) {
                            var i = !1;
                            if (null !== this.allowList) {
                                for (a = 0; a < this.allowList.length; a++) - 1 !== n.indexOf(this.allowList[a]) && (i = !0);
                                if (!i) return !1
                            }
                            if (null !== this.blockList)
                                for (a = 0; a < this.blockList.length; a++)
                                    if (-1 !== n.indexOf(this.blockList[a])) return !1;
                            return !0
                        }
                        for (var a = 0; a < this.albumList.length; a++)
                            if (n === this.albumList[a].toUpperCase() || t === this.albumList[a]) return !0
                    }, e.NanoAlert = function (t, n, i) {
                        e.NanoConsoleLog.call(t, n), null != t.$E.conConsole && (t.$E.conConsole.css({
                            visibility: "visible",
                            minHeight: "100px"
                        }), 0 == i ? t.$E.conConsole.append("<p>" + n + "</p>") : t.$E.conConsole.append("<p>nanogallery2: " + n + " [" + t.baseEltID + "]</p>"))
                    }, e.NanoConsoleLog = function (e, t) {
                        window.console && console.log("nanogallery2: " + t + " [" + e.baseEltID + "]")
                    }, e.PreloaderDisplay = function (e) {
                        if (!0 === e) {
                            if (this.$E.conLoadingB.removeClass("nanoGalleryLBarOff").addClass("nanoGalleryLBar"), null != this.GOM.albumIdxLoading && -1 != this.GOM.albumIdxLoading) {
                                this.I[this.GOM.albumIdxLoading].$Elts[".nGY2TnImg"].addClass("nGY2GThumbnailLoaderDisplayed")
                            }
                        } else if (this.$E.conLoadingB.removeClass("nanoGalleryLBar").addClass("nanoGalleryLBarOff"), null != this.GOM.albumIdxLoading && -1 != this.GOM.albumIdxLoading) {
                            this.I[this.GOM.albumIdxLoading].$Elts[".nGY2TnImg"].removeClass("nGY2GThumbnailLoaderDisplayed")
                        }
                    }, e.AreaShuffle = function (e) {
                        for (var t, n, i = e.length; i; t = Math.floor(Math.random() * i), n = e[--i], e[i] = e[t], e[t] = n);
                        return e
                    }, e.GetImageTitleFromURL = function (e) {
                        return "%filename" == this.O.thumbnailLabel.get("title") ? e.split("/").pop().replace("_", " ") : "%filenameNoExt" == this.O.thumbnailLabel.get("title") ? e.split("/").pop().split(".").shift().replace("_", " ") : ""
                    }, e.AlbumPostProcess = function (t) {
                        var n = this.gallerySorting[this.GOM.curNavLevel],
                            i = this.galleryMaxItems[this.GOM.curNavLevel];
                        if ("" != n || i > 0) {
                            var a = this.I.filter((function (e) {
                                return e.albumID == t && "albumUp" != e.kind
                            }));
                            switch (n) {
                                case "RANDOM":
                                    a = e.AreaShuffle(a);
                                    break;
                                case "REVERSED":
                                    a = a.reverse();
                                    break;
                                case "TITLEASC":
                                    a.sort((function (e, t) {
                                        return e.title.toUpperCase() < t.title.toUpperCase() ? -1 : e.title.toUpperCase() > t.title.toUpperCase() ? 1 : 0
                                    }));
                                    break;
                                case "TITLEDESC":
                                    a.sort((function (e, t) {
                                        return e.title.toUpperCase() > t.title.toUpperCase() ? -1 : e.title.toUpperCase() < t.title.toUpperCase() ? 1 : 0
                                    }))
                            }
                            i > 0 && a.length > i && a.splice(i - 1, a.length - i), this.I.ngy2removeIf((function (e) {
                                return e.albumID == t && "albumUp" != e.kind
                            })), this.I.push.apply(this.I, a)
                        }
                    }, e
                }(), window.NGY2Item = function () {
                    var e = 1;

                    function t(t) {
                        var n = 0;
                        n = null == t ? e++ : t, this.GetID = function () {
                            return n
                        }, this.kind = "", this.mediaKind = "img", this.mediaMarkup = "", this.G = null, this.title = "", this.description = "", this.albumID = 0, this.src = "", this.width = 0, this.height = 0, this.destinationURL = "", this.downloadURL = "", this.author = "", this.left = 0, this.top = 0, this.width = 0, this.height = 0, this.resizedContentWidth = 0, this.resizedContentHeight = 0, this.thumbs = {
                            url: {
                                l1: {
                                    xs: "",
                                    sm: "",
                                    me: "",
                                    la: "",
                                    xl: ""
                                },
                                lN: {
                                    xs: "",
                                    sm: "",
                                    me: "",
                                    la: "",
                                    xl: ""
                                }
                            },
                            width: {
                                l1: {
                                    xs: 0,
                                    sm: 0,
                                    me: 0,
                                    la: 0,
                                    xl: 0
                                },
                                lN: {
                                    xs: 0,
                                    sm: 0,
                                    me: 0,
                                    la: 0,
                                    xl: 0
                                }
                            },
                            height: {
                                l1: {
                                    xs: 0,
                                    sm: 0,
                                    me: 0,
                                    la: 0,
                                    xl: 0
                                },
                                lN: {
                                    xs: 0,
                                    sm: 0,
                                    me: 0,
                                    la: 0,
                                    xl: 0
                                }
                            }
                        }, this.thumbnailImgRevealed = !1, this.imageDominantColors = null, this.imageDominantColor = null, this.featured = !1, this.flickrThumbSizes = {}, this.picasaThumbs = null, this.hovered = !1, this.hoverInitDone = !1, this.contentIsLoaded = !1, this.contentLength = 0, this.numberItems = 0, this.mediaNumber = 0, this.mediaCounter = 0, this.eltTransform = [], this.eltFilter = [], this.eltEffect = [], this.paginationLastPage = 0, this.paginationLastWidth = 0, this.customData = {}, this.selected = !1, this.imageWidth = 0, this.imageHeight = 0, this.$elt = null, this.$Elts = [], this.tags = [], this.albumTagList = [], this.albumTagListSel = [], this.exif = {
                            exposure: "",
                            flash: "",
                            focallength: "",
                            fstop: "",
                            iso: "",
                            model: "",
                            time: "",
                            location: ""
                        }, this.deleted = !1, this.rotationAngle = 0
                    }
                    t.Get = function (e, t) {
                        for (var n = e.I.length, i = 0; i < n; i++)
                            if (e.I[i].GetID() == t) return e.I[i];
                        return null
                    }, t.GetIdx = function (e, t) {
                        for (var n = e.I.length, i = 0; i < n; i++)
                            if (e.I[i].GetID() == t) return i;
                        return -1
                    }, t.New = function (e, n, i, o, r, l, s) {
                        var u = t.Get(e, r);
                        if (null !== e.O.titleTranslationMap) {
                            let t = e.O.titleTranslationMap.find(e => e.title === n);
                            void 0 !== t && (n = t.replace)
                        }
                        if (-1 != r && 0 != r && "image gallery by nanogallery2 [build]" != n && e.O.thumbnailLevelUp && 0 == u.getContentLength(!1) && "" == e.O.album) {
                            let n = new t("0");
                            e.I.push(n), u.contentLength += 1, n.title = "UP", n.albumID = r, n.kind = "albumUp", n.G = e, jQuery.extend(!0, n.thumbs.width, e.tn.defaultSize.width), jQuery.extend(!0, n.thumbs.height, e.tn.defaultSize.height)
                        }
                        var c = t.Get(e, o);
                        null === c && (c = new t(o), e.I.push(c), -1 != r && "image gallery by nanogallery2 [build]" != n && (u.contentLength += 1)), c.G = e, c.albumID = r, c.kind = l, "image" == l && (u.mediaCounter += 1, c.mediaNumber = u.mediaCounter);
                        var h = e.O.thumbnailFeaturedKeyword;
                        if ("" != h) {
                            h = h.toUpperCase();
                            var d = n.toUpperCase().indexOf(h);
                            d > -1 && (c.featured = !0, n = n.substring(0, d) + n.substring(d + h.length, n.length)), (d = i.toUpperCase().indexOf(h)) > -1 && (c.featured = !0, i = i.substring(0, d) + i.substring(d + h.length, i.length))
                        }
                        if ("string" == typeof e.galleryFilterTags.Get()) switch (e.galleryFilterTags.Get().toUpperCase()) {
                            case "TITLE": {
                                let e, t = /(?:^|\W)#(\w+)(?!\w)/g,
                                    i = [];
                                for (; e = t.exec(n);) i.push(e[1].replace(/^\s*|\s*$/, ""));
                                c.setTags(i), n = n.split("#").join("");
                                break
                            }
                            case "DESCRIPTION": {
                                let e, t = /(?:^|\W)#(\w+)(?!\w)/g,
                                    n = [];
                                for (; e = t.exec(i);) n.push(e[1].replace(/^\s*|\s*$/, ""));
                                c.setTags(n), i = i.split("#").join("");
                                break
                            }
                        } else "" != s && null != s && c.setTags(s.split(" "));
                        return c.title = a(e, n), c.description = a(e, i), c
                    }, t.prototype.delete = function () {
                        this.deleted = !0, this.G.I[t.GetIdx(this.G, this.albumID)].contentLength--, this.G.I[t.GetIdx(this.G, this.albumID)].numberItems--;
                        for (var e = this.G.GOM.items.length, n = this.GetID(), i = -1, a = -1, o = 0; o < e; o++) {
                            var r = this.G.GOM.items[o],
                                l = this.G.I[r.thumbnailIdx];
                            l.GetID() == n ? r.neverDisplayed || (i = r.thumbnailIdx, a = o) : -1 != i && (r.neverDisplayed || (l.$getElt(".nGY2GThumbnail").data("index", o - 1), l.$getElt(".nGY2GThumbnailImg").data("index", o - 1)))
                        }
                        if (-1 != i) {
                            var s = this.G;
                            1 == this.selected && (this.selected = !1, s.GOM.nbSelected--), null !== s.I[i].$elt && s.I[i].$elt.remove(), s.GOM.items.splice(a, 1), -1 != s.GOM.lastDisplayedIdx && (s.GOM.lastDisplayedIdx -= 1)
                        }
                    }, t.prototype.addToGOM = function () {
                        for (var e = this.GetID(), t = this.G.I.length, n = 0; n < t; n++) {
                            var i = this.G.I[n];
                            if (i.GetID() == e) {
                                var a = i.thumbImg().width,
                                    o = i.thumbImg().height;
                                0 == o && (o = this.G.tn.defaultSize.getHeight()), 0 == a && (a = this.G.tn.defaultSize.getWidth());
                                var r = new this.G.GOM.GTn(n, a, o);
                                this.G.GOM.items.push(r);
                                break
                            }
                        }
                    };
                    var i = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;",
                        "/": "&#x2F;",
                        "`": "&#x60;",
                        "=": "&#x3D;"
                    };

                    function a(e, t) {
                        return 1 == e.O.allowHTMLinData ? t : String(t).replace(/[&<>"'`=\/]/g, (function (e) {
                            return i[e]
                        }))
                    }

                    function o(e, t) {
                        if ("0" === (e = String(e)) || 1 == t) return e;
                        var n = Number(e.replace(/[a-zA-Z]/g, "")),
                            i = e.match(/([^\-0-9\.]+)/g),
                            a = "";
                        return null != i && i.length > 0 && (a = i.join()), isNaN(n) || 0 == n ? e : (n *= t) + a
                    }
                    return t.get_nextId = function () {
                        return e
                    }, t.prototype.$getElt = function (e, t) {
                        return null == this.$elt ? null : (void 0 !== this.$Elts[e] && 1 == !t || (this.$Elts[e] = ".nGY2GThumbnail" == e ? this.$elt : this.$elt.find(e)), this.$Elts[e])
                    }, t.prototype.removeElt = function (e) {
                        if (null != this.$elt && null != this.$Elts[e]) {
                            this.$Elts[e].remove();
                            var t = this.$Elts.indexOf(e);
                            this.$Elts.splice(t, 1)
                        }
                    }, t.prototype.album = function () {
                        return this.G.I[t.GetIdx(this.G, this.albumID)]
                    }, t.prototype.mediaTransition = function () {
                        return this.G.O.viewerTransitionMediaKind.indexOf(this.mediaKind) > -1
                    }, t.prototype.imageSet = function (e, t, n) {
                        this.src = e, this.width = t, this.height = n
                    }, t.prototype.thumbSet = function (e, t, n, i, a) {
                        var o = ["xs", "sm", "me", "la", "xl"];
                        if (void 0 === i || "" == i || null == i)
                            for (var r = 0; r < o.length; r++) void 0 === a || "" == a ? (this.thumbs.url.l1[o[r]] = e, this.thumbs.height.l1[o[r]] = n, this.thumbs.width.l1[o[r]] = t, this.thumbs.url.lN[o[r]] = e, this.thumbs.height.lN[o[r]] = n, this.thumbs.width.lN[o[r]] = t) : (this.thumbs.url[a][o[r]] = e, this.thumbs.height[a][o[r]] = n, this.thumbs.width[a][o[r]] = t);
                        else void 0 === a || "" == a || null == a ? (this.thumbs.url.l1[i] = e, this.thumbs.height.l1[i] = n, this.thumbs.width.l1[i] = t, this.thumbs.url.lN[i] = e, this.thumbs.height.lN[i] = n, this.thumbs.width.lN[i] = t) : (this.thumbs.url[a][i] = e, this.thumbs.height[a][i] = n, this.thumbs.width[a][i] = t);
                        for (r = 0; r < o.length; r++) this.thumbs.height.l1[o[r]] = n;
                        for (r = 0; r < o.length; r++) this.G.tn.settings.height.lN[o[r]] == this.G.tn.settings.getH() && this.G.tn.settings.width.l1[o[r]] == this.G.tn.settings.getW() && (this.thumbs.height.lN[o[r]] = n)
                    }, t.prototype.thumbSetImgHeight = function (e) {
                        for (var t = ["xs", "sm", "me", "la", "xl"], n = 0; n < t.length; n++) this.G.tn.settings.height.l1[t[n]] == this.G.tn.settings.getH() && this.G.tn.settings.width.l1[t[n]] == this.G.tn.settings.getW() && (this.thumbs.height.l1[t[n]] = e);
                        for (n = 0; n < t.length; n++) this.G.tn.settings.height.lN[t[n]] == this.G.tn.settings.getH() && this.G.tn.settings.width.l1[t[n]] == this.G.tn.settings.getW() && (this.thumbs.height.lN[t[n]] = e)
                    }, t.prototype.thumbSetImgWidth = function (e) {
                        for (var t = ["xs", "sm", "me", "la", "xl"], n = 0; n < t.length; n++) this.G.tn.settings.height.l1[t[n]] == this.G.tn.settings.getH() && this.G.tn.settings.width.l1[t[n]] == this.G.tn.settings.getW() && (this.thumbs.width.l1[t[n]] = e);
                        for (n = 0; n < t.length; n++) this.G.tn.settings.height.lN[t[n]] == this.G.tn.settings.getH() && this.G.tn.settings.width.l1[t[n]] == this.G.tn.settings.getW() && (this.thumbs.width.lN[t[n]] = e)
                    }, t.prototype.thumbImg = function () {
                        var e = {
                            src: "",
                            width: 0,
                            height: 0
                        };
                        return "image gallery by nanogallery2 [build]" == this.title ? (e.src = this.G.emptyGif, e.url = this.G.emptyGif, e) : (e.src = this.thumbs.url[this.G.GOM.curNavLevel][this.G.GOM.curWidth], e.width = this.thumbs.width[this.G.GOM.curNavLevel][this.G.GOM.curWidth], e.height = this.thumbs.height[this.G.GOM.curNavLevel][this.G.GOM.curWidth], e)
                    }, t.prototype.setTags = function (e) {
                        if (e.length > 0) {
                            this.tags = e;
                            for (var t = this.album().albumTagList, n = 0; n < e.length; n++) {
                                for (var i = !1, a = 0; a < t.length; a++) e[n].toUpperCase() == t[a].toUpperCase() && (i = !0);
                                0 == i && this.album().albumTagList.push(e[n])
                            }
                        }
                    }, t.prototype.checkTagFilter = function () {
                        if (0 != this.G.galleryFilterTags.Get() && this.album().albumTagList.length > 0) {
                            if (this.G.O.thumbnailLevelUp && "albumUp" == this.kind) return !0;
                            var e = !1,
                                t = this.album().albumTagListSel;
                            if (0 == t.length) return !0;
                            for (var n = 0; n < this.tags.length; n++)
                                for (var i = 0; i < t.length; i++)
                                    if (this.tags[n].toUpperCase() == t[i].toUpperCase()) {
                                        e = !0;
                                        break
                                    } return e
                        }
                        return !0
                    }, t.prototype.isSearchTagFound = function () {
                        if ("" == this.G.GOM.albumSearchTags) return !0;
                        if (this.G.O.thumbnailLevelUp && "albumUp" == this.kind) return !0;
                        for (var e = 0; e < this.tags.length; e++)
                            if (this.tags[e].toUpperCase().indexOf(this.G.GOM.albumSearchTags) >= 0) return !0;
                        return !1
                    }, t.prototype.setMediaURL = function (e, t) {
                        this.src = e, this.mediaKind = t, "img" == t && (this.mediaMarkup = '<img class="nGY2ViewerMedia" src="' + e + '" alt=" " itemprop="contentURL" draggable="false">')
                    }, t.prototype.isToDisplay = function (e) {
                        return this.albumID == e && this.checkTagFilter() && this.isSearchFound() && this.isSearchTagFound() && 0 == this.deleted
                    }, t.prototype.getContentLength = function (e) {
                        if (0 == e || 0 == this.albumTagList.length || 0 == this.G.galleryFilterTags.Get()) return this.contentLength;
                        for (var t = this.G.I.length, n = 0, i = this.GetID(), a = 0; a < t; a++) {
                            this.G.I[a].isToDisplay(i) && n++
                        }
                        return n
                    }, t.prototype.isSearchFound = function () {
                        return "" == this.G.GOM.albumSearch || -1 != this.title.toUpperCase().indexOf(this.G.GOM.albumSearch)
                    }, t.prototype.responsiveURL = function () {
                        var e = "";
                        switch (this.G.O.kind) {
                            case "":
                            case "flickr":
                                e = this.src;
                                break;
                            case "picasa":
                            case "google":
                            case "google2":
                            default:
                                e = this.src
                        }
                        return e
                    }, t.prototype.ThumbnailImageReveal = function () {
                        0 == this.thumbnailImgRevealed && (this.thumbnailImgRevealed = !0, (new NGTweenable).tween({
                            from: {
                                opacity: 0
                            },
                            to: {
                                opacity: 1
                            },
                            attachment: {
                                item: this
                            },
                            delay: 30,
                            duration: 400,
                            easing: "easeOutQuart",
                            step: function (e, t) {
                                var n = t.item.$getElt(".nGY2TnImg");
                                null != n && n.css(e)
                            }
                        }))
                    }, t.prototype.CSSTransformApply = function (e) {
                        var t = this.eltTransform[e];
                        if (".nGY2GThumbnail" == e)
                            for (var n = t.$elt.length - 1, i = 1, a = 1, r = 1, l = 1, s = 1, u = 1, c = 1, h = n; h >= 0; h--) {
                                var d = "translateX(" + o(t.translateX, i) + ") translateY(" + o(t.translateY, a) + ") translateZ(" + o(t.translateZ, r) + ") scale(" + o(t.scale, c) + ") translate(" + o(t.translate, 1) + ")";
                                this.G.IE <= 9 || this.G.isGingerbread ? d += " rotate(" + o(t.rotateZ, u) + ")" : d += " rotateX(" + o(t.rotateX, l) + ") rotateY(" + o(t.rotateY, s) + ") rotateZ(" + o(t.rotateZ, u) + ") rotate(" + o(t.rotate, 1) + ")", t.$elt[h].style[this.G.CSStransformName] = d, n > 0 && (i -= this.G.tn.opt.Get("stacksTranslateX"), a -= this.G.tn.opt.Get("stacksTranslateY"), r -= this.G.tn.opt.Get("stacksTranslateZ"), l -= this.G.tn.opt.Get("stacksRotateX"), s -= this.G.tn.opt.Get("stacksRotateY"), u -= this.G.tn.opt.Get("stacksRotateZ"), c -= this.G.tn.opt.Get("stacksScale"))
                            } else if (null != t.$elt)
                                for (h = 0; h < t.$elt.length; h++)
                                    if (null != t.$elt[h]) {
                                        d = "translateX(" + t.translateX + ") translateY(" + t.translateY + ") translateZ(" + t.translateZ + ") scale(" + t.scale + ") translate(" + t.translate + ")";
                                        this.G.IE <= 9 || this.G.isGingerbread ? d += " rotate(" + t.rotateZ + ")" : d += " rotateX(" + t.rotateX + ") rotateY(" + t.rotateY + ") rotateZ(" + t.rotateZ + ") rotate(" + t.rotate + ")", t.$elt[h].style[this.G.CSStransformName] = d
                                    }
                    }, t.prototype.CSSTransformSet = function (e, t, n, i) {
                        null == this.eltTransform[e] && (this.eltTransform[e] = {
                            translateX: 0,
                            translateY: 0,
                            translateZ: 0,
                            rotateX: 0,
                            rotateY: 0,
                            rotateZ: 0,
                            scale: 1,
                            translate: "0px,0px",
                            rotate: 0
                        }, this.eltTransform[e].$elt = this.$getElt(e)), this.eltTransform[e][t] = n, !0 === i && (this.eltTransform[e].$elt = this.$getElt(e, !0))
                    }, t.prototype.CSSFilterApply = function (e) {
                        var t = this.eltFilter[e],
                            n = "blur(" + t.blur + ") brightness(" + t.brightness + ") grayscale(" + t.grayscale + ") sepia(" + t.sepia + ") contrast(" + t.contrast + ") opacity(" + t.opacity + ") saturate(" + t.saturate + ")";
                        if (null != t.$elt)
                            for (var i = 0; i < t.$elt.length; i++) null != t.$elt[i] && (t.$elt[i].style.WebkitFilter = n, t.$elt[i].style.filter = n)
                    }, t.prototype.CSSFilterSet = function (e, t, n, i) {
                        null == this.eltFilter[e] && (this.eltFilter[e] = {
                            blur: 0,
                            brightness: "100%",
                            grayscale: "0%",
                            sepia: "0%",
                            contrast: "100%",
                            opacity: "100%",
                            saturate: "100%"
                        }, this.eltFilter[e].$elt = this.$getElt(e)), this.eltFilter[e][t] = n, !0 === i && (this.eltTransform[e].$elt = this.$getElt(e, !0))
                    }, t.prototype.animate = function (e, t, i) {
                        if (null != this.$getElt()) {
                            var a = {};
                            a.G = this.G, a.item = this, a.effect = e, a.hoverIn = i, a.cssKind = "", i ? (null == this.eltEffect[e.element] && (this.eltEffect[e.element] = []), null == this.eltEffect[e.element][e.type] && (this.eltEffect[e.element][e.type] = {
                                initialValue: 0,
                                lastValue: 0
                            }), e.firstKeyframe && (this.eltEffect[e.element][e.type] = {
                                initialValue: e.from,
                                lastValue: e.from
                            }), a.animeFrom = e.from, a.animeTo = e.to, a.animeDuration = parseInt(e.duration), a.animeDelay = 30 + parseInt(e.delay + t), a.animeEasing = e.easing) : (a.animeFrom = this.eltEffect[e.element][e.type].lastValue, a.animeTo = this.eltEffect[e.element][e.type].initialValue, a.animeDuration = parseInt(e.durationBack), a.animeDelay = 30 + parseInt(e.delayBack + t), a.animeEasing = e.easingBack);
                            for (var o = ["translateX", "translateY", "translateZ", "scale", "rotateX", "rotateY", "rotateZ"], r = 0; r < o.length; r++)
                                if (e.type == o[r]) {
                                    a.cssKind = "transform";
                                    break
                                } var l = ["blur", "brightness", "grayscale", "sepia", "contrast", "opacity", "saturate"];
                            for (r = 0; r < l.length; r++)
                                if (e.type == l[r]) {
                                    a.cssKind = "filter";
                                    break
                                }! i || ".nGY2GThumbnail" != e.element || "scale" != e.type && "rotateX" != e.type || (this.G.GOM.lastZIndex++, this.$getElt(e.element).css("z-index", this.G.GOM.lastZIndex));
                            var s = new NGTweenable;
                            a.tweenable = s, s.tween({
                                attachment: a,
                                from: {
                                    v: a.animeFrom
                                },
                                to: {
                                    v: a.animeTo
                                },
                                duration: a.animeDuration,
                                delay: a.animeDelay,
                                easing: a.animeEasing,
                                step: function (e, t) {
                                    if (null != t.item.$getElt())
                                        if (!t.hoverIn || t.item.hovered) {
                                            if (t.G.VOM.viewerDisplayed) t.tweenable.stop(!1);
                                            else if (e.v != t.animeFrom) {
                                                switch (t.cssKind) {
                                                    case "transform":
                                                        t.item.CSSTransformSet(t.effect.element, t.effect.type, e.v), t.item.CSSTransformApply(t.effect.element);
                                                        break;
                                                    case "filter":
                                                        t.item.CSSFilterSet(t.effect.element, t.effect.type, e.v), t.item.CSSFilterApply(t.effect.element);
                                                        break;
                                                    default:
                                                        var a = e.v;
                                                        "rgb(" != e.v.substring(0, 4) && "rgba(" != e.v.substring(0, 5) || (a = n(0, a)), t.item.$getElt(t.effect.element).css(t.effect.type, a)
                                                }
                                                i && (t.item.eltEffect[t.effect.element][t.effect.type].lastValue = e.v)
                                            }
                                        } else t.tweenable.stop(!1);
                                    else t.tweenable.stop(!1)
                                },
                                finish: function (e, t) {
                                    if (i && (t.item.eltEffect[t.effect.element][t.effect.type].lastValue = e.v), null != t.item.$getElt() && (!t.hoverIn || t.item.hovered) && !t.G.VOM.viewerDisplayed) switch (t.cssKind) {
                                        case "transform":
                                            t.item.CSSTransformSet(t.effect.element, t.effect.type, t.animeTo), t.item.CSSTransformApply(t.effect.element);
                                            break;
                                        case "filter":
                                            t.item.CSSFilterSet(t.effect.element, t.effect.type, t.animeTo), t.item.CSSFilterApply(t.effect.element);
                                            break;
                                        default:
                                            t.item.$getElt(t.effect.element).css(t.effect.type, t.animeTo)
                                    }
                                }
                            })
                        }
                    }, t
                }()), i.options = jQuery.extend(!0, {}, jQuery.nanogallery2.defaultOptions, t), i.nG2 = null, i.nG2 = new l, i.nG2.initiateGallery2(i.e, i.options)
            }, i.test = function () {}, i.init()
        }, jQuery.nanogallery2.defaultOptions = {
            kind: "",
            userID: "",
            photoset: "",
            album: "",
            blockList: "scrapbook|profil|auto backup",
            tagBlockList: "",
            allowList: "",
            albumList: "",
            albumList2: null,
            RTL: !1,
            flickrSkipOriginal: !0,
            flickrAPIKey: "",
            breadcrumbAutoHideTopLevel: !0,
            displayBreadcrumb: !0,
            breadcrumbOnlyCurrentLevel: !0,
            breadcrumbHideIcons: !0,
            theme: "nGY2",
            galleryTheme: "dark",
            viewerTheme: "dark",
            items: null,
            itemsBaseURL: "",
            thumbnailSelectable: !1,
            dataProvider: "",
            allowHTMLinData: !1,
            locationHash: !0,
            slideshowDelay: 3e3,
            slideshowAutoStart: !1,
            debugMode: !1,
            titleTranslationMap: null,
            galleryDisplayMoreStep: 2,
            galleryDisplayMode: "fullContent",
            galleryL1DisplayMode: null,
            galleryPaginationMode: "rectangles",
            galleryPaginationTopButtons: !0,
            galleryMaxRows: 2,
            galleryL1MaxRows: null,
            galleryLastRowFull: !1,
            galleryL1LastRowFull: null,
            galleryLayoutEngine: "default",
            paginationSwipe: !0,
            paginationVisiblePages: 10,
            galleryFilterTags: !1,
            galleryL1FilterTags: null,
            galleryFilterTagsMode: "single",
            galleryL1FilterTagsMode: null,
            galleryMaxItems: 0,
            galleryL1MaxItems: null,
            gallerySorting: "",
            galleryL1Sorting: null,
            galleryDisplayTransition: "none",
            galleryL1DisplayTransition: null,
            galleryDisplayTransitionDuration: 1e3,
            galleryL1DisplayTransitionDuration: null,
            galleryResizeAnimation: !1,
            galleryRenderDelay: 10,
            thumbnailCrop: !0,
            thumbnailL1Crop: null,
            thumbnailCropScaleFactor: 1.5,
            thumbnailLevelUp: !1,
            thumbnailAlignment: "fillWidth",
            thumbnailWidth: 300,
            thumbnailL1Width: null,
            thumbnailHeight: 200,
            thumbnailL1Height: null,
            thumbnailBaseGridHeight: 0,
            thumbnailL1BaseGridHeight: null,
            thumbnailGutterWidth: 2,
            thumbnailL1GutterWidth: null,
            thumbnailGutterHeight: 2,
            thumbnailL1GutterHeight: null,
            thumbnailBorderVertical: 2,
            thumbnailL1BorderVertical: null,
            thumbnailBorderHorizontal: 2,
            thumbnailL1BorderHorizontal: null,
            thumbnailFeaturedKeyword: "*featured",
            thumbnailAlbumDisplayImage: !1,
            thumbnailHoverEffect2: "toolsAppear",
            thumbnailBuildInit2: "",
            thumbnailStacks: 0,
            thumbnailL1Stacks: null,
            thumbnailStacksTranslateX: 0,
            thumbnailL1StacksTranslateX: null,
            thumbnailStacksTranslateY: 0,
            thumbnailL1StacksTranslateY: null,
            thumbnailStacksTranslateZ: 0,
            thumbnailL1StacksTranslateZ: null,
            thumbnailStacksRotateX: 0,
            thumbnailL1StacksRotateX: null,
            thumbnailStacksRotateY: 0,
            thumbnailL1StacksRotateY: null,
            thumbnailStacksRotateZ: 0,
            thumbnailL1StacksRotateZ: null,
            thumbnailStacksScale: 0,
            thumbnailL1StacksScale: null,
            thumbnailDisplayOutsideScreen: !0,
            thumbnailWaitImageLoaded: !0,
            thumbnailSliderDelay: 2e3,
            galleryBuildInit2: "",
            portable: !1,
            eventsDebounceDelay: 10,
            touchAnimation: !1,
            touchAnimationL1: void 0,
            touchAutoOpenDelay: 0,
            thumbnailLabel: {
                position: "overImage",
                align: "center",
                valign: "bottom",
                display: !0,
                displayDescription: !1,
                titleMaxLength: 0,
                titleMultiLine: !1,
                descriptionMaxLength: 0,
                descriptionMultiLine: !1,
                hideIcons: !0,
                title: ""
            },
            thumbnailToolbarImage: {
                topLeft: "select",
                topRight: "featured"
            },
            thumbnailToolbarAlbum: {
                topLeft: "select",
                topRight: "counter"
            },
            thumbnailDisplayOrder: "",
            thumbnailL1DisplayOrder: null,
            thumbnailDisplayInterval: 15,
            thumbnailL1DisplayInterval: null,
            thumbnailDisplayTransition: "fadeIn",
            thumbnailL1DisplayTransition: null,
            thumbnailDisplayTransitionEasing: "easeOutQuart",
            thumbnailL1DisplayTransitionEasing: null,
            thumbnailDisplayTransitionDuration: 240,
            thumbnailL1DisplayTransitionDuration: null,
            thumbnailOpenInLightox: !0,
            thumbnailOpenOriginal: !1,
            lightboxStandalone: !1,
            viewer: "internal",
            viewerFullscreen: !1,
            imageTransition: "swipe2",
            viewerTransitionMediaKind: "img",
            viewerZoom: !0,
            viewerImageDisplay: "",
            openOnStart: "",
            viewerHideToolsDelay: 4e3,
            viewerToolbar: {
                display: !1,
                position: "bottom",
                fullWidth: !1,
                align: "center",
                autoMinimize: 0,
                standard: "minimizeButton,label",
                minimized: "minimizeButton,label,infoButton,shareButton,fullscreenButton"
            },
            viewerTools: {
                topLeft: "pageCounter,playPauseButton",
                topRight: "rotateLeft,rotateRight,fullscreenButton,closeButton"
            },
            viewerGallery: "bottomOverMedia",
            viewerGalleryTWidth: 40,
            viewerGalleryTHeight: 40,
            breakpointSizeSM: 480,
            breakpointSizeME: 992,
            breakpointSizeLA: 1200,
            breakpointSizeXL: 1800,
            fnThumbnailInit: null,
            fnThumbnailHoverInit: null,
            fnThumbnailHover: null,
            fnThumbnailHoverOut: null,
            fnThumbnailDisplayEffect: null,
            fnViewerInfo: null,
            fnImgToolbarCustInit: null,
            fnImgToolbarCustDisplay: null,
            fnImgToolbarCustClick: null,
            fnProcessData: null,
            fnThumbnailSelection: null,
            fnGalleryRenderStart: null,
            fnGalleryRenderEnd: null,
            fnGalleryObjectModelBuilt: null,
            fnGalleryLayoutApplied: null,
            fnThumbnailClicked: null,
            fnShoppingCartUpdated: null,
            fnThumbnailToolCustAction: null,
            fnThumbnailOpen: null,
            fnImgDisplayed: null,
            fnPopupMediaInfo: null,
            i18n: {
                breadcrumbHome: "Galleries",
                breadcrumbHome_FR: "Galeries",
                thumbnailImageTitle: "",
                thumbnailAlbumTitle: "",
                thumbnailImageDescription: "",
                thumbnailAlbumDescription: "",
                infoBoxPhoto: "Photo",
                infoBoxDate: "Date",
                infoBoxAlbum: "Album",
                infoBoxDimensions: "Dimensions",
                infoBoxFilename: "Filename",
                infoBoxFileSize: "File size",
                infoBoxCamera: "Camera",
                infoBoxFocalLength: "Focal length",
                infoBoxExposure: "Exposure",
                infoBoxFNumber: "F Number",
                infoBoxISO: "ISO",
                infoBoxMake: "Make",
                infoBoxFlash: "Flash",
                infoBoxViews: "Views",
                infoBoxComments: "Comments"
            },
            icons: {
                thumbnailAlbum: '<i class="nGY2Icon-folder-empty"></i>',
                thumbnailImage: '<i class="nGY2Icon-picture"></i>',
                breadcrumbAlbum: '<i class="nGY2Icon-folder-empty"></i>',
                breadcrumbHome: '<i class="nGY2Icon-home"></i>',
                breadcrumbSeparator: '<i class="nGY2Icon-left-open"></i>',
                breadcrumbSeparatorRtl: '<i class="nGY2Icon-right-open"></i>',
                navigationFilterSelected: '<i style="color:#fff;" class="nGY2Icon-ok"></i>',
                navigationFilterUnselected: '<i style="color:#ddd;opacity:0.3;" class="nGY2Icon-circle-empty"></i>',
                navigationFilterSelectedAll: '<i class="nGY2Icon-ccw"></i>',
                navigationPaginationPrevious: '<i class="nGY2Icon-ngy2_chevron-left"></i>',
                navigationPaginationNext: '<i class="nGY2Icon-ngy2_chevron-right"></i>',
                thumbnailSelected: '<i style="color:#bff;" class="nGY2Icon-ok-circled"></i>',
                thumbnailUnselected: '<i style="color:#bff;" class="nGY2Icon-circle-empty"></i>',
                thumbnailFeatured: '<i style="color:#dd5;" class="nGY2Icon-star"></i>',
                thumbnailCounter: '<i class="nGY2Icon-picture"></i>',
                thumbnailShare: '<i class="nGY2Icon-ngy2_share2"></i>',
                thumbnailDownload: '<i class="nGY2Icon-ngy2_download2"></i>',
                thumbnailInfo: '<i class="nGY2Icon-ngy2_info2"></i>',
                thumbnailShoppingcart: '<i class="nGY2Icon-basket"></i>',
                thumbnailDisplay: '<i class="nGY2Icon-resize-full"></i>',
                thumbnailCustomTool1: "T1",
                thumbnailCustomTool2: "T2",
                thumbnailCustomTool3: "T3",
                thumbnailCustomTool4: "T4",
                thumbnailCustomTool5: "T5",
                thumbnailCustomTool6: "T6",
                thumbnailCustomTool7: "T7",
                thumbnailCustomTool8: "T8",
                thumbnailCustomTool9: "T9",
                thumbnailCustomTool10: "T10",
                thumbnailAlbumUp: '<i style="font-size: 3em;" class="nGY2Icon-ngy2_chevron_up2"></i>',
                paginationNext: '<i class="nGY2Icon-right-open"></i>',
                paginationPrevious: '<i class="nGY2Icon-left-open"></i>',
                galleryMoreButton: '<i class="nGY2Icon-picture"></i> &nbsp; <i class="nGY2Icon-right-open"></i>',
                buttonClose: '<i class="nGY2Icon-ngy2_close2"></i>',
                viewerPrevious: '<i class="nGY2Icon-ngy2_chevron-left"></i>',
                viewerNext: '<i class="nGY2Icon-ngy2_chevron-right"></i>',
                viewerImgPrevious: '<i class="nGY2Icon-ngy2_chevron_left3"></i>',
                viewerImgNext: '<i class="nGY2Icon-ngy2_chevron_right3"></i>',
                viewerDownload: '<i class="nGY2Icon-ngy2_download2"></i>',
                viewerToolbarMin: '<i class="nGY2Icon-ellipsis-vert"></i>',
                viewerToolbarStd: '<i class="nGY2Icon-menu"></i>',
                viewerPlay: '<i class="nGY2Icon-play"></i>',
                viewerPause: '<i class="nGY2Icon-pause"></i>',
                viewerFullscreenOn: '<i class="nGY2Icon-resize-full"></i>',
                viewerFullscreenOff: '<i class="nGY2Icon-resize-small"></i>',
                viewerZoomIn: '<i class="nGY2Icon-ngy2_zoom_in2"></i>',
                viewerZoomOut: '<i class="nGY2Icon-ngy2_zoom_out2"></i>',
                viewerLinkOriginal: '<i class="nGY2Icon-ngy2_external2"></i>',
                viewerInfo: '<i class="nGY2Icon-ngy2_info2"></i>',
                viewerShare: '<i class="nGY2Icon-ngy2_share2"></i>',
                viewerRotateLeft: '<i class="nGY2Icon-ccw"></i>',
                viewerRotateRight: '<i class="nGY2Icon-cw"></i>',
                viewerShoppingcart: '<i class="nGY2Icon-basket"></i>',
                user: '<i class="nGY2Icon-user"></i>',
                location: '<i class="nGY2Icon-location"></i>',
                picture: '<i class="nGY2Icon-picture"></i>',
                config: '<i class="nGY2Icon-wrench"></i>',
                shareFacebook: '<i style="color:#3b5998;" class="nGY2Icon-facebook-squared"></i>',
                shareTwitter: '<i style="color:#00aced;" class="nGY2Icon-twitter-squared"></i>',
                shareTumblr: '<i style="color:#32506d;" class="nGY2Icon-tumblr-squared"></i>',
                sharePinterest: '<i style="color:#cb2027;" class="nGY2Icon-pinterest-squared"></i>',
                shareVK: '<i style="color:#3b5998;" class="nGY2Icon-vkontakte"></i>',
                shareMail: '<i style="color:#555;" class="nGY2Icon-mail-alt"></i>',
                viewerCustomTool1: "T1",
                viewerCustomTool2: "T2",
                viewerCustomTool3: "T3",
                viewerCustomTool4: "T4",
                viewerCustomTool5: "T5",
                viewerCustomTool6: "T6",
                viewerCustomTool7: "T7",
                viewerCustomTool8: "T8",
                viewerCustomTool9: "T9",
                viewerCustomTool10: "T10"
            }
        }, jQuery.fn.nanogallery2 = function (t, n, i) {
            if (void 0 === jQuery(this).data("nanogallery2data")) {
                if ("destroy" == t) return;
                return this.each((function () {
                    new jQuery.nanogallery2(this, t)
                }))
            }
            var a = e(this).data("nanogallery2data").nG2;
            if (void 0 === t || !0 !== t.lightboxStandalone) {
                switch (t) {
                    case "displayItem":
                        a.DisplayItem(n);
                        break;
                    case "search":
                        return a.Search(n);
                    case "search2":
                        return a.Search2(n, i);
                    case "search2Execute":
                        return a.Search2Execute();
                    case "refresh":
                        a.Refresh();
                        break;
                    case "resize":
                        a.Resize();
                        break;
                    case "instance":
                        return a;
                    case "data":
                        return a.data = {
                            items: a.I,
                            gallery: a.GOM,
                            lightbox: a.VOM,
                            shoppingcart: a.shoppingCart
                        }, a.data;
                    case "reload":
                        return a.ReloadAlbum(), e(this);
                    case "itemsSelectedGet":
                        return a.ItemsSelectedGet();
                    case "itemsSetSelectedValue":
                        a.ItemsSetSelectedValue(n, i);
                        break;
                    case "option":
                        if (void 0 === i) return a.Get(n);
                        a.Set(n, i), "demoViewportWidth" == n && e(window).trigger("resize");
                        break;
                    case "destroy":
                        a.Destroy(), e(this).removeData("nanogallery2data");
                        break;
                    case "shoppingCartGet":
                        return a.shoppingCart;
                    case "shoppingCartUpdate":
                        if (void 0 === i || void 0 === n) return !1;
                        for (var o = n, r = i, l = 0; l < a.shoppingCart.length; l++)
                            if (a.shoppingCart[l].ID == o) {
                                a.shoppingCart[l].qty = r;
                                let e = a.I[a.shoppingCart[l].idx];
                                a.ThumbnailToolbarOneCartUpdate(e), 0 == r && a.shoppingCart.splice(l, 1), null !== (u = a.O.fnShoppingCartUpdated) && ("function" == typeof u ? u(a.shoppingCart, e, "api") : window[u](a.shoppingCart, e, "api"));
                                break
                            } return a.shoppingCart;
                    case "shoppingCartRemove":
                        if (void 0 === n) return !1;
                        var s = n;
                        for (l = 0; l < a.shoppingCart.length; l++)
                            if (a.shoppingCart[l].ID == s) {
                                var u, c = a.I[a.shoppingCart[l].idx];
                                a.shoppingCart[l].qty = 0, a.ThumbnailToolbarOneCartUpdate(c), a.shoppingCart.splice(l, 1), null !== (u = a.O.fnShoppingCartUpdated) && ("function" == typeof u ? u(a.shoppingCart, c, "api") : window[u](a.shoppingCart, c, "api"));
                                break
                            } return a.shoppingCart;
                    case "closeViewer":
                        a.CloseViewer();
                        break;
                    case "minimizeToolbar":
                        a.MinimizeToolbar();
                        break;
                    case "maximizeToolbar":
                        a.MaximizeToolbar();
                        break;
                    case "paginationPreviousPage":
                        a.PaginationPreviousPage();
                        break;
                    case "paginationNextPage":
                        a.paginationNextPage();
                        break;
                    case "paginationGotoPage":
                        a.PaginationGotoPage(n);
                        break;
                    case "paginationCountPages":
                        a.PaginationCountPages()
                }
                return e(this)
            }
            a.LightboxReOpen()
        },
        function (e, t) {
            e.ngEvEmitter = function () {
                function e() {}
                var t = e.prototype;
                return t.on = function (e, t) {
                    if (e && t) {
                        var n = this._events = this._events || {},
                            i = n[e] = n[e] || [];
                        return -1 == i.indexOf(t) && i.push(t), this
                    }
                }, t.once = function (e, t) {
                    if (e && t) {
                        this.on(e, t);
                        var n = this._onceEvents = this._onceEvents || {};
                        return (n[e] = n[e] || {})[t] = !0, this
                    }
                }, t.off = function (e, t) {
                    var n = this._events && this._events[e];
                    if (n && n.length) {
                        var i = n.indexOf(t);
                        return -1 != i && n.splice(i, 1), this
                    }
                }, t.emitEvent = function (e, t) {
                    var n = this._events && this._events[e];
                    if (n && n.length) {
                        var i = 0,
                            a = n[i];
                        t = t || [];
                        for (var o = this._onceEvents && this._onceEvents[e]; a;) {
                            var r = o && o[a];
                            r && (this.off(e, a), delete o[a]), a.apply(this, t), a = n[i += r ? 0 : 1]
                        }
                        return this
                    }
                }, e
            }()
        }("undefined" != typeof window ? window : this),
        /*!
         * ngimagesLoaded v4.1.1
         * JavaScript is all like "You images are done yet or what?"
         * MIT License
         */
        function (e, t) {
            e.ngimagesLoaded = function (e, t) {
                var n = jQuery,
                    i = e.console;

                function a(e, t) {
                    for (var n in t) e[n] = t[n];
                    return e
                }

                function o(e, t, i) {
                    if (!(this instanceof o)) return new o(e, t, i);
                    "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = function (e) {
                        var t = [];
                        if (Array.isArray(e)) t = e;
                        else if ("number" == typeof e.length)
                            for (var n = 0; n < e.length; n++) t.push(e[n]);
                        else t.push(e);
                        return t
                    }(e), this.options = a({}, this.options), "function" == typeof t ? i = t : a(this.options, t), i && this.on("always", i), this.getImages(), n && (this.jqDeferred = new n.Deferred), setTimeout(function () {
                        this.check()
                    }.bind(this))
                }
                o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
                    this.images = [], this.elements.forEach(this.addElementImages, this)
                }, o.prototype.addElementImages = function (e) {
                    "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
                    var t = e.nodeType;
                    if (t && r[t]) {
                        for (var n = e.querySelectorAll("img"), i = 0; i < n.length; i++) {
                            var a = n[i];
                            this.addImage(a)
                        }
                        if ("string" == typeof this.options.background) {
                            var o = e.querySelectorAll(this.options.background);
                            for (i = 0; i < o.length; i++) {
                                var l = o[i];
                                this.addElementBackgroundImages(l)
                            }
                        }
                    }
                };
                var r = {
                    1: !0,
                    9: !0,
                    11: !0
                };

                function l(e) {
                    this.img = e
                }

                function s(e, t) {
                    this.url = e, this.element = t, this.img = new Image
                }
                return o.prototype.addElementBackgroundImages = function (e) {
                    var t = getComputedStyle(e);
                    if (t)
                        for (var n = /url\((['"])?(.*?)\1\)/gi, i = n.exec(t.backgroundImage); null !== i;) {
                            var a = i && i[2];
                            a && this.addBackground(a, e), i = n.exec(t.backgroundImage)
                        }
                }, o.prototype.addImage = function (e) {
                    var t = new l(e);
                    this.images.push(t)
                }, o.prototype.addBackground = function (e, t) {
                    var n = new s(e, t);
                    this.images.push(n)
                }, o.prototype.check = function () {
                    var e = this;

                    function t(t, n, i) {
                        setTimeout((function () {
                            e.progress(t, n, i)
                        }))
                    }
                    this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach((function (e) {
                        e.once("progress", t), e.check()
                    })) : this.complete()
                }, o.prototype.progress = function (e, t, n) {
                    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && i && i.log("progress: " + n, e, t)
                }, o.prototype.complete = function () {
                    var e = this.hasAnyBroken ? "fail" : "done";
                    if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                        var t = this.hasAnyBroken ? "reject" : "resolve";
                        this.jqDeferred[t](this)
                    }
                }, l.prototype = Object.create(t.prototype), l.prototype.check = function () {
                    this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src)
                }, l.prototype.getIsImageComplete = function () {
                    return this.img.complete && void 0 !== this.img.naturalWidth
                }, l.prototype.confirm = function (e, t) {
                    this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
                }, l.prototype.handleEvent = function (e) {
                    var t = "on" + e.type;
                    this[t] && this[t](e)
                }, l.prototype.onload = function () {
                    this.confirm(!0, "onload"), this.unbindEvents()
                }, l.prototype.onerror = function () {
                    this.confirm(!1, "onerror"), this.unbindEvents()
                }, l.prototype.unbindEvents = function () {
                    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
                }, s.prototype = Object.create(l.prototype), s.prototype.check = function () {
                    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
                }, s.prototype.unbindEvents = function () {
                    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
                }, s.prototype.confirm = function (e, t) {
                    this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
                }, o.makeJQueryPlugin = function (t) {
                    (t = t || e.jQuery) && ((n = t).fn.ngimagesLoaded = function (e, t) {
                        return new o(this, e, t).jqDeferred.promise(n(this))
                    })
                }, o.makeJQueryPlugin(), o
            }(e, e.ngEvEmitter)
        }(window),
        function () {
            var e = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
                t = "undefined" != typeof module && module.exports,
                n = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
                i = function () {
                    for (var t, n = [
                            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                        ], i = 0, a = n.length, o = {}; i < a; i++)
                        if ((t = n[i]) && t[1] in e) {
                            for (i = 0; i < t.length; i++) o[n[0][i]] = t[i];
                            return o
                        } return !1
                }(),
                a = {
                    change: i.fullscreenchange,
                    error: i.fullscreenerror
                },
                o = {
                    request: function (t) {
                        return new Promise(function (a) {
                            var o = i.requestFullscreen,
                                r = function () {
                                    this.off("change", r), a()
                                }.bind(this);
                            t = t || e.documentElement, / Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent) ? t[o]() : t[o](n ? Element.ALLOW_KEYBOARD_INPUT : {}), this.on("change", r)
                        }.bind(this))
                    },
                    exit: function () {
                        return new Promise(function (t) {
                            if (this.isFullscreen) {
                                var n = function () {
                                    this.off("change", n), t()
                                }.bind(this);
                                e[i.exitFullscreen](), this.on("change", n)
                            } else t()
                        }.bind(this))
                    },
                    toggle: function (e) {
                        return this.isFullscreen ? this.exit() : this.request(e)
                    },
                    onchange: function (e) {
                        this.on("change", e)
                    },
                    onerror: function (e) {
                        this.on("error", e)
                    },
                    on: function (t, n) {
                        var i = a[t];
                        i && e.addEventListener(i, n, !1)
                    },
                    off: function (t, n) {
                        var i = a[t];
                        i && e.removeEventListener(i, n, !1)
                    },
                    raw: i
                };
            i ? (Object.defineProperties(o, {
                isFullscreen: {
                    get: function () {
                        return Boolean(e[i.fullscreenElement])
                    }
                },
                element: {
                    enumerable: !0,
                    get: function () {
                        return e[i.fullscreenElement]
                    }
                },
                enabled: {
                    enumerable: !0,
                    get: function () {
                        return Boolean(e[i.fullscreenEnabled])
                    }
                }
            }), t ? module.exports = o : window.ngscreenfull = o) : t ? module.exports = !1 : window.ngscreenfull = !1
        }(),
        function () {
            const e = "undefined" != typeof window ? window : global;
            var t, n = function () {
                var t, n, i, a, o, r, l = Date.now ? Date.now : function () {
                        return +new Date
                    },
                    s = "undefined" != typeof SHIFTY_DEBUG_NOW ? SHIFTY_DEBUG_NOW : l;

                function u() {}

                function c(e, t) {
                    var n;
                    for (n in e) Object.hasOwnProperty.call(e, n) && t(n)
                }

                function h(e, t) {
                    return c(t, (function (n) {
                        e[n] = t[n]
                    })), e
                }

                function d(e, t) {
                    c(t, (function (n) {
                        void 0 === e[n] && (e[n] = t[n])
                    }))
                }

                function m(e, n, i, a, o, r, l) {
                    var s, u, c, h = e < r ? 0 : (e - r) / o;
                    for (s in n) n.hasOwnProperty(s) && (c = "function" == typeof (u = l[s]) ? u : t[u], n[s] = p(i[s], a[s], c, h));
                    return n
                }

                function p(e, t, n, i) {
                    return e + (t - e) * n(i)
                }

                function g(e, t) {
                    var n = v.prototype.filter,
                        i = e._filterArgs;
                    c(n, (function (a) {
                        void 0 !== n[a][t] && n[a][t].apply(e, i)
                    }))
                }

                function f(e, t, n, l, u, c, h, d, p, f, b) {
                    i = t + n + l, a = Math.min(b || s(), i), o = a >= i, r = l - (i - a), e.isPlaying() && (o ? (p(h, e._attachment, r), e.stop(!0)) : (e._scheduleId = f(e._timeoutHandler, 1e3 / 60), g(e, "beforeTween"), a < t + n ? m(1, u, c, h, 1, 1, d) : m(a, u, c, h, l, t + n, d), g(e, "afterTween"), p(u, e._attachment, r)))
                }

                function b(e, t) {
                    var n = {},
                        i = typeof t;
                    return c(e, "string" === i || "function" === i ? function (e) {
                        n[e] = t
                    } : function (e) {
                        n[e] || (n[e] = t[e] || "linear")
                    }), n
                }

                function v(e, t) {
                    this._currentState = e || {}, this._configured = !1, this._scheduleFunction = n, void 0 !== t && this.setConfig(t)
                }
                return n = "undefined" != typeof window && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame) || setTimeout, v.prototype.tween = function (e) {
                    return this._isTweening ? this : (void 0 === e && this._configured || this.setConfig(e), this._timestamp = s(), this._start(this.get(), this._attachment), this.resume())
                }, v.prototype.setConfig = function (e) {
                    e = e || {}, this._configured = !0, this._attachment = e.attachment, this._pausedAtTime = null, this._scheduleId = null, this._delay = e.delay || 0, this._start = e.start || u, this._step = e.step || u, this._finish = e.finish || u, this._duration = e.duration || 500, this._currentState = h({}, e.from || this.get()), this._originalState = this.get(), this._targetState = h({}, e.to || this.get());
                    var t = this;
                    this._timeoutHandler = function () {
                        f(t, t._timestamp, t._delay, t._duration, t._currentState, t._originalState, t._targetState, t._easing, t._step, t._scheduleFunction)
                    };
                    var n = this._currentState,
                        i = this._targetState;
                    return d(i, n), this._easing = b(n, e.easing || "linear"), this._filterArgs = [n, this._originalState, i, this._easing], g(this, "tweenCreated"), this
                }, v.prototype.get = function () {
                    return h({}, this._currentState)
                }, v.prototype.set = function (e) {
                    this._currentState = e
                }, v.prototype.pause = function () {
                    return this._pausedAtTime = s(), this._isPaused = !0, this
                }, v.prototype.resume = function () {
                    return this._isPaused && (this._timestamp += s() - this._pausedAtTime), this._isPaused = !1, this._isTweening = !0, this._timeoutHandler(), this
                }, v.prototype.seek = function (e) {
                    e = Math.max(e, 0);
                    var t = s();
                    return this._timestamp + e === 0 || (this._timestamp = t - e, this.isPlaying() || (this._isTweening = !0, this._isPaused = !1, f(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, t), this.pause())), this
                }, v.prototype.stop = function (t) {
                    return this._isTweening = !1, this._isPaused = !1, this._timeoutHandler = u, (e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.oCancelAnimationFrame || e.msCancelAnimationFrame || e.mozCancelRequestAnimationFrame || e.clearTimeout)(this._scheduleId), t && (g(this, "beforeTween"), m(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing), g(this, "afterTween"), g(this, "afterTweenEnd"), this._finish.call(this, this._currentState, this._attachment)), this
                }, v.prototype.isPlaying = function () {
                    return this._isTweening && !this._isPaused
                }, v.prototype.setScheduleFunction = function (e) {
                    this._scheduleFunction = e
                }, v.prototype.dispose = function () {
                    var e;
                    for (e in this) this.hasOwnProperty(e) && delete this[e]
                }, v.prototype.filter = {}, v.prototype.formula = {
                    linear: function (e) {
                        return e
                    }
                }, t = v.prototype.formula, h(v, {
                    now: s,
                    each: c,
                    tweenProps: m,
                    tweenProp: p,
                    applyFilter: g,
                    shallowCopy: h,
                    defaults: d,
                    composeEasingObject: b
                }), "function" == typeof SHIFTY_DEBUG_NOW && (e.timeoutHandler = f), "object" == typeof exports ? module.exports = v : "function" == typeof define && define.amdDISABLED ? define((function () {
                    return v
                })) : void 0 === e.NGTweenable && (e.NGTweenable = v), v
            }();
            /*!
             * All equations are adapted from Thomas Fuchs'
             * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
             *
             * Based on Easing Equations (c) 2003 [Robert
             * Penner](http://www.robertpenner.com/), all rights reserved. This work is
             * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
             */
            /*!
             *  TERMS OF USE - EASING EQUATIONS
             *  Open source under the BSD License.
             *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
             */
            n.shallowCopy(n.prototype.formula, {
                    easeInQuad: function (e) {
                        return Math.pow(e, 2)
                    },
                    easeOutQuad: function (e) {
                        return -(Math.pow(e - 1, 2) - 1)
                    },
                    easeInOutQuad: function (e) {
                        return (e /= .5) < 1 ? .5 * Math.pow(e, 2) : -.5 * ((e -= 2) * e - 2)
                    },
                    easeInCubic: function (e) {
                        return Math.pow(e, 3)
                    },
                    easeOutCubic: function (e) {
                        return Math.pow(e - 1, 3) + 1
                    },
                    easeInOutCubic: function (e) {
                        return (e /= .5) < 1 ? .5 * Math.pow(e, 3) : .5 * (Math.pow(e - 2, 3) + 2)
                    },
                    easeInQuart: function (e) {
                        return Math.pow(e, 4)
                    },
                    easeOutQuart: function (e) {
                        return -(Math.pow(e - 1, 4) - 1)
                    },
                    easeInOutQuart: function (e) {
                        return (e /= .5) < 1 ? .5 * Math.pow(e, 4) : -.5 * ((e -= 2) * Math.pow(e, 3) - 2)
                    },
                    easeInQuint: function (e) {
                        return Math.pow(e, 5)
                    },
                    easeOutQuint: function (e) {
                        return Math.pow(e - 1, 5) + 1
                    },
                    easeInOutQuint: function (e) {
                        return (e /= .5) < 1 ? .5 * Math.pow(e, 5) : .5 * (Math.pow(e - 2, 5) + 2)
                    },
                    easeInSine: function (e) {
                        return 1 - Math.cos(e * (Math.PI / 2))
                    },
                    easeOutSine: function (e) {
                        return Math.sin(e * (Math.PI / 2))
                    },
                    easeInOutSine: function (e) {
                        return -.5 * (Math.cos(Math.PI * e) - 1)
                    },
                    easeInExpo: function (e) {
                        return 0 === e ? 0 : Math.pow(2, 10 * (e - 1))
                    },
                    easeOutExpo: function (e) {
                        return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
                    },
                    easeInOutExpo: function (e) {
                        return 0 === e ? 0 : 1 === e ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * --e))
                    },
                    easeInCirc: function (e) {
                        return -(Math.sqrt(1 - e * e) - 1)
                    },
                    easeOutCirc: function (e) {
                        return Math.sqrt(1 - Math.pow(e - 1, 2))
                    },
                    easeInOutCirc: function (e) {
                        return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                    },
                    easeOutBounce: function (e) {
                        return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                    },
                    easeInBack: function (e) {
                        var t = 1.70158;
                        return e * e * ((t + 1) * e - t)
                    },
                    easeOutBack: function (e) {
                        var t = 1.70158;
                        return (e -= 1) * e * ((t + 1) * e + t) + 1
                    },
                    easeInOutBack: function (e) {
                        var t = 1.70158;
                        return (e /= .5) < 1 ? e * e * ((1 + (t *= 1.525)) * e - t) * .5 : .5 * ((e -= 2) * e * ((1 + (t *= 1.525)) * e + t) + 2)
                    },
                    elastic: function (e) {
                        return -1 * Math.pow(4, -8 * e) * Math.sin((6 * e - 1) * (2 * Math.PI) / 2) + 1
                    },
                    swingFromTo: function (e) {
                        var t = 1.70158;
                        return (e /= .5) < 1 ? e * e * ((1 + (t *= 1.525)) * e - t) * .5 : .5 * ((e -= 2) * e * ((1 + (t *= 1.525)) * e + t) + 2)
                    },
                    swingFrom: function (e) {
                        var t = 1.70158;
                        return e * e * ((t + 1) * e - t)
                    },
                    swingTo: function (e) {
                        var t = 1.70158;
                        return (e -= 1) * e * ((t + 1) * e + t) + 1
                    },
                    bounce: function (e) {
                        return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                    },
                    bouncePast: function (e) {
                        return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : e < 2.5 / 2.75 ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
                    },
                    easeFromTo: function (e) {
                        return (e /= .5) < 1 ? .5 * Math.pow(e, 4) : -.5 * ((e -= 2) * Math.pow(e, 3) - 2)
                    },
                    easeFrom: function (e) {
                        return Math.pow(e, 4)
                    },
                    easeTo: function (e) {
                        return Math.pow(e, .25)
                    }
                }),
                function () {
                    function e(e, t, n, i, a, o) {
                        var r, l, s = 0,
                            u = 0,
                            c = 0,
                            h = 0,
                            d = 0,
                            m = 0;

                        function p(e) {
                            return ((s * e + u) * e + c) * e
                        }

                        function g(e) {
                            return (3 * s * e + 2 * u) * e + c
                        }

                        function f(e) {
                            return e >= 0 ? e : 0 - e
                        }
                        return s = 1 - (c = 3 * t) - (u = 3 * (i - t) - c), h = 1 - (m = 3 * n) - (d = 3 * (a - n) - m), r = e, l = function (e) {
                                return 1 / (200 * e)
                            }(o),
                            function (e) {
                                return ((h * e + d) * e + m) * e
                            }(function (e, t) {
                                var n, i, a, o, r, l;
                                for (a = e, l = 0; l < 8; l++) {
                                    if (f(o = p(a) - e) < t) return a;
                                    if (f(r = g(a)) < 1e-6) break;
                                    a -= o / r
                                }
                                if (i = 1, (a = e) < (n = 0)) return n;
                                if (a > i) return i;
                                for (; n < i;) {
                                    if (f((o = p(a)) - e) < t) return a;
                                    e > o ? n = a : i = a, a = .5 * (i - n) + n
                                }
                                return a
                            }(r, l))
                    }
                    n.setBezierFunction = function (t, i, a, o, r) {
                        var l = function (t, n, i, a) {
                            return function (o) {
                                return e(o, t, n, i, a, 1)
                            }
                        }(i, a, o, r);
                        return l.displayName = t, l.x1 = i, l.y1 = a, l.x2 = o, l.y2 = r, n.prototype.formula[t] = l
                    }, n.unsetBezierFunction = function (e) {
                        delete n.prototype.formula[e]
                    }
                }(), (t = new n)._filterArgs = [], n.interpolate = function (e, i, a, o, r) {
                    var l = n.shallowCopy({}, e),
                        s = r || 0,
                        u = n.composeEasingObject(e, o || "linear");
                    t.set({});
                    var c = t._filterArgs;
                    c.length = 0, c[0] = l, c[1] = e, c[2] = i, c[3] = u, n.applyFilter(t, "tweenCreated"), n.applyFilter(t, "beforeTween");
                    var h = function (e, t, i, a, o, r) {
                        return n.tweenProps(a, t, e, i, 1, r, o)
                    }(e, l, i, a, u, s);
                    return n.applyFilter(t, "afterTween"), h
                },
                function (e) {
                    var t = /(\d|\-|\.)/,
                        n = /([^\-0-9\.]+)/g,
                        i = /[0-9.\-]+/g,
                        a = new RegExp("rgb\\(" + i.source + /,\s*/.source + i.source + /,\s*/.source + i.source + "\\)", "g"),
                        o = /^.*\(/,
                        r = /#([0-9]|[a-f]){3,6}/gi;

                    function l(e, t) {
                        var n, i = [],
                            a = e.length;
                        for (n = 0; n < a; n++) i.push("_" + t + "_" + n);
                        return i
                    }

                    function s(t) {
                        e.each(t, (function (e) {
                            var n = t[e];
                            "string" == typeof n && n.match(r) && (t[e] = d(r, n, u))
                        }))
                    }

                    function u(e) {
                        var t = function (e) {
                            3 === (e = e.replace(/#/, "")).length && (e = (e = e.split(""))[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
                            return c[0] = h(e.substr(0, 2)), c[1] = h(e.substr(2, 2)), c[2] = h(e.substr(4, 2)), c
                        }(e);
                        return "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"
                    }
                    var c = [];

                    function h(e) {
                        return parseInt(e, 16)
                    }

                    function d(e, t, n) {
                        var i = t.match(e),
                            a = t.replace(e, "VAL");
                        if (i)
                            for (var o, r = i.length, l = 0; l < r; l++) o = i.shift(), a = a.replace("VAL", n(o));
                        return a
                    }

                    function m(e) {
                        for (var t = e.match(i), n = t.length, a = e.match(o)[0], r = 0; r < n; r++) a += parseInt(t[r], 10) + ",";
                        return a = a.slice(0, -1) + ")"
                    }

                    function p(t, n) {
                        e.each(n, (function (e) {
                            for (var i = b(t[e]), a = i.length, o = 0; o < a; o++) t[n[e].chunkNames[o]] = +i[o];
                            delete t[e]
                        }))
                    }

                    function g(t, n) {
                        e.each(n, (function (e) {
                            var i = t[e],
                                o = function (e, t) {
                                    f.length = 0;
                                    for (var n = t.length, i = 0; i < n; i++) f.push(e[t[i]]);
                                    return f
                                }(function (e, t) {
                                    for (var n, i = {}, a = t.length, o = 0; o < a; o++) n = t[o], i[n] = e[n], delete e[n];
                                    return i
                                }(t, n[e].chunkNames), n[e].chunkNames);
                            i = function (e, t) {
                                for (var n = e, i = t.length, a = 0; a < i; a++) n = n.replace("VAL", +t[a].toFixed(4));
                                return n
                            }(n[e].formatString, o), t[e] = d(a, i, m)
                        }))
                    }
                    var f = [];

                    function b(e) {
                        return e.match(i)
                    }
                    e.prototype.filter.token = {
                        tweenCreated: function (i, a, o, r) {
                            var u, c;
                            s(i), s(a), s(o), this._tokenData = (u = i, c = {}, e.each(u, (function (e) {
                                var i, a, o = u[e];
                                if ("string" == typeof o) {
                                    var r = b(o);
                                    c[e] = {
                                        formatString: (i = o, a = i.match(n), a ? (1 === a.length || i.charAt(0).match(t)) && a.unshift("") : a = ["", ""], a.join("VAL")),
                                        chunkNames: l(r, e)
                                    }
                                }
                            })), c)
                        },
                        beforeTween: function (t, n, i, a) {
                            ! function (t, n) {
                                e.each(n, (function (e) {
                                    var i, a = n[e].chunkNames,
                                        o = a.length,
                                        r = t[e];
                                    if ("string" == typeof r) {
                                        var l = r.split(" "),
                                            s = l[l.length - 1];
                                        for (i = 0; i < o; i++) t[a[i]] = l[i] || s
                                    } else
                                        for (i = 0; i < o; i++) t[a[i]] = r;
                                    delete t[e]
                                }))
                            }(a, this._tokenData), p(t, this._tokenData), p(n, this._tokenData), p(i, this._tokenData)
                        },
                        afterTween: function (t, n, i, a) {
                            g(t, this._tokenData), g(n, this._tokenData), g(i, this._tokenData),
                                function (t, n) {
                                    e.each(n, (function (e) {
                                        var i = n[e].chunkNames,
                                            a = i.length,
                                            o = t[i[0]];
                                        if ("string" === typeof o) {
                                            for (var r = "", l = 0; l < a; l++) r += " " + t[i[l]], delete t[i[l]];
                                            t[e] = r.substr(1)
                                        } else t[e] = o
                                    }))
                                }(a, this._tokenData)
                        }
                    }
                }(n)
        }.call(null),
        /*! NGHammer.JS - v2.0.7 - 2016-04-22
         * http://hammerjs.github.io/
         *
         * Copyright (c) 2016 Jorik Tangelder;
         * Licensed under the MIT license */
        function (e, t, n, i) {
            var a, o = ["", "webkit", "Moz", "MS", "ms", "o"],
                r = t.createElement("div"),
                l = Math.round,
                s = Math.abs,
                u = Date.now;

            function c(e, t, n) {
                return setTimeout(b(e, n), t)
            }

            function h(e, t, n) {
                return !!Array.isArray(e) && (d(e, n[t], n), !0)
            }

            function d(e, t, n) {
                var i;
                if (e)
                    if (e.forEach) e.forEach(t, n);
                    else if (void 0 !== e.length)
                    for (i = 0; i < e.length;) t.call(n, e[i], i, e), i++;
                else
                    for (i in e) e.hasOwnProperty(i) && t.call(n, e[i], i, e)
            }

            function m(t, n, i) {
                var a = "DEPRECATED METHOD: " + n + "\n" + i + " AT \n";
                return function () {
                    var n = new Error("get-stack-trace"),
                        i = n && n.stack ? n.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                        o = e.console && (e.console.warn || e.console.log);
                    return o && o.call(e.console, a, i), t.apply(this, arguments)
                }
            }
            a = "function" != typeof Object.assign ? function (e) {
                if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                for (var t = Object(e), n = 1; n < arguments.length; n++) {
                    var i = arguments[n];
                    if (null != i)
                        for (var a in i) i.hasOwnProperty(a) && (t[a] = i[a])
                }
                return t
            } : Object.assign;
            var p = m((function (e, t, n) {
                    for (var i = Object.keys(t), a = 0; a < i.length;)(!n || n && void 0 === e[i[a]]) && (e[i[a]] = t[i[a]]), a++;
                    return e
                }), "extend", "Use `assign`."),
                g = m((function (e, t) {
                    return p(e, t, !0)
                }), "merge", "Use `assign`.");

            function f(e, t, n) {
                var i, o = t.prototype;
                (i = e.prototype = Object.create(o)).constructor = e, i._super = o, n && a(i, n)
            }

            function b(e, t) {
                return function () {
                    return e.apply(t, arguments)
                }
            }

            function v(e, t) {
                return "function" == typeof e ? e.apply(t && t[0] || void 0, t) : e
            }

            function O(e, t) {
                return void 0 === e ? t : e
            }

            function y(e, t, n) {
                d(I(t), (function (t) {
                    e.addEventListener(t, n, !1)
                }))
            }

            function G(e, t, n) {
                d(I(t), (function (t) {
                    e.removeEventListener(t, n, !1)
                }))
            }

            function M(e, t) {
                for (; e;) {
                    if (e == t) return !0;
                    e = e.parentNode
                }
                return !1
            }

            function w(e, t) {
                return e.indexOf(t) > -1
            }

            function I(e) {
                return e.trim().split(/\s+/g)
            }

            function T(e, t, n) {
                if (e.indexOf && !n) return e.indexOf(t);
                for (var i = 0; i < e.length;) {
                    if (n && e[i][n] == t || !n && e[i] === t) return i;
                    i++
                }
                return -1
            }

            function x(e) {
                return Array.prototype.slice.call(e, 0)
            }

            function S(e, t, n) {
                for (var i = [], a = [], o = 0; o < e.length;) {
                    var r = t ? e[o][t] : e[o];
                    T(a, r) < 0 && i.push(e[o]), a[o] = r, o++
                }
                return n && (i = t ? i.sort((function (e, n) {
                    return e[t] > n[t]
                })) : i.sort()), i
            }

            function L(e, t) {
                for (var n, i, a = t[0].toUpperCase() + t.slice(1), r = 0; r < o.length;) {
                    if ((i = (n = o[r]) ? n + a : t) in e) return i;
                    r++
                }
            }
            var C = 1;

            function E(t) {
                var n = t.ownerDocument || t;
                return n.defaultView || n.parentWindow || e
            }
            var k = "ontouchstart" in e,
                D = k && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
                N = ["x", "y"],
                V = ["clientX", "clientY"];

            function Y(e, t) {
                var n = this;
                this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function (t) {
                    v(e.options.enable, [e]) && n.handler(t)
                }, this.init()
            }

            function A(e, t, n) {
                var i = n.pointers.length,
                    a = n.changedPointers.length,
                    o = 1 & t && i - a == 0,
                    r = 12 & t && i - a == 0;
                n.isFirst = !!o, n.isFinal = !!r, o && (e.session = {}), n.eventType = t,
                    function (e, t) {
                        var n = e.session,
                            i = t.pointers,
                            a = i.length;
                        n.firstInput || (n.firstInput = _(t));
                        a > 1 && !n.firstMultiple ? n.firstMultiple = _(t) : 1 === a && (n.firstMultiple = !1);
                        var o = n.firstInput,
                            r = n.firstMultiple,
                            l = r ? r.center : o.center,
                            c = t.center = P(i);
                        t.timeStamp = u(), t.deltaTime = t.timeStamp - o.timeStamp, t.angle = z(l, c), t.distance = F(l, c),
                            function (e, t) {
                                var n = t.center,
                                    i = e.offsetDelta || {},
                                    a = e.prevDelta || {},
                                    o = e.prevInput || {};
                                1 !== t.eventType && 4 !== o.eventType || (a = e.prevDelta = {
                                    x: o.deltaX || 0,
                                    y: o.deltaY || 0
                                }, i = e.offsetDelta = {
                                    x: n.x,
                                    y: n.y
                                });
                                t.deltaX = a.x + (n.x - i.x), t.deltaY = a.y + (n.y - i.y)
                            }(n, t), t.offsetDirection = $(t.deltaX, t.deltaY);
                        var h = R(t.deltaTime, t.deltaX, t.deltaY);
                        t.overallVelocityX = h.x, t.overallVelocityY = h.y, t.overallVelocity = s(h.x) > s(h.y) ? h.x : h.y, t.scale = r ? (d = r.pointers, m = i, F(m[0], m[1], V) / F(d[0], d[1], V)) : 1, t.rotation = r ? function (e, t) {
                                return z(t[1], t[0], V) + z(e[1], e[0], V)
                            }(r.pointers, i) : 0, t.maxPointers = n.prevInput ? t.pointers.length > n.prevInput.maxPointers ? t.pointers.length : n.prevInput.maxPointers : t.pointers.length,
                            function (e, t) {
                                var n, i, a, o, r = e.lastInterval || t,
                                    l = t.timeStamp - r.timeStamp;
                                if (8 != t.eventType && (l > 25 || void 0 === r.velocity)) {
                                    var u = t.deltaX - r.deltaX,
                                        c = t.deltaY - r.deltaY,
                                        h = R(l, u, c);
                                    i = h.x, a = h.y, n = s(h.x) > s(h.y) ? h.x : h.y, o = $(u, c), e.lastInterval = t
                                } else n = r.velocity, i = r.velocityX, a = r.velocityY, o = r.direction;
                                t.velocity = n, t.velocityX = i, t.velocityY = a, t.direction = o
                            }(n, t);
                        var d, m;
                        var p = e.element;
                        M(t.srcEvent.target, p) && (p = t.srcEvent.target);
                        t.target = p
                    }(e, n), e.emit("hammer.input", n), e.recognize(n), e.session.prevInput = n
            }

            function _(e) {
                for (var t = [], n = 0; n < e.pointers.length;) t[n] = {
                    clientX: l(e.pointers[n].clientX),
                    clientY: l(e.pointers[n].clientY)
                }, n++;
                return {
                    timeStamp: u(),
                    pointers: t,
                    center: P(t),
                    deltaX: e.deltaX,
                    deltaY: e.deltaY
                }
            }

            function P(e) {
                var t = e.length;
                if (1 === t) return {
                    x: l(e[0].clientX),
                    y: l(e[0].clientY)
                };
                for (var n = 0, i = 0, a = 0; a < t;) n += e[a].clientX, i += e[a].clientY, a++;
                return {
                    x: l(n / t),
                    y: l(i / t)
                }
            }

            function R(e, t, n) {
                return {
                    x: t / e || 0,
                    y: n / e || 0
                }
            }

            function $(e, t) {
                return e === t ? 1 : s(e) >= s(t) ? e < 0 ? 2 : 4 : t < 0 ? 8 : 16
            }

            function F(e, t, n) {
                n || (n = N);
                var i = t[n[0]] - e[n[0]],
                    a = t[n[1]] - e[n[1]];
                return Math.sqrt(i * i + a * a)
            }

            function z(e, t, n) {
                n || (n = N);
                var i = t[n[0]] - e[n[0]],
                    a = t[n[1]] - e[n[1]];
                return 180 * Math.atan2(a, i) / Math.PI
            }
            Y.prototype = {
                handler: function () {},
                init: function () {
                    this.evEl && y(this.element, this.evEl, this.domHandler), this.evTarget && y(this.target, this.evTarget, this.domHandler), this.evWin && y(E(this.element), this.evWin, this.domHandler)
                },
                destroy: function () {
                    this.evEl && G(this.element, this.evEl, this.domHandler), this.evTarget && G(this.target, this.evTarget, this.domHandler), this.evWin && G(E(this.element), this.evWin, this.domHandler)
                }
            };
            var B = {
                mousedown: 1,
                mousemove: 2,
                mouseup: 4
            };

            function H() {
                this.evEl = "mousedown", this.evWin = "mousemove mouseup", this.pressed = !1, Y.apply(this, arguments)
            }
            f(H, Y, {
                handler: function (e) {
                    var t = B[e.type];
                    1 & t && 0 === e.button && (this.pressed = !0), 2 & t && 1 !== e.which && (t = 4), this.pressed && (4 & t && (this.pressed = !1), this.callback(this.manager, t, {
                        pointers: [e],
                        changedPointers: [e],
                        pointerType: "mouse",
                        srcEvent: e
                    }))
                }
            });
            var U = {
                    pointerdown: 1,
                    pointermove: 2,
                    pointerup: 4,
                    pointercancel: 8,
                    pointerout: 8
                },
                W = {
                    2: "touch",
                    3: "pen",
                    4: "mouse",
                    5: "kinect"
                },
                j = "pointerdown",
                X = "pointermove pointerup pointercancel";

            function Q() {
                this.evEl = j, this.evWin = X, Y.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
            }
            e.MSPointerEvent && !e.PointerEvent && (j = "MSPointerDown", X = "MSPointerMove MSPointerUp MSPointerCancel"), f(Q, Y, {
                handler: function (e) {
                    var t = this.store,
                        n = !1,
                        i = e.type.toLowerCase().replace("ms", ""),
                        a = U[i],
                        o = W[e.pointerType] || e.pointerType,
                        r = "touch" == o,
                        l = T(t, e.pointerId, "pointerId");
                    1 & a && (0 === e.button || r) ? l < 0 && (t.push(e), l = t.length - 1) : 12 & a && (n = !0), l < 0 || (t[l] = e, this.callback(this.manager, a, {
                        pointers: t,
                        changedPointers: [e],
                        pointerType: o,
                        srcEvent: e
                    }), n && t.splice(l, 1))
                }
            });
            var q = {
                touchstart: 1,
                touchmove: 2,
                touchend: 4,
                touchcancel: 8
            };

            function Z() {
                this.evTarget = "touchstart", this.evWin = "touchstart touchmove touchend touchcancel", this.started = !1, Y.apply(this, arguments)
            }

            function J(e, t) {
                var n = x(e.touches),
                    i = x(e.changedTouches);
                return 12 & t && (n = S(n.concat(i), "identifier", !0)), [n, i]
            }
            f(Z, Y, {
                handler: function (e) {
                    var t = q[e.type];
                    if (1 === t && (this.started = !0), this.started) {
                        var n = J.call(this, e, t);
                        12 & t && n[0].length - n[1].length == 0 && (this.started = !1), this.callback(this.manager, t, {
                            pointers: n[0],
                            changedPointers: n[1],
                            pointerType: "touch",
                            srcEvent: e
                        })
                    }
                }
            });
            var K = {
                touchstart: 1,
                touchmove: 2,
                touchend: 4,
                touchcancel: 8
            };

            function ee() {
                this.evTarget = "touchstart touchmove touchend touchcancel", this.targetIds = {}, Y.apply(this, arguments)
            }

            function te(e, t) {
                var n = x(e.touches),
                    i = this.targetIds;
                if (3 & t && 1 === n.length) return i[n[0].identifier] = !0, [n, n];
                var a, o, r = x(e.changedTouches),
                    l = [],
                    s = this.target;
                if (o = n.filter((function (e) {
                        return M(e.target, s)
                    })), 1 === t)
                    for (a = 0; a < o.length;) i[o[a].identifier] = !0, a++;
                for (a = 0; a < r.length;) i[r[a].identifier] && l.push(r[a]), 12 & t && delete i[r[a].identifier], a++;
                return l.length ? [S(o.concat(l), "identifier", !0), l] : void 0
            }
            f(ee, Y, {
                handler: function (e) {
                    var t = K[e.type],
                        n = te.call(this, e, t);
                    n && this.callback(this.manager, t, {
                        pointers: n[0],
                        changedPointers: n[1],
                        pointerType: "touch",
                        srcEvent: e
                    })
                }
            });

            function ne() {
                Y.apply(this, arguments);
                var e = b(this.handler, this);
                this.touch = new ee(this.manager, e), this.mouse = new H(this.manager, e), this.primaryTouch = null, this.lastTouches = []
            }

            function ie(e, t) {
                1 & e ? (this.primaryTouch = t.changedPointers[0].identifier, ae.call(this, t)) : 12 & e && ae.call(this, t)
            }

            function ae(e) {
                var t = e.changedPointers[0];
                if (t.identifier === this.primaryTouch) {
                    var n = {
                        x: t.clientX,
                        y: t.clientY
                    };
                    this.lastTouches.push(n);
                    var i = this.lastTouches;
                    setTimeout((function () {
                        var e = i.indexOf(n);
                        e > -1 && i.splice(e, 1)
                    }), 2500)
                }
            }

            function oe(e) {
                for (var t = e.srcEvent.clientX, n = e.srcEvent.clientY, i = 0; i < this.lastTouches.length; i++) {
                    var a = this.lastTouches[i],
                        o = Math.abs(t - a.x),
                        r = Math.abs(n - a.y);
                    if (o <= 25 && r <= 25) return !0
                }
                return !1
            }
            f(ne, Y, {
                handler: function (e, t, n) {
                    var i = "touch" == n.pointerType,
                        a = "mouse" == n.pointerType;
                    if (!(a && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {
                        if (i) ie.call(this, t, n);
                        else if (a && oe.call(this, n)) return;
                        this.callback(e, t, n)
                    }
                },
                destroy: function () {
                    this.touch.destroy(), this.mouse.destroy()
                }
            });
            var re = L(r.style, "touchAction"),
                le = void 0 !== re,
                se = function () {
                    if (!le) return !1;
                    var t = {},
                        n = e.CSS && e.CSS.supports;
                    return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach((function (i) {
                        t[i] = !n || e.CSS.supports("touch-action", i)
                    })), t
                }();

            function ue(e, t) {
                this.manager = e, this.set(t)
            }
            ue.prototype = {
                set: function (e) {
                    "compute" == e && (e = this.compute()), le && this.manager.element.style && se[e] && (this.manager.element.style[re] = e), this.actions = e.toLowerCase().trim()
                },
                update: function () {
                    this.set(this.manager.options.touchAction)
                },
                compute: function () {
                    var e = [];
                    return d(this.manager.recognizers, (function (t) {
                            v(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
                        })),
                        function (e) {
                            if (w(e, "none")) return "none";
                            var t = w(e, "pan-x"),
                                n = w(e, "pan-y");
                            if (t && n) return "none";
                            if (t || n) return t ? "pan-x" : "pan-y";
                            if (w(e, "manipulation")) return "manipulation";
                            return "auto"
                        }(e.join(" "))
                },
                preventDefaults: function (e) {
                    var t = e.srcEvent,
                        n = e.offsetDirection;
                    if (this.manager.session.prevented) t.preventDefault();
                    else {
                        var i = this.actions,
                            a = w(i, "none") && !se.none,
                            o = w(i, "pan-y") && !se["pan-y"],
                            r = w(i, "pan-x") && !se["pan-x"];
                        if (a) {
                            var l = 1 === e.pointers.length,
                                s = e.distance < 2,
                                u = e.deltaTime < 250;
                            if (l && s && u) return
                        }
                        if (!r || !o) return a || o && 6 & n || r && 24 & n ? this.preventSrc(t) : void 0
                    }
                },
                preventSrc: function (e) {
                    this.manager.session.prevented = !0, e.preventDefault()
                }
            };

            function ce(e) {
                this.options = a({}, this.defaults, e || {}), this.id = C++, this.manager = null, this.options.enable = O(this.options.enable, !0), this.state = 1, this.simultaneous = {}, this.requireFail = []
            }

            function he(e) {
                return 16 & e ? "cancel" : 8 & e ? "end" : 4 & e ? "move" : 2 & e ? "start" : ""
            }

            function de(e) {
                return 16 == e ? "down" : 8 == e ? "up" : 2 == e ? "left" : 4 == e ? "right" : ""
            }

            function me(e, t) {
                var n = t.manager;
                return n ? n.get(e) : e
            }

            function pe() {
                ce.apply(this, arguments)
            }

            function ge() {
                pe.apply(this, arguments), this.pX = null, this.pY = null
            }

            function fe() {
                pe.apply(this, arguments)
            }

            function be() {
                ce.apply(this, arguments), this._timer = null, this._input = null
            }

            function ve() {
                pe.apply(this, arguments)
            }

            function Oe() {
                pe.apply(this, arguments)
            }

            function ye() {
                ce.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
            }

            function Ge(e, t) {
                return (t = t || {}).recognizers = O(t.recognizers, Ge.defaults.preset), new Me(e, t)
            }
            ce.prototype = {
                defaults: {},
                set: function (e) {
                    return a(this.options, e), this.manager && this.manager.touchAction.update(), this
                },
                recognizeWith: function (e) {
                    if (h(e, "recognizeWith", this)) return this;
                    var t = this.simultaneous;
                    return t[(e = me(e, this)).id] || (t[e.id] = e, e.recognizeWith(this)), this
                },
                dropRecognizeWith: function (e) {
                    return h(e, "dropRecognizeWith", this) || (e = me(e, this), delete this.simultaneous[e.id]), this
                },
                requireFailure: function (e) {
                    if (h(e, "requireFailure", this)) return this;
                    var t = this.requireFail;
                    return -1 === T(t, e = me(e, this)) && (t.push(e), e.requireFailure(this)), this
                },
                dropRequireFailure: function (e) {
                    if (h(e, "dropRequireFailure", this)) return this;
                    e = me(e, this);
                    var t = T(this.requireFail, e);
                    return t > -1 && this.requireFail.splice(t, 1), this
                },
                hasRequireFailures: function () {
                    return this.requireFail.length > 0
                },
                canRecognizeWith: function (e) {
                    return !!this.simultaneous[e.id]
                },
                emit: function (e) {
                    var t = this,
                        n = this.state;

                    function i(n) {
                        t.manager.emit(n, e)
                    }
                    n < 8 && i(t.options.event + he(n)), i(t.options.event), e.additionalEvent && i(e.additionalEvent), n >= 8 && i(t.options.event + he(n))
                },
                tryEmit: function (e) {
                    if (this.canEmit()) return this.emit(e);
                    this.state = 32
                },
                canEmit: function () {
                    for (var e = 0; e < this.requireFail.length;) {
                        if (!(33 & this.requireFail[e].state)) return !1;
                        e++
                    }
                    return !0
                },
                recognize: function (e) {
                    var t = a({}, e);
                    if (!v(this.options.enable, [this, t])) return this.reset(), void(this.state = 32);
                    56 & this.state && (this.state = 1), this.state = this.process(t), 30 & this.state && this.tryEmit(t)
                },
                process: function (e) {},
                getTouchAction: function () {},
                reset: function () {}
            }, f(pe, ce, {
                defaults: {
                    pointers: 1
                },
                attrTest: function (e) {
                    var t = this.options.pointers;
                    return 0 === t || e.pointers.length === t
                },
                process: function (e) {
                    var t = this.state,
                        n = e.eventType,
                        i = 6 & t,
                        a = this.attrTest(e);
                    return i && (8 & n || !a) ? 16 | t : i || a ? 4 & n ? 8 | t : 2 & t ? 4 | t : 2 : 32
                }
            }), f(ge, pe, {
                defaults: {
                    event: "pan",
                    threshold: 10,
                    pointers: 1,
                    direction: 30
                },
                getTouchAction: function () {
                    var e = this.options.direction,
                        t = [];
                    return 6 & e && t.push("pan-y"), 24 & e && t.push("pan-x"), t
                },
                directionTest: function (e) {
                    var t = this.options,
                        n = !0,
                        i = e.distance,
                        a = e.direction,
                        o = e.deltaX,
                        r = e.deltaY;
                    return a & t.direction || (6 & t.direction ? (a = 0 === o ? 1 : o < 0 ? 2 : 4, n = o != this.pX, i = Math.abs(e.deltaX)) : (a = 0 === r ? 1 : r < 0 ? 8 : 16, n = r != this.pY, i = Math.abs(e.deltaY))), e.direction = a, n && i > t.threshold && a & t.direction
                },
                attrTest: function (e) {
                    return pe.prototype.attrTest.call(this, e) && (2 & this.state || !(2 & this.state) && this.directionTest(e))
                },
                emit: function (e) {
                    this.pX = e.deltaX, this.pY = e.deltaY;
                    var t = de(e.direction);
                    t && (e.additionalEvent = this.options.event + t), this._super.emit.call(this, e)
                }
            }), f(fe, pe, {
                defaults: {
                    event: "pinch",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function () {
                    return ["none"]
                },
                attrTest: function (e) {
                    return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || 2 & this.state)
                },
                emit: function (e) {
                    if (1 !== e.scale) {
                        var t = e.scale < 1 ? "in" : "out";
                        e.additionalEvent = this.options.event + t
                    }
                    this._super.emit.call(this, e)
                }
            }), f(be, ce, {
                defaults: {
                    event: "press",
                    pointers: 1,
                    time: 251,
                    threshold: 9
                },
                getTouchAction: function () {
                    return ["auto"]
                },
                process: function (e) {
                    var t = this.options,
                        n = e.pointers.length === t.pointers,
                        i = e.distance < t.threshold,
                        a = e.deltaTime > t.time;
                    if (this._input = e, !i || !n || 12 & e.eventType && !a) this.reset();
                    else if (1 & e.eventType) this.reset(), this._timer = c((function () {
                        this.state = 8, this.tryEmit()
                    }), t.time, this);
                    else if (4 & e.eventType) return 8;
                    return 32
                },
                reset: function () {
                    clearTimeout(this._timer)
                },
                emit: function (e) {
                    8 === this.state && (e && 4 & e.eventType ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = u(), this.manager.emit(this.options.event, this._input)))
                }
            }), f(ve, pe, {
                defaults: {
                    event: "rotate",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function () {
                    return ["none"]
                },
                attrTest: function (e) {
                    return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || 2 & this.state)
                }
            }), f(Oe, pe, {
                defaults: {
                    event: "swipe",
                    threshold: 10,
                    velocity: .3,
                    direction: 30,
                    pointers: 1
                },
                getTouchAction: function () {
                    return ge.prototype.getTouchAction.call(this)
                },
                attrTest: function (e) {
                    var t, n = this.options.direction;
                    return 30 & n ? t = e.overallVelocity : 6 & n ? t = e.overallVelocityX : 24 & n && (t = e.overallVelocityY), this._super.attrTest.call(this, e) && n & e.offsetDirection && e.distance > this.options.threshold && e.maxPointers == this.options.pointers && s(t) > this.options.velocity && 4 & e.eventType
                },
                emit: function (e) {
                    var t = de(e.offsetDirection);
                    t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e)
                }
            }), f(ye, ce, {
                defaults: {
                    event: "tap",
                    pointers: 1,
                    taps: 1,
                    interval: 300,
                    time: 250,
                    threshold: 9,
                    posThreshold: 10
                },
                getTouchAction: function () {
                    return ["manipulation"]
                },
                process: function (e) {
                    var t = this.options,
                        n = e.pointers.length === t.pointers,
                        i = e.distance < t.threshold,
                        a = e.deltaTime < t.time;
                    if (this.reset(), 1 & e.eventType && 0 === this.count) return this.failTimeout();
                    if (i && a && n) {
                        if (4 != e.eventType) return this.failTimeout();
                        var o = !this.pTime || e.timeStamp - this.pTime < t.interval,
                            r = !this.pCenter || F(this.pCenter, e.center) < t.posThreshold;
                        if (this.pTime = e.timeStamp, this.pCenter = e.center, r && o ? this.count += 1 : this.count = 1, this._input = e, 0 === this.count % t.taps) return this.hasRequireFailures() ? (this._timer = c((function () {
                            this.state = 8, this.tryEmit()
                        }), t.interval, this), 2) : 8
                    }
                    return 32
                },
                failTimeout: function () {
                    return this._timer = c((function () {
                        this.state = 32
                    }), this.options.interval, this), 32
                },
                reset: function () {
                    clearTimeout(this._timer)
                },
                emit: function () {
                    8 == this.state && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
                }
            }), Ge.VERSION = "2.0.7", Ge.defaults = {
                domEvents: !1,
                touchAction: "compute",
                enable: !0,
                inputTarget: null,
                inputClass: null,
                preset: [
                    [ve, {
                        enable: !1
                    }],
                    [fe, {
                            enable: !1
                        },
                        ["rotate"]
                    ],
                    [Oe, {
                        direction: 6
                    }],
                    [ge, {
                            direction: 6
                        },
                        ["swipe"]
                    ],
                    [ye],
                    [ye, {
                            event: "doubletap",
                            taps: 2
                        },
                        ["tap"]
                    ],
                    [be]
                ],
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    contentZooming: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)"
                }
            };

            function Me(e, t) {
                var n;
                this.options = a({}, Ge.defaults, t || {}), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = e, this.input = new((n = this).options.inputClass || (D ? ee : k ? ne : H))(n, A), this.touchAction = new ue(this, this.options.touchAction), we(this, !0), d(this.options.recognizers, (function (e) {
                    var t = this.add(new e[0](e[1]));
                    e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3])
                }), this)
            }

            function we(e, t) {
                var n, i = e.element;
                i.style && (d(e.options.cssProps, (function (a, o) {
                    n = L(i.style, o), t ? (e.oldCssProps[n] = i.style[n], i.style[n] = a) : i.style[n] = e.oldCssProps[n] || ""
                })), t || (e.oldCssProps = {}))
            }
            Me.prototype = {
                set: function (e) {
                    return a(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), this.input.target = e.inputTarget, this.input.init()), this
                },
                stop: function (e) {
                    this.session.stopped = e ? 2 : 1
                },
                recognize: function (e) {
                    var t = this.session;
                    if (!t.stopped) {
                        var n;
                        this.touchAction.preventDefaults(e);
                        var i = this.recognizers,
                            a = t.curRecognizer;
                        (!a || a && 8 & a.state) && (a = t.curRecognizer = null);
                        for (var o = 0; o < i.length;) n = i[o], 2 === t.stopped || a && n != a && !n.canRecognizeWith(a) ? n.reset() : n.recognize(e), !a && 14 & n.state && (a = t.curRecognizer = n), o++
                    }
                },
                get: function (e) {
                    if (e instanceof ce) return e;
                    for (var t = this.recognizers, n = 0; n < t.length; n++)
                        if (t[n].options.event == e) return t[n];
                    return null
                },
                add: function (e) {
                    if (h(e, "add", this)) return this;
                    var t = this.get(e.options.event);
                    return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e
                },
                remove: function (e) {
                    if (h(e, "remove", this)) return this;
                    if (e = this.get(e)) {
                        var t = this.recognizers,
                            n = T(t, e); - 1 !== n && (t.splice(n, 1), this.touchAction.update())
                    }
                    return this
                },
                on: function (e, t) {
                    if (void 0 !== e && void 0 !== t) {
                        var n = this.handlers;
                        return d(I(e), (function (e) {
                            n[e] = n[e] || [], n[e].push(t)
                        })), this
                    }
                },
                off: function (e, t) {
                    if (void 0 !== e) {
                        var n = this.handlers;
                        return d(I(e), (function (e) {
                            t ? n[e] && n[e].splice(T(n[e], t), 1) : delete n[e]
                        })), this
                    }
                },
                emit: function (e, n) {
                    this.options.domEvents && function (e, n) {
                        var i = t.createEvent("Event");
                        i.initEvent(e, !0, !0), i.gesture = n, n.target.dispatchEvent(i)
                    }(e, n);
                    var i = this.handlers[e] && this.handlers[e].slice();
                    if (i && i.length) {
                        n.type = e, n.preventDefault = function () {
                            n.srcEvent.preventDefault()
                        };
                        for (var a = 0; a < i.length;) i[a](n), a++
                    }
                },
                destroy: function () {
                    this.element && we(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
                }
            }, a(Ge, {
                INPUT_START: 1,
                INPUT_MOVE: 2,
                INPUT_END: 4,
                INPUT_CANCEL: 8,
                STATE_POSSIBLE: 1,
                STATE_BEGAN: 2,
                STATE_CHANGED: 4,
                STATE_ENDED: 8,
                STATE_RECOGNIZED: 8,
                STATE_CANCELLED: 16,
                STATE_FAILED: 32,
                DIRECTION_NONE: 1,
                DIRECTION_LEFT: 2,
                DIRECTION_RIGHT: 4,
                DIRECTION_UP: 8,
                DIRECTION_DOWN: 16,
                DIRECTION_HORIZONTAL: 6,
                DIRECTION_VERTICAL: 24,
                DIRECTION_ALL: 30,
                Manager: Me,
                Input: Y,
                TouchAction: ue,
                TouchInput: ee,
                MouseInput: H,
                PointerEventInput: Q,
                TouchMouseInput: ne,
                SingleTouchInput: Z,
                Recognizer: ce,
                AttrRecognizer: pe,
                Tap: ye,
                Pan: ge,
                Swipe: Oe,
                Pinch: fe,
                Rotate: ve,
                Press: be,
                on: y,
                off: G,
                each: d,
                merge: g,
                extend: p,
                assign: a,
                inherit: f,
                bindFn: b,
                prefixed: L
            }), (void 0 !== e ? e : "undefined" != typeof self ? self : {}).NGHammer = Ge, "function" == typeof define && define.amdDISABLED ? define((function () {
                return Ge
            })) : "undefined" != typeof module && module.exports ? module.exports = Ge : e.NGHammer = Ge
        }(window, document)
})),
function () {
    "use strict";
    var e;
    e = function () {
        for (var e = document.querySelectorAll("[data-nanogallery2]"), t = 0; t < e.length; t++) jQuery(e[t]).nanogallery2(jQuery(e[t]).data("nanogallery2"));
        for (e = document.querySelectorAll("[data-nanogallery2-lightbox]"), t = 0; t < e.length; t++) e[t].classList.add("NGY2ThumbnailLightbox"), e[t].addEventListener("click", (function (e) {
            e.preventDefault();
            for (var t = {
                    lightboxStandalone: !0,
                    viewerToolbar: {
                        display: !1
                    }
                }, n = this.dataset.nanogallery2Lgroup, i = document.querySelectorAll("[data-nanogallery2-lightbox]"), a = 0; a < i.length; a++)
                if (i[a].dataset.nanogallery2Lgroup == n && "" !== i[a].dataset.nanogallery2Lightbox) {
                    t = jQuery.extend(!0, {}, t, jQuery(i[a]).data("nanogallery2Lightbox"));
                    break
                } jQuery(this).nanogallery2(t)
        }))
    }, "loading" != document.readyState ? e() : document.addEventListener ? document.addEventListener("DOMContentLoaded", e) : document.attachEvent("onreadystatechange", (function () {
        "complete" == document.readyState && e()
    }))
}.call(null),
    /**!
     * @preserve nanogallery2 - NANOPHOTOSPROVIDER2 data provider
     * Homepage: http://nanogallery2.nanostudio.org
     * Sources:  https://github.com/nanostudio-org/nanogallery2
     *
     * License:  GPLv3 and commercial licence
     * 
     */
    function (e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "nanogallery2"], e) : "object" == typeof exports && "function" == typeof require ? e(require(["jquery", "nanogallery2"])) : e(jQuery)
    }((function (e) {
        jQuery.nanogallery2.data_nano_photos_provider2 = function (e, t) {
            var n = e,
                i = function (t, i, s, c) {
                    var h = NGY2Item.GetIdx(n, t);
                    "" == e.I[h].title && (e.I[h].title = a(t));
                    var d = n.O.dataProvider + "?albumID=" + t;
                    d += "&hxs=" + n.tn.settings.getH(n.GOM.curNavLevel, "xs"), d += "&wxs=" + n.tn.settings.getW(n.GOM.curNavLevel, "xs"), d += "&hsm=" + n.tn.settings.getH(n.GOM.curNavLevel, "sm"), d += "&wsm=" + n.tn.settings.getW(n.GOM.curNavLevel, "sm"), d += "&hme=" + n.tn.settings.getH(n.GOM.curNavLevel, "me"), d += "&wme=" + n.tn.settings.getW(n.GOM.curNavLevel, "me"), d += "&hla=" + n.tn.settings.getH(n.GOM.curNavLevel, "la"), d += "&wla=" + n.tn.settings.getW(n.GOM.curNavLevel, "la"), d += "&hxl=" + n.tn.settings.getH(n.GOM.curNavLevel, "xl"), d += "&wxl=" + n.tn.settings.getW(n.GOM.curNavLevel, "xl"), r(!0), jQuery.ajaxSetup({
                        cache: !1
                    }), jQuery.support.cors = !0;
                    try {
                        var m = setTimeout((function () {
                            r(!1), l(n, "Could not retrieve nanoPhotosProvider2 data (timeout).")
                        }), 6e4);
                        n.O.debugMode && console.log("nanoPhotosProvider2 URL: " + d), jQuery.getJSON(d, (function (e, a, d) {
                            clearTimeout(m), r(!1), o(h, e), "ok" == e.nano_status ? (u(t), null != i && i(s, c, null)) : l(n, "Could not retrieve nanoPhotosProvider2 data. Error: " + e.nano_status + " - " + e.nano_message)
                        })).fail((function (e, t, i) {
                            clearTimeout(m), r(!1);
                            var a = "";
                            for (var o in e) a += o + "=" + e[o] + "<br>";
                            l(n, "Could not retrieve nanoPhotosProvider2 data. Error: " + (t + ", " + i + " " + a + "<br><br>URL:" + d))
                        }))
                    } catch (e) {
                        l(n, "Could not retrieve nanoPhotosProvider2 data. Error: " + e)
                    }
                };

            function a(e) {
                return decodeURIComponent(e)
            }

            function o(e, t) {
                n.O.debugMode && (console.log("nanoPhotosProvider2 parse data:"), console.dir(t));
                jQuery.each(t.album_content, (function (e, i) {
                    var o = n.O.dataProvider.substring(0, n.O.dataProvider.indexOf("nano_photos_provider2.php")),
                        r = o + a(i.src),
                        l = i.title,
                        u = i.description.split("_").join(" "),
                        c = "image";
                    void 0 !== i.kind && i.kind.length > 0 && (c = i.kind);
                    var h = i.ID,
                        d = !1;
                    if ("album" == c && (s(l, h) || (d = !0), "" == n.O.album && "" == n.O.photoset || (d = !0)), "image" == c || !d) {
                        var m = 0;
                        void 0 !== i.albumID && (m = i.albumID, !0);
                        var p = void 0 === i.tags ? "" : i.tags,
                            g = NGY2Item.New(n, l.split("_").join(" "), u, h, m, c, p);
                        g.setMediaURL(r, "img"), void 0 !== i.dcGIF && (g.imageDominantColors = "data:image/gif;base64," + i.dcGIF), void 0 !== i.dc && "" !== i.dc && (g.imageDominantColor = i.dc), "album" == c ? g.numberItems = i.cnt : (g.imageWidth = i.imgWidth, g.imageHeight = i.imgHeight), "" != i.originalURL && (g.downloadURL = o + a(i.originalURL));
                        for (var f = n.GOM.curNavLevel, b = ["xs", "sm", "me", "la", "xl"], v = 0; v < b.length; v++) g.thumbs.url[f][b[v]] = o + a(i.t_url[v]), g.thumbs.width[f][b[v]] = parseInt(i.t_width[v]), g.thumbs.height[f][b[v]] = parseInt(i.t_height[v]);
                        var O = n.O.fnProcessData;
                        null !== O && ("function" == typeof O ? O(g, n.O.dataProvider, t) : window[O](g, n.O.dataProvider, t))
                    }
                })), n.I[e].contentIsLoaded = !0
            }
            var r = NGY2Tools.PreloaderDisplay.bind(n),
                l = NGY2Tools.NanoAlert,
                s = NGY2Tools.FilterAlbumName.bind(n),
                u = NGY2Tools.AlbumPostProcess.bind(n);
            switch (t) {
                case "GetHiddenAlbums":
                    break;
                case "AlbumGetContent":
                    var c = arguments[2],
                        h = arguments[3],
                        d = arguments[4],
                        m = arguments[5];
                    i(c, h, d, m)
            }
        }
    })),
    /**!
     * @preserve nanogallery2 - GOOGLE PHOTOS data provider
     * Homepage: http://nanogallery2.nanostudio.org
     * Sources:  https://github.com/nanostudio-org/nanogallery2
     *
     * License:  GPLv3 and commercial licence
     * 
     */
    function (e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "nanogallery2"], e) : "object" == typeof exports && "function" == typeof require ? e(require(["jquery", "nanogallery2"])) : e(jQuery)
    }((function (e) {
        jQuery.nanogallery2.data_google2 = function (e, t) {
            var n = e,
                i = function (e, t, i, o) {
                    var s = "",
                        u = "image",
                        c = NGY2Item.GetIdx(n, e),
                        d = "";
                    n.galleryMaxItems.Get() > 0 && (d = "&max-results=" + n.galleryMaxItems.Get());
                    var m = "";
                    "undefined" != typeof ngy2_pwa_at && (m = ngy2_pwa_at), 0 == e ? (s = "" != m ? "https://photoslibrary.googleapis.com/v1/albums" : n.O.google2URL + "?nguserid=" + n.O.userID + "&alt=json&v=3&kind=album" + d + "&rnd=" + (new Date).getTime(), u = "album") : s = "" != m ? "https://photoslibrary.googleapis.com/v1/mediaItems:search" : n.O.google2URL + "?nguserid=" + n.O.userID + "&ngalbumid=" + e + "&alt=json&v=3&kind=photo&" + d, n.O.debugMode && console.log("Google Photos URL: " + s), r(!0), jQuery.ajaxSetup({
                        cache: !1
                    }), jQuery.support.cors = !0;
                    try {
                        var p = setTimeout((function () {
                            r(!1), l("Could not retrieve AJAX data...")
                        }), 6e4);
                        jQuery.getJSON(s + "&callback=?", (function (s) {
                            if ("error" == s.nano_status) return clearTimeout(p), r(!1), void l(n, "Could not retrieve Google data. Error: " + s.nano_message);
                            clearTimeout(p), r(!1), a(c, u, s), h(e), null != t && t(i, o, null)
                        })).fail((function (e, t, i) {
                            clearTimeout(p), r(!1);
                            var a = "";
                            for (var o in e) a += o + "=" + e[o] + "<br>";
                            l(n, "Could not retrieve Google data. Error: " + (t + ", " + i + " " + a + "<br><br>URL:" + s))
                        }))
                    } catch (e) {
                        l(n, "Could not retrieve Google data. Error: " + e)
                    }
                };

            function a(e, t, i) {
                n.O.debugMode && (console.log("Google Photos data:"), console.dir(i));
                var a = n.I[e].GetID();
                jQuery.each(i, (function (e, i) {
                    if ("object" == typeof i && null !== i) {
                        var r = "",
                            l = "";
                        "image" == t ? (void 0 !== i.description && (r = i.description), "" != n.O.thumbnailLabel.get("title") && (l = u(i.filename))) : l = i.title, null == l && (l = "");
                        var h = i.id;
                        if ("album" == t && (!c(l, h) || null == i.coverPhotoBaseUrl)) return !0;
                        var d = NGY2Item.New(n, l, r, h, a, t, ""),
                            m = 0,
                            p = 0,
                            g = "";
                        "image" == t ? (g = i.baseUrl, n.O.viewerZoom || null == n.O.viewerZoom ? g += "=h" + i.mediaMetadata.height + "-w" + i.mediaMetadata.width : window.screen.width > window.screen.height ? g += "=w" + window.screen.width : g = s + "=h" + window.screen.height, d.setMediaURL(g, "img"), void 0 !== i.mediaMetadata.width && (d.imageWidth = parseInt(i.mediaMetadata.width), m = d.imageWidth), void 0 !== i.mediaMetadata.height && (d.imageHeight = parseInt(i.mediaMetadata.height), p = d.imageHeight), void 0 !== i.mediaMetadata.photo && (null != i.mediaMetadata.photo.exposureTime && (d.exif.exposure = i.mediaMetadata.photo.exposureTime), null != i.mediaMetadata.photo.focalLength && (d.exif.focallength = i.mediaMetadata.photo.focalLength), null != i.mediaMetadata.photo.apertureFNumber && (d.exif.fstop = i.mediaMetadata.photo.apertureFNumber), null != i.mediaMetadata.photo.isoEquivalent && (d.exif.iso = i.mediaMetadata.photo.isoEquivalent), null != i.mediaMetadata.photo.cameraModel && (d.exif.model = i.mediaMetadata.photo.cameraModel)), void 0 !== i.mediaMetadata.video && (null != i.mediaMetadata.video.cameraModel && (d.exif.model = i.mediaMetadata.video.cameraModel), d.downloadURL = i.baseUrl + "=dv")) : d.numberItems = i.mediaItemsCount, d.thumbs = o("l1", d.thumbs, i, t, p, m), d.thumbs = o("lN", d.thumbs, i, t, p, m);
                        var f = n.O.fnProcessData;
                        null !== f && ("function" == typeof f ? f(d, "google2", i) : window[f](d, "google2", i))
                    }
                })), n.I[e].contentIsLoaded = !0
            }

            function o(e, t, i, a, o, r) {
                for (var l = ["xs", "sm", "me", "la", "xl"], s = 0; s < l.length; s++) {
                    if ("image" == a) {
                        if ("auto" == n.tn.settings.width[e][l[s]]) {
                            let a = r / o;
                            t.height[e][l[s]] = n.tn.settings.getH(e, l[s]), t.width[e][l[s]] = n.tn.settings.getH(e, l[s]) * a, t.url[e][l[s]] = i.baseUrl + "=h" + n.tn.settings.getH(e, l[s]);
                            continue
                        }
                        if ("auto" == n.tn.settings.height[e][l[s]]) {
                            let a = o / r;
                            t.width[e][l[s]] = n.tn.settings.getW(e, l[s]), t.height[e][l[s]] = n.tn.settings.getW(e, l[s]) * a, t.url[e][l[s]] = i.baseUrl + "=w" + n.tn.settings.getW(e, l[s]);
                            continue
                        }
                        t.height[e][l[s]] = n.tn.settings.getH(e, l[s]), t.width[e][l[s]] = n.tn.settings.getW(e, l[s]), t.url[e][l[s]] = i.baseUrl + "=w" + n.tn.settings.getW(e, l[s])
                    }
                    if ("album" == a) {
                        if ("auto" == n.tn.settings.width[e][l[s]]) {
                            t.url[e][l[s]] = i.coverPhotoBaseUrl + "=h" + n.tn.settings.getH(e, l[s]);
                            continue
                        }
                        if ("auto" == n.tn.settings.height[e][l[s]]) {
                            t.url[e][l[s]] = i.coverPhotoBaseUrl + "=w" + n.tn.settings.getW(e, l[s]);
                            continue
                        }
                        t.url[e][l[s]] = i.coverPhotoBaseUrl + "=h" + n.tn.settings.getH(e, l[s]) + "-w" + n.tn.settings.getW(e, l[s])
                    }
                }
                return t
            }
            var r = NGY2Tools.PreloaderDisplay.bind(n),
                l = NGY2Tools.NanoAlert,
                u = NGY2Tools.GetImageTitleFromURL.bind(n),
                c = NGY2Tools.FilterAlbumName.bind(n),
                h = NGY2Tools.AlbumPostProcess.bind(n);
            switch (t) {
                case "AlbumGetContent":
                    var d = arguments[2],
                        m = arguments[3],
                        p = arguments[4],
                        g = arguments[5];
                    i(d, m, p, g)
            }
        }
    })),
    /**!
     * @preserve nanogallery2 - FLICKR data provider
     * Homepage: http://nanogallery2.nanostudio.org
     * Sources:  https://github.com/nanostudio-org/nanogallery2
     *
     * License:  GPLv3 and commercial licence
     * 
     */
    function (e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "nanogallery2"], e) : "object" == typeof exports && "function" == typeof require ? e(require(["jquery", "nanogallery2"])) : e(jQuery)
    }((function (e) {
        jQuery.nanogallery2.data_flickr = function (e, t) {
            var n = e,
                i = {
                    url: function () {
                        return "https://api.flickr.com/services/rest/"
                    },
                    thumbSize: "               sq",
                    thumbAvailableSizes: new Array(75, 100, 150, 240, 500, 640),
                    thumbAvailableSizesStr: new Array("sq", "t", "q", "s", "m", "z"),
                    photoSize: "0",
                    photoAvailableSizes: new Array(75, 100, 150, 240, 500, 640, 1024, 1024, 1600, 2048, 1e4),
                    photoAvailableSizesStr: new Array("sq", "t", "q", "s", "m", "z", "b", "l", "h", "k", "o")
                },
                a = function (e, t, a, l) {
                    "" == n.O.flickrAPIKey && h(n, "Please set your Flickr API Key (option flickrAPIKey)");
                    var s = NGY2Item.GetIdx(n, e),
                        d = "",
                        m = "image";
                    "NONE" == n.O.photoset.toUpperCase() || "NONE" == n.O.album.toUpperCase() ? d = i.url() + "?&method=flickr.people.getPublicPhotos&api_key=" + n.O.flickrAPIKey + "&user_id=" + n.O.userID + "&extras=description,views,tags,url_o,url_sq,url_t,url_q,url_s,url_m,url_z,url_b,url_h,url_k&per_page=500&format=json" : 0 == n.I[s].GetID() ? (d = i.url() + "?&method=flickr.photosets.getList&api_key=" + n.O.flickrAPIKey + "&user_id=" + n.O.userID + "&per_page=500&primary_photo_extras=tags,url_o,url_sq,url_t,url_q,url_s,url_m,url_l,url_z,url_b,url_h,url_k&format=json", m = "album") : d = i.url() + "?&method=flickr.photosets.getPhotos&api_key=" + n.O.flickrAPIKey + "&photoset_id=" + n.I[s].GetID() + "&extras=description,views,tags,url_o,url_sq,url_t,url_q,url_s,url_m,url_l,url_z,url_b,url_h,url_k&format=json", n.O.debugMode && console.log("Flickr URL: " + d), c(!0), jQuery.ajaxSetup({
                        cache: !1
                    }), jQuery.support.cors = !0;
                    var g = setTimeout((function () {
                            c(!1), h(n, "Could not retrieve AJAX data...")
                        }), 6e4),
                        f = [],
                        b = function (i, d) {
                            jQuery.getJSON(i + "&page=" + d + "&jsoncallback=?", (function (v, O, y) {
                                var G = 0;
                                if ("album" == m) {
                                    if (void 0 !== v.stat && "fail" === v.stat) return h(n, "Could not retrieve Flickr album list: " + v.message + " (code: " + v.code + ")."), !1;
                                    f = f.concat(v.photosets.photoset), G = v.photosets.pages
                                } else if ("NONE" == n.O.photoset.toUpperCase() || "NONE" == n.O.album.toUpperCase()) f = f.concat(v.photos.photo), G = v.photos.pages;
                                else {
                                    if (void 0 !== v.stat && "fail" === v.stat) return h(n, "Could not retrieve Flickr album: " + v.message + " (code: " + v.code + ")."), !1;
                                    "" == n.I[s].title && (n.I[s].title = v.photoset.title), f = f.concat(v.photoset.photo), G = v.photoset.pages
                                }
                                G > d ? b(i, d + 1) : (clearTimeout(g), c(!1), f = u(f, n.O.tagBlockList), "album" == m ? r(s, e, f) : o(s, e, f), p(e), null != t && t(a, l, null))
                            })).fail((function (e, t, i) {
                                clearTimeout(g), c(!1), h(n, "Could not retrieve Flickr ajax data: " + t + ", " + i)
                            }))
                        };
                    b(d, 1)
                };

            function o(e, t, a) {
                n.O.debugMode && (console.log("Flickr parse photos:"), console.dir(a)), jQuery.each(a, (function (e, a) {
                    var o = a.id,
                        r = a.url_sq,
                        s = a.title;
                    "" != n.O.thumbnailLabel.get("title") && (s = d(r));
                    var u = a.description._content,
                        c = 75,
                        h = 75,
                        m = i.photoAvailableSizesStr.length - 1;
                    n.O.flickrSkipOriginal && m--;
                    for (e = m; e >= 0; e--)
                        if (null != a["url_" + i.photoAvailableSizesStr[e]]) {
                            r = a["url_" + i.photoAvailableSizesStr[e]], c = parseInt(a["width_" + i.photoAvailableSizesStr[e]]), h = parseInt(a["height_" + i.photoAvailableSizesStr[e]]);
                            break
                        } var p = {};
                    for (var g in a) 0 != g.indexOf("height_") && 0 != g.indexOf("width_") && 0 != g.indexOf("url_") || (p[g] = a[g]);
                    var f = void 0 !== a.tags ? a.tags : "",
                        b = NGY2Item.New(n, s, u, o, t, "image", f);
                    b.setMediaURL(r, "img"), b.imageWidth = c, b.imageHeight = h;
                    var v = {
                        url: {
                            l1: {
                                xs: "",
                                sm: "",
                                me: "",
                                la: "",
                                xl: ""
                            },
                            lN: {
                                xs: "",
                                sm: "",
                                me: "",
                                la: "",
                                xl: ""
                            }
                        },
                        width: {
                            l1: {
                                xs: 0,
                                sm: 0,
                                me: 0,
                                la: 0,
                                xl: 0
                            },
                            lN: {
                                xs: 0,
                                sm: 0,
                                me: 0,
                                la: 0,
                                xl: 0
                            }
                        },
                        height: {
                            l1: {
                                xs: 0,
                                sm: 0,
                                me: 0,
                                la: 0,
                                xl: 0
                            },
                            lN: {
                                xs: 0,
                                sm: 0,
                                me: 0,
                                la: 0,
                                xl: 0
                            }
                        }
                    };
                    v = l(v, a, "l1"), v = l(v, a, "lN"), b.thumbs = v;
                    var O = n.O.fnProcessData;
                    null !== O && ("function" == typeof O ? O(b, "flickr", a) : window[O](b, "flickr", a))
                })), n.I[e].contentIsLoaded = !0
            }

            function r(e, t, i) {
                n.O.debugMode && (console.log("Flickr parse list of albums:"), console.dir(i)), jQuery.each(i, (function (e, i) {
                    var a = i.title._content;
                    if (0 == i.visibility_can_see_set) return !0;
                    if (m(a, i.id)) {
                        var o = i.id,
                            r = null != i.description._content ? i.description._content : "",
                            s = {};
                        for (var u in i.primary_photo_extras) s[u] = i.primary_photo_extras[u];
                        var c = "";
                        void 0 !== i.primary_photo_extras && void 0 !== i.primary_photo_extras.tags && (c = i.primary_photo_extras.tags);
                        var h = NGY2Item.New(n, a, r, o, t, "album", c);
                        h.numberItems = i.photos, h.thumbSizes = s;
                        var d = {
                            url: {
                                l1: {
                                    xs: "",
                                    sm: "",
                                    me: "",
                                    la: "",
                                    xl: ""
                                },
                                lN: {
                                    xs: "",
                                    sm: "",
                                    me: "",
                                    la: "",
                                    xl: ""
                                }
                            },
                            width: {
                                l1: {
                                    xs: 0,
                                    sm: 0,
                                    me: 0,
                                    la: 0,
                                    xl: 0
                                },
                                lN: {
                                    xs: 0,
                                    sm: 0,
                                    me: 0,
                                    la: 0,
                                    xl: 0
                                }
                            },
                            height: {
                                l1: {
                                    xs: 0,
                                    sm: 0,
                                    me: 0,
                                    la: 0,
                                    xl: 0
                                },
                                lN: {
                                    xs: 0,
                                    sm: 0,
                                    me: 0,
                                    la: 0,
                                    xl: 0
                                }
                            }
                        };
                        d = l(d, i.primary_photo_extras, "l1"), d = l(d, i.primary_photo_extras, "lN"), h.thumbs = d;
                        var p = n.O.fnProcessData;
                        null !== p && ("function" == typeof p ? p(h, "flickr", i) : window[p](h, "flickr", i))
                    }
                })), n.I[e].contentIsLoaded = !0
            }

            function l(e, t, i) {
                var a = 1;
                !0 === n.tn.opt[i].crop && (a = n.O.thumbnailCropScaleFactor);
                for (var o = ["xs", "sm", "me", "la", "xl"], r = 0; r < o.length; r++)
                    if ("auto" == n.tn.settings.width[i][o[r]] || "" == n.tn.settings.width[i][o[r]]) {
                        let l = s("height_", Math.ceil(n.tn.settings.height[i][o[r]] * n.tn.scale * a * n.tn.settings.mosaic[i + "Factor"].h[o[r]]), t);
                        e.url[i][o[r]] = l.url, e.width[i][o[r]] = l.width, e.height[i][o[r]] = l.height
                    } else if ("auto" == n.tn.settings.height[i][o[r]] || "" == n.tn.settings.height[i][o[r]]) {
                    let l = s("width_", Math.ceil(n.tn.settings.width[i][o[r]] * n.tn.scale * a * n.tn.settings.mosaic[i + "Factor"].w[o[r]]), t);
                    e.url[i][o[r]] = l.url, e.width[i][o[r]] = l.width, e.height[i][o[r]] = l.height
                } else {
                    let l = "height_",
                        u = Math.ceil(n.tn.settings.height[i][o[r]] * n.tn.scale * a * n.tn.settings.mosaic[i + "Factor"].h[o[r]]);
                    n.tn.settings.width[i][o[r]] > n.tn.settings.height[i][o[r]] && (l = "width_", u = Math.ceil(n.tn.settings.width[i][o[r]] * n.tn.scale * a * n.tn.settings.mosaic[i + "Factor"].w[o[r]]));
                    let c = s(l, u, t);
                    e.url[i][o[r]] = c.url, e.width[i][o[r]] = c.width, e.height[i][o[r]] = c.height
                }
                return e
            }

            function s(e, t, n) {
                for (var a = {
                        url: "",
                        width: 0,
                        height: 0
                    }, o = 0, r = 0; r < i.thumbAvailableSizes.length; r++) {
                    var l = n[e + i.photoAvailableSizesStr[r]];
                    if (null != l && (o = r, l >= t)) break
                }
                var s = i.photoAvailableSizesStr[o];
                return a.url = n["url_" + s], a.width = parseInt(n["width_" + s]), a.height = parseInt(n["height_" + s]), a
            }
            var u = function (e, t) {
                return "" != t && null != e && (e = e.filter((function (e) {
                    var n = new RegExp(t, "i"),
                        i = [e.tags];
                    return Array.isArray(e.tags) && (i = e.tags), !i.some((function (e) {
                        return n.test(e)
                    }))
                }))), e
            };
            var c = NGY2Tools.PreloaderDisplay.bind(n),
                h = NGY2Tools.NanoAlert,
                d = NGY2Tools.GetImageTitleFromURL.bind(n),
                m = NGY2Tools.FilterAlbumName.bind(n),
                p = NGY2Tools.AlbumPostProcess.bind(n);
            switch (t) {
                case "AlbumGetContent":
                    var g = arguments[2],
                        f = arguments[3],
                        b = arguments[4],
                        v = arguments[5];
                    a(g, f, b, v)
            }
        }
    }));