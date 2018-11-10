let socket = io();

socket.on('connection' , () => {
    console.log('Connected ' + socket.id)
})

$(function () {
    let msglist = $('#msglist')
    let sendbtn = $('#sendmsg')
    let msgbox = $('#msgbox')
    let loginbtn = $('#login')

    loginbtn.click(function () {
        console.log('Button Clicked')
        socket.username = $('#user').val()

        $('#login-div').css("display", "none")
        $('#chat-div').css("display", "block")
    })
    
    sendbtn.click(function () {
        socket.emit('send_msg', {
            message: msgbox.val(),
            user: socket.username
        })
    })

    socket.on('recv_msg', function (data) {
        if (data.user === socket.username) {
            msglist.append(`Me :   ${data.message} <br>`)
        } else {
            msglist.append(`${data.user}: ${data.message} <br>`)
        }
    })
})
