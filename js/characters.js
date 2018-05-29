var characters = {
    chars : [],

    curIdx : 0,

    charObj : function() {
        this.sortIdx = characters.curIdx++;
        this.startX = null;
        this.startY = null;

        this.owner = null;

        this.facing = null;

        this.id = null;
        this.imgsrc = null;

        this.stats = {};

        this.powers = {};
    },

    charStats : function() {
        var retObj = {};

        return retObj;
    },

    charPowers : function() {
        var retObj = {};

        return retObj;
    },

    drawChr : function(inCharObj) {
    }
}