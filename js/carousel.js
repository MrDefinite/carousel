var carousel = (function($) {

    var imageList = [],
        preBtn = 'preBtn',
        postBtn = 'postBtn',
        currentImageId;

    function getElementIdByCount(id, count, length) {
        var elementId = id + count;
        if (id < 0 || id > length - 1) {
            throw 'Out of array boundray';
            return;
        }

        while (elementId < 0 || elementId > length - 1) {
            if (elementId < 0) {
                elementId += length;
            } else {
                elementId -= length;
            }    
        }
        return elementId;
    }

    function initImageList(divs) {
        var i,
            length = divs.length,
            imageObj;

        function initElementPostion(id) {
            if (id === 0) {
                $(imageList[id].element).addClass('active');
                return;
            }

            $(imageList[id].element).addClass('inactive');
        }

        for (i = 0; i < length; i++) {
            imageObj = {
                element: divs[i],
                pre: divs[getElementIdByCount(i, -1, length)],
                post: divs[getElementIdByCount(i, 1, length)]
            };
            imageList.push(imageObj);
            initElementPostion(i);
        }
        currentImageId = 0;
    }

    function bindSwitchBtn(isPreBtn) {
        var btn = isPreBtn ? preBtn : postBtn,
            nextEle = isPreBtn ? 'pre' : 'post',
            currentAnim = isPreBtn ? 'pre-out' : 'post-out',
            nextAnim = isPreBtn ? 'pre-in' : 'post-in';

        $('#' + btn).on('click', function() {
            $(imageList[currentImageId].element).addClass(currentAnim);
            $(imageList[currentImageId][nextEle]).addClass(nextAnim + ' active').removeClass('inactive');

            setTimeout(function() {
                $(imageList[currentImageId].element).removeClass(currentAnim + ' active').addClass('inactive');
                $(imageList[currentImageId][nextEle]).removeClass(nextAnim);

                currentImageId = getElementIdByCount(currentImageId, isPreBtn ? -1 : 1, imageList.length);
            }, 500);
        });
    }

    return {
        init: function() {
            initImageList($('#carousel').children('div.pic'));
            bindSwitchBtn(true);
            bindSwitchBtn(false);
        }
    };
}($));


$(document).ready(function() {
    carousel.init();
});