$(document).ready(function(){
    var students = [];
    var originalStudents = [];
    var sortByNameAsc = true;
    var sortByAgeAsc = true;

    $.getJSON('students.json', function(data) {
        students = data;
        originalStudents = data.slice(); 
        renderTable(students);
    });

    function renderTable(data) {
        var tbody = $('#studentTable tbody');
        tbody.empty();
        data.forEach(function(student) {
            tbody.append('<tr><td>' + student.Tên + '</td><td>' + student.Tuổi + '</td></tr>');
        });
    }

    // Sort by name
    $('#sortByName').click(function() {
        if (sortByNameAsc) {
            students.sort(function(a, b) {
                var nameA = a.Tên.split(' ').slice(-1)[0];
                var nameB = b.Tên.split(' ').slice(-1)[0];
                return nameA.localeCompare(nameB);
            });
        } else {
            students = originalStudents.slice(); 
        }
        sortByNameAsc = !sortByNameAsc;
        sortByAgeAsc = true; 
        renderTable(students);
    });

    // Sort by age
    $('#sortByAge').click(function() {
        if (sortByAgeAsc) {
            students.sort(function(a, b) {
                return a.Tuổi - b.Tuổi;
            });
        } else {
            students = originalStudents.slice(); 
        }
        sortByAgeAsc = !sortByAgeAsc;
        sortByNameAsc = true; 
        renderTable(students);
    });

    // Search 
    $('#searchButton').click(function() {
        var searchText = $('#searchInput').val().trim().toLowerCase();
        if (searchText !== '') {
            students.forEach(function(student) {
                var name = student.Tên.toLowerCase();
                var row = $('#studentTable tbody tr').eq(students.indexOf(student));
                if (name.includes(searchText)) {
                    row.addClass('highlight');
                } else {
                    row.removeClass('highlight');
                }
            });
        } else {
            $('#studentTable tbody tr').removeClass('highlight');
        }
    });

    // Hide age
    $('#hideButton').click(function() {
        var hideAge = parseInt($('#ageInput').val());
        if (!isNaN(hideAge)) {
            $('#studentTable tbody tr').each(function() {
                var age = parseInt($(this).find('td:eq(1)').text());
                if (age < hideAge) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        }
    });

    // Reset table
    $('#resetButton').click(function() {
        $('#studentTable tbody tr').show();
    });
});
