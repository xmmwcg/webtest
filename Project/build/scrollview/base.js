﻿/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Jun 7 13:54
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 scrollview/base/render
 scrollview/base
*/

/**
 * scrollview render
 * @author yiminghe@gmail.com
 */
KISSY.add('scrollview/base/render', function (S, Component, Extension) {

    // http://www.html5rocks.com/en/tutorials/speed/html5/
    var supportCss3 = S.Features.isTransformSupported(),
        transformProperty;

    var methods = {

        '_onSetScrollLeft': function (v) {
            this.get('contentEl')[0].style.left = -v + 'px';
        },

        '_onSetScrollTop': function (v) {
            this.get('contentEl')[0].style.top = -v + 'px';
        }

    };

    if (supportCss3) {

        transformProperty =  S.Features.getTransformProperty();

        methods._onSetScrollLeft = function (v) {
            var scrollTop = this.get('scrollTop');
            this.get('contentEl')[0].style[transformProperty] = 'translate3d(' + -v + 'px,' + -scrollTop + 'px,0)';
        };

        methods._onSetScrollTop = function (v) {
            var scrollLeft = this.get('scrollLeft');
            this.get('contentEl')[0].style[transformProperty] = 'translate3d(' + -scrollLeft + 'px,' + -v + 'px,0)';
        };

    }

    return Component.Render.extend([Extension.ContentRender], methods, {
        ATTRS: {
            scrollLeft: {
                value: 0
            },
            scrollTop: {
                value: 0
            }
        }
    });

}, {
    requires: ['component/base', 'component/extension']
});
/**
 * scrollview controller
 * @author yiminghe@gmail.com
 */
KISSY.add('scrollview/base', function (S, Node, Component, Extension, Render) {

    var undefined = undefined;

    var $ = S.all;

    var isTouchEventSupported = S.Features.isTouchEventSupported();

    var KeyCode = Node.KeyCode;

    return Component.Controller.extend({

        bindUI: function () {
            var self = this,
                el = self.get('el');
            el.on('mousewheel', self._onMouseWheel, self);
            // textarea enter cause el to scroll
            // bug: left top scroll does not fire scroll event, because scrollTop is 0!
            el.on('scroll', self._onElScroll, self);
        },

        syncUI: function () {
            var self = this,
                domEl = self.get('el')[0],
                contentEl = self.get('contentEl'),
                domContentEl = contentEl[0],
            // wierd ...
                scrollHeight = Math.max(domEl.scrollHeight, domContentEl.scrollHeight),
                scrollWidth = Math.max(domEl.scrollWidth, domContentEl.scrollWidth) ,
                clientHeight = domEl.clientHeight,
                _allowScroll,
                clientWidth = domEl.clientWidth;

            self.scrollHeight = scrollHeight;
            self.scrollWidth = scrollWidth;
            self.clientHeight = clientHeight;
            self.clientWidth = clientWidth;

            var elOffset = contentEl.offset();

            _allowScroll = self._allowScroll = {};

            if (scrollHeight > clientHeight) {
                _allowScroll.top = 1;
            }
            if (scrollWidth > clientWidth) {
                _allowScroll.left = 1;
            }

            self.minScroll = {
                left: 0,
                top: 0
            };

            var maxScrollX, maxScrollY;
            self.maxScroll = {
                left: maxScrollX = scrollWidth - clientWidth,
                top: maxScrollY = scrollHeight - clientHeight
            };

            var elDoc = $(domEl.ownerDocument);

            self.scrollStep = {
                top: Math.max(clientHeight * clientHeight * 0.7 / elDoc.height(), 20),
                left: Math.max(clientWidth * clientWidth * 0.7 / elDoc.width(), 20)
            };

            var snap = self.get('snap'),
                scrollLeft = self.get('scrollLeft'),
                scrollTop = self.get('scrollTop');

            if (snap) {
                var pages = self._pages = typeof snap == 'string' ?
                        contentEl.all(snap) :
                        contentEl.children(),
                    pageIndex = self.get('pageIndex'),
                    pagesXY = self._pagesXY = [];
                pages.each(function (p, i) {
                    var offset = p.offset(),
                        x = offset.left - elOffset.left,
                        y = offset.top - elOffset.top;
                    if (x <= maxScrollX && y <= maxScrollY) {
                        pagesXY[i] = {
                            x: x,
                            y: y,
                            index: i
                        };
                    }
                });
                if (pageIndex) {
                    this.scrollToPage(pageIndex);
                    return;
                }
            }

            // in case content is reduces
            self.scrollTo(scrollLeft, scrollTop);
        },

        _onElScroll: function () {
            var self = this,
                el = self.get('el'),
                domEl = el[0],
                scrollTop = domEl.scrollTop,
                scrollLeft = domEl.scrollLeft;
            if (scrollTop) {
                self.set('scrollTop', scrollTop + self.get('scrollTop'));
            }
            if (scrollLeft) {
                self.set('scrollLeft', scrollLeft + self.get('scrollLeft'));
            }
            domEl.scrollTop = domEl.scrollLeft = 0;
        },

        handleKeyEventInternal: function (e) {
            // no need to process disabled (already processed by Component)
            var target = e.target,
                $target=$(target),
                nodeName = $target.nodeName();
            // editable element
            if (nodeName == 'input' ||
                nodeName == 'textarea' ||
                nodeName == 'select' ||
                $target.hasAttr('contenteditable')) {
                return undefined;
            }
            var self = this,
                keyCode = e.keyCode,
                allowX = self.isAxisEnabled('x'),
                allowY = self.isAxisEnabled('y'),
                minScroll = self.minScroll,
                maxScroll = self.maxScroll,
                scrollStep = self.scrollStep,
                isMax, isMin,
                ok = undefined;
            if (allowY) {
                var scrollStepY = scrollStep.top,
                    clientHeight = self.clientHeight,
                    scrollTop = self.get('scrollTop');
                isMax = scrollTop == maxScroll.top;
                isMin = scrollTop == minScroll.top;
                if (keyCode == KeyCode.DOWN) {
                    if (isMax) {
                        return undefined;
                    }
                    self.scrollTo(undefined, scrollTop + scrollStepY);
                    ok = true;
                } else if (keyCode == KeyCode.UP) {
                    if (isMin) {
                        return undefined;
                    }
                    self.scrollTo(undefined, scrollTop - scrollStepY);
                    ok = true;
                } else if (keyCode == KeyCode.PAGE_DOWN) {
                    if (isMax) {
                        return undefined;
                    }
                    self.scrollTo(undefined, scrollTop + clientHeight);
                    ok = true;
                } else if (keyCode == KeyCode.PAGE_UP) {
                    if (isMin) {
                        return undefined;
                    }
                    self.scrollTo(undefined, scrollTop - clientHeight);
                    ok = true;
                }
            }
            if (allowX) {
                var scrollStepX = scrollStep.left,
                    scrollLeft = self.get('scrollLeft');
                isMax = scrollLeft == maxScroll.left;
                isMin = scrollLeft == minScroll.left;
                if (keyCode == KeyCode.RIGHT) {
                    if (isMax) {
                        return undefined;
                    }
                    self.scrollTo(scrollLeft + scrollStepX);
                    ok = true;
                } else if (keyCode == KeyCode.LEFT) {
                    if (isMin) {
                        return undefined;
                    }
                    self.scrollTo(scrollLeft - scrollStepX);
                    ok = true;
                }
            }
            return ok;
        },

        _onMouseWheel: function (e) {
            if (this.get('disabled')) {
                return;
            }
            var max,
                min,
                self = this,
                scrollStep = self.scrollStep,
                deltaY,
                deltaX,
                maxScroll = self.maxScroll,
                minScroll = self.minScroll;

            if ((deltaY = e.deltaY) && self.isAxisEnabled('y')) {
                var scrollTop = self.get('scrollTop');
                max = maxScroll.top;
                min = minScroll.top;
                if (scrollTop <= min && deltaY > 0 || scrollTop >= max && deltaY < 0) {
                } else {
                    self.scrollTo(undefined, scrollTop - e.deltaY * scrollStep['top']);
                    e.preventDefault();
                }
            }

            if ((deltaX = e.deltaX) && self.isAxisEnabled('x')) {
                var scrollLeft = self.get('scrollLeft');
                max = maxScroll.left;
                min = minScroll.left;
                if (scrollLeft <= min && deltaX > 0 || scrollLeft >= max && deltaX < 0) {
                } else {
                    self.scrollTo(scrollLeft - e.deltaX * scrollStep['left']);
                    e.preventDefault();
                }
            }
        },

        'isAxisEnabled': function (axis) {
            return this._allowScroll[axis == 'x' ? 'left' : 'top'];
        },


        stopAnimation: function () {
            this.get('contentEl').stop();
            var maxScroll = this.maxScroll;
            var minScroll = this.minScroll;
            this.set('scrollTop',
                Math.min(Math.max(this.get('scrollTop'), minScroll.top),
                    maxScroll.top));
            this.set('scrollLeft',
                Math.min(Math.max(this.get('scrollLeft'), minScroll.left),
                    maxScroll.left));
        },

        '_uiSetPageIndex': function (v) {
            this.scrollToPage(v);
        },

        _getPageIndexFromXY: function (v, allowX, direction) {
            var pagesXY = this._pagesXY.concat([]);
            var p2 = allowX ? 'x' : 'y';
            var i, xy;
            pagesXY.sort(function (e1, e2) {
                return e1[p2] - e2[p2];
            });
            if (direction > 0) {
                for (i = 0; i < pagesXY.length; i++) {
                    xy = pagesXY[i];
                    if (xy[p2] >= v) {
                        return xy.index;
                    }
                }
            } else {
                for (i = pagesXY.length - 1; i >= 0; i--) {
                    xy = pagesXY[i];
                    if (xy[p2] <= v) {
                        return xy.index;
                    }
                }
            }
            return undefined;
        },

        scrollToPage: function (index, animCfg) {
            var pageXY;
            if ((pageXY = this._pagesXY) && pageXY[index]) {
                this.setInternal('pageIndex', index);
                this.scrollTo(pageXY[index].x, pageXY[index].y, animCfg);
            }
        },

        scrollTo: function (left, top, animCfg) {
            var self = this;

            if (animCfg) {
                var scrollLeft = self.get('scrollLeft'),
                    scrollTop = self.get('scrollTop'),
                    contentEl = self.get('contentEl'),
                    anim = {
                        xx: {
                            fx: {
                                frame: function (anim, fx) {
                                    if (left !== undefined) {
                                        self.set('scrollLeft',
                                            scrollLeft + fx.pos * (left - scrollLeft));
                                    }
                                    if (top !== undefined) {
                                        self.set('scrollTop',
                                            scrollTop + fx.pos * (top - scrollTop));
                                    }
                                }
                            }
                        }
                    };
                contentEl.animate(anim, animCfg);
            } else {
                if (left !== undefined) {
                    self.set('scrollLeft', left);
                }
                if (top !== undefined) {
                    self.set('scrollTop', top);
                }
            }
        }

    }, {
        ATTRS: {
            contentEl: {
                view: 1
            },
            scrollLeft: {
                view: 1
            },
            scrollTop: {
                view: 1
            },
            focusable: {
                // need process keydown
                value: !isTouchEventSupported
            },
            allowTextSelection: {
                value: true
            },
            handleMouseEvents: {
                value: false
            },
            snap: {
                value: false
            },
            snapDuration: {
                value: 0.3
            },
            snapEasing: {
                value: 'easeOut'
            },
            pageIndex: {
                value: 0
            },
            xrender: {
                value: Render
            }
        }
    }, {
        xclass: 'scrollview'
    });

}, {
    requires: ['node', 'component/base', 'component/extension',
        './base/render']
});

