(function() {
    $(document).ready(() => {
        $('#add_new_task').click(event => {
            $('#new_task_form').toggleClass('hidden')
        })

        $('.close').click(event => {
            const { id } = event.target

            fetch(`/task/${id}`, {
                method: 'delete'
            }).then(res => {
                document.location.reload()
            })
        })
    })
})()
