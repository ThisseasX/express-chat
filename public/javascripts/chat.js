var socket = io();
var username = 'Anonymous';

socket.on('message', message => {
    $('#messages').append(
        $('<p>').append(
            $('<span>')
                .addClass('username')
                .text(message.sender)
        ).append(
            $('<span>')
                .addClass('message')
                .addClass('theirs')
                .text(message.text)
        )
    );
    updateScroll();
});

socket.on('name', name => {
    username = name;
    $('#name').text(name);
});

$('#input').keydown((e) => {
    if (e.which === 13)
        send();
});

$(document.body).click((e) => {
    e.preventDefault();
    e.stopPropagation();
    $('#input').focus();
})

function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}

function send() {
    var input = $('#input');
    var val = input.val().trim();
    if (val === '') return;

    $('#messages').append(
        $('<p>').append(
            $('<span>')
                .addClass('message')
                .addClass('mine')
                .text(val)
        )
    );
    updateScroll();

    socket.emit('message', {
        sender: username,
        text: val
    });
    input.val('');
}