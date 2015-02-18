define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var HeaderFooter    = require('famous/views/HeaderFooterLayout');
    var ImageSurface    = require('famous/surfaces/ImageSurface');

    function PageView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createLayout.call(this);
        _createHeader.call(this);
        _createBody.call(this);

        _setListeners.call(this);
    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 44,
        appTitle: 'Famo.us ToDo App',
        titleSize: 17 
    };

    function _createBacking() {
        var backing = new Surface({
            properties: {
                backgroundColor: '#ff4444',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }
        });

        this.add(backing);
    }

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.1)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: '#ff4444'
            }
        });

        this.hamburgerSurface = new ImageSurface({
            size: [44, 44],
            content : 'img/hamburger.png'
        });

        this.titleSurface = new Surface({
            size: [true, true],
            content: this.options.appTitle,
            properties: {
                color: '#fff',
                fontSize: this.options.titleSize + 'px'
            }
        });

        var backgroundModifier = new StateModifier({
            transform : Transform.behind
        });

        var hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

        var titleModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });


        this.layout.header.add(backgroundModifier).add(backgroundSurface);
        this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
        this.layout.header.add(titleModifier).add(this.titleSurface);
    }

    function _createBody() {
        this.bodySurface = new ImageSurface({
            size : [undefined, true],
            content : 'img/body.png'
        });

        this.layout.content.add(this.bodySurface);
    }

    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));

        // this.bodySurface.pipe(this._eventOutput);
    }

    module.exports = PageView;
});