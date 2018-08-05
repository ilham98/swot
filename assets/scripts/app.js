$(document).ready(function () {
    $('.preloader').fadeOut(1000);

    var loadData = function(){
    $.getJSON("assets/json/data.json", function (data) {
        var x = data;
        change(0);
        function change(index) {
            $('#cssSelector li').remove();
            var ul = $('#cssSelector');
            $.each(x[index].items, function (key,value) {
                ul.append("<li class='el' style='opacity: 0;'>" + value + "</li>");
            });
            anime.timeline({ loop: false })
                .add({
                    targets: '#cssSelector .el',
                    opacity: {
                        value: 1,
                        duration: 1000
                    },
                    translateX: {
                        value: 20,
                        duration: 1000
                    }
                })
                .add({
                    targets: '#cssSelector .el',
                    translateX: {
                        value: 0,
                        duration: 1000
                    }
                });
            $('#title .letters span').remove();
            $('#title .letters').html(x[index].title);
            animateTitle();
            $('#title, #content').removeClass().addClass(x[index].color);
        }
        $('#1,#2,#3,#4').click(function () {
            var index = this.id;
            change(index - 1);
        });
        function animateTitle() {
            $('#title .letters').each(function () {
                $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
            });
            anime.timeline({ loop: false })
                .add({
                    targets: '#title .letter',
                    scale: [0, 1],
                    duration: 1500,
                    elasticity: 600,
                    delay: function (el, i) {
                        return 45 * (i + 1);
                    }
                });
        }
    });
    }

    $.when(loadData()).done(function(){
        $('.container').fadeIn(1000);
    })
});

