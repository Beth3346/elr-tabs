'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var $ = require('jquery');

var elrTabs = function elrTabs() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$holderClass = _ref.holderClass,
        holderClass = _ref$holderClass === undefined ? 'elr-tabs' : _ref$holderClass,
        _ref$activeClass = _ref.activeClass,
        activeClass = _ref$activeClass === undefined ? 'active' : _ref$activeClass,
        _ref$speed = _ref.speed,
        speed = _ref$speed === undefined ? 300 : _ref$speed;

    var $holders = $('.' + holderClass);
    var self = {
        changeTab: function changeTab($holder, target, speed) {
            var $tab = $holder.find('section' + target);
            var $currentTab = $holder.find('section').not(':hidden');
            var currentId = '#' + $currentTab.attr('id');

            $currentTab.fadeOut(speed, function () {
                $tab.fadeIn(speed);
            });

            return currentId;
        },
        setupTabs: function setupTabs($containers, activeClass) {
            var hash = window.location.hash;

            $.each($containers, function () {
                var $that = $(this);
                var $tabs = $that.find('section');
                var hashTab = $that.find('nav').find('a[href=\'' + hash + '\']');

                $tabs.hide();

                if (hashTab.length) {
                    $that.find('section' + hash).show();
                    $that.find('nav').find('a[href=\'' + hash + '\']').addClass(activeClass);
                } else {
                    $that.find('nav').find('a[href^="#"]').first().addClass(activeClass);
                    $tabs.first().show();
                }
            });
        }
    };

    var getTarget = function getTarget() {
        return $(this).attr('href');
    };

    var updateHash = function updateHash(target) {
        window.location.hash = target;
    };

    var setActive = function setActive(activeClass, $nav, currentId, target) {
        $nav.find('a[href=\'' + currentId + '\']').removeClass(activeClass);
        $nav.find('a[href=\'' + target + '\']').addClass(activeClass);
    };

    if ($holders.length) {
        self.setupTabs($holders, activeClass);

        $holders.on('click', 'nav a[href^="#"]', function (e) {
            e.preventDefault();
            var $that = $(this);
            var $parent = $that.closest('.' + holderClass);
            var target = getTarget.call(this);
            var currentId = self.changeTab($parent, target, speed);

            setActive(activeClass, $parent.find('nav'), currentId, target);
            updateHash(target);
        });
    }

    return self;
};

exports.default = elrTabs;