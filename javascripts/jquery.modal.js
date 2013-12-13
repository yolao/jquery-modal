// Generated by CoffeeScript 1.6.3
/*
jQuery Modal
Copyright 2013 Kevin Sylvestre
1.0.8
*/


(function() {
  "use strict";
  var $, Animation, Modal,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  Animation = (function() {
    function Animation() {}

    Animation.transitions = {
      "webkitTransition": "webkitTransitionEnd",
      "mozTransition": "mozTransitionEnd",
      "oTransition": "oTransitionEnd",
      "transition": "transitionend"
    };

    Animation.transition = function($el) {
      var el, result, type, _ref;
      el = $el[0];
      _ref = this.transitions;
      for (type in _ref) {
        result = _ref[type];
        if (el.style[type] != null) {
          return result;
        }
      }
    };

    Animation.execute = function($el, callback) {
      var transition;
      transition = this.transition($el);
      if (transition != null) {
        return $el.one(transition, callback);
      } else {
        return callback();
      }
    };

    return Animation;

  })();

  Modal = (function() {
    Modal.modal = function($el, options) {
      var data;
      if (options == null) {
        options = {};
      }
      data = $el.data('modal');
      if (!data) {
        data = new Modal($el, options);
        $el.data('modal', data);
      }
      return data;
    };

    Modal.prototype.$ = function(selector) {
      return this.$modal.find(selector);
    };

    function Modal($modal, settings) {
      if (settings == null) {
        settings = {};
      }
      this.hideVignette = __bind(this.hideVignette, this);
      this.showVignette = __bind(this.showVignette, this);
      this.hideModal = __bind(this.hideModal, this);
      this.showModal = __bind(this.showModal, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.toggle = __bind(this.toggle, this);
      this.keyup = __bind(this.keyup, this);
      this.close = __bind(this.close, this);
      this.remove = __bind(this.remove, this);
      this.$ = __bind(this.$, this);
      this.$modal = $modal;
      this.$vignette = $("<div class='vignette fade'></div>");
      $(document.body).append(this.$vignette);
    }

    Modal.prototype.remove = function() {
      this.$modal.remove();
      return this.$vignette.remove();
    };

    Modal.prototype.close = function(event) {
      if (event != null) {
        event.preventDefault();
      }
      if (event != null) {
        event.stopPropagation();
      }
      return this.hide();
    };

    Modal.prototype.keyup = function(event) {
      if (event.target.form != null) {
        return;
      }
      if (event.which === 27) {
        return this.close();
      }
    };

    Modal.prototype.toggle = function(method) {
      if (method == null) {
        method = 'on';
      }
      $(document)[method]("keyup", this.keyup);
      this.$vignette[method]("click", this.close);
      return this.$modal[method]('click', '[data-dismiss="modal"]', this.close);
    };

    Modal.prototype.hide = function() {
      var alpha, omega,
        _this = this;
      alpha = function() {
        return _this.toggle('off');
      };
      omega = function() {
        _this.$vignette.hide();
        return _this.$modal.hide();
      };
      alpha();
      this.hideVignette();
      return this.hideModal(omega);
    };

    Modal.prototype.show = function() {
      var alpha, omega,
        _this = this;
      omega = function() {
        return _this.toggle('on');
      };
      alpha = function() {
        _this.$vignette.show();
        return _this.$modal.show();
      };
      alpha();
      this.showVignette();
      return this.showModal(omega);
    };

    Modal.prototype.showModal = function(callback) {
      this.$modal.addClass('fade');
      this.$modal.position();
      this.$modal.removeClass('fade');
      if (callback != null) {
        return Animation.execute(this.$modal, callback);
      }
    };

    Modal.prototype.hideModal = function(callback) {
      this.$modal.removeClass('fade');
      this.$modal.position();
      this.$modal.addClass('fade');
      if (callback != null) {
        return Animation.execute(this.$modal, callback);
      }
    };

    Modal.prototype.showVignette = function(callback) {
      this.$vignette.addClass('fade');
      this.$vignette.position();
      this.$vignette.removeClass('fade');
      if (callback != null) {
        return Animation.execute(this.$vignette, callback);
      }
    };

    Modal.prototype.hideVignette = function(callback) {
      this.$vignette.removeClass('fade');
      this.$vignette.position();
      this.$vignette.addClass('fade');
      if (callback != null) {
        return Animation.execute(this.$vignette, callback);
      }
    };

    return Modal;

  })();

  $.fn.extend({
    modal: function(option) {
      if (option == null) {
        option = {};
      }
      return this.each(function() {
        var $this, action, options;
        $this = $(this);
        options = $.extend({}, $.fn.modal.defaults, typeof option === "object" && option);
        action = typeof option === "string" ? option : option.action;
        if (action == null) {
          action = "show";
        }
        return Modal.modal($this, options)[action]();
      });
    }
  });

}).call(this);
