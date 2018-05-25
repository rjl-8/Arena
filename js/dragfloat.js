var dragFloat = {
    isdragging : false,

    offX : 0,
    offY : 0,
    div_id : null,

    moveFloaty : function(evt) {
        $('div').each(function(index) {
            if ($(this).hasClass('floaty')) {
                $(this).left = $(this).left + $('#div_map').scrollLeft;
                $(this).top = $(this).top + $('#div_map').scrollTop;
            };
        });
    },

    mouseUp : function() {
        document.getElementsByTagName('body')[0].removeEventListener('mousemove', dragFloat.divMove, true);
    },

    mouseDown : function(e) {
        console.log('in mouseDown');
        dragFloat.div_id = e.target.id;
        var div = document.getElementById(dragFloat.div_id);
        dragFloat.offY= e.clientY-parseInt(div.offsetTop);
        dragFloat.offX= e.clientX-parseInt(div.offsetLeft);
        document.getElementsByTagName('body')[0].addEventListener('mousemove', dragFloat.divMove, true);
    },

    divMove : function(e) {
        console.log('in divMove');
        var div = document.getElementById(dragFloat.div_id);
        div.style.position = 'absolute';
        div.style.top = (e.clientY-dragFloat.offY) + 'px';
        div.style.left = (e.clientX-dragFloat.offX) + 'px';
    }
}