$(document).ready(function () {

    const apiQrUrl = 'https://peertube-instances.ir-to.com/api/v1/PluginQR?peerTubePlatformUrl=';
    const peerTubeInstancesBaseUrl = 'https://instances.joinpeertube.org/api/v1/instances?start=0&count=1000&healthy=true&customizations=3&sort=-customizations&randomSortSeed=1714740'

    // Initialize DataTable
    $('#instancesTable').DataTable({
        ajax: {
            url: peerTubeInstancesBaseUrl,
            dataSrc: 'data'
        },
        columns: [
            {
                data: 'host',
                render: function (data) {
                    // Render the host as a hyperlink using template literals
                    return `<a href="https://${data}" target="_blank" rel="noopener">${data}</a>`;
                }
            },
            {
                data: 'name',
                render: function (data, type, row) {
                    // Use the name as the text and short description as the tooltip
                    return `<span class="tooltip-span" data-toggle="tooltip" title="${row.shortDescription}">${data}</span>`;
                }
            },
            { data: 'totalUsers' },
            { data: 'totalVideos' },
            { data: 'totalLocalVideos' },
            { data: 'version' },
            // { data: 'signupAllowed' },
            {
                data: 'signupAllowed',
                render: function (data) {
                   return data == true ? 'Yes' : 'No';
                }
            },
            // { data: 'languages' },
            // { data: 'health' },
            {
                data: 'createdAt',
                render: function (data) {
                    // Format createdAt to display only the date
                    if (data)
                        return new Date(data).toLocaleDateString();
                }
            }
        ],
        columnDefs: [
            // Handle columns not found
            { targets: '_all', defaultContent: '' }
        ],
        paging: true, // Enable paging
        pageLength: 10, // Number of rows per page
        lengthMenu: [10, 25, 50, 100], // Options for number of rows per page
        scrollY: false, // Disable vertical scrolling
        initComplete: function () {

            // Add click event to show SweetAlert2 alert
            $('#instancesTable tbody').on('dblclick ', 'tr', function () {
                var data = $('#instancesTable').DataTable().row(this).data();

                if (data.host) {
                    Swal.fire({
                        title: `Add ${data.host} to grayjay`,
                        html: `<a href="https://grayjay.app/#download" target="_blank" rel=noopener>Download grayjay</a></br><img src="${apiQrUrl}${data.host}">`,
                        // icon: 'info',
                        confirmButtonText: 'OK'
                    });
                }
            });
        },
        drawCallback: function () {
            $('[data-toggle="tooltip"]').tooltip();
        },
        responsive: true

    });
});
