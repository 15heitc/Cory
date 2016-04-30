function onLoad()
{
    getGardens(false);
    //$(".newValue").hide();
}

function ajaxInsertGarden(method, ParentID, Name,Position, Years, Number)
{
    alert("ajax insert GArden")
    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {method: method,

            Name: Name,
            Position: Position,
            Years: Years,
            Number: Number,

        }
    });
}

function insertGarden()
{
    alert("insertGarden")
    var id, Name, Position, Years, Number;
    id = JSON.stringify($('#Parent option:selected').val());
    Name = JSON.stringify($('#Name').val());
    Position = JSON.stringify($('#Position').val());
    Years = JSON.stringify($('#Years').val());
    Number = JSON.stringify($('#Number').val());

    ajax = ajaxInsertGarden("insertGarden", Name, Position,Years , Number);
    ajax.done(insertGardenCallback);
    ajax.fail(function () {
        alert("Failure");
    });
  //  getGardens();
}

function insertGardenCallback(response_in)
{
    alert("insertGardenCallback")
    response = JSON.parse(response_in);
    if (!response['success'])
    {
        $("#results").html("");
        alert("Insert failed on query:" + '\n' + response['querystring']);
    } else
    {
        $("#results").html(response['credentials'] + '<br>' +
            response['querystring'] + '<br>' +
            response['success'] + '<br>');
        getGardens(false);

    }
}

function showGardens(gardens)
{
    alert("showGardens")
    var gardenList = "";

    $.each(gardens, function (key, value)
    {
        var itemString = "";
        $.each(value, function (key, item)
        {
            itemString += item + "&nbsp &nbsp &nbsp";
        });
        gardenList += itemString + '<br>';
    });

    $("#results").html(gardenList);
}

function getGardens()
{
    alert("getGardens")
    ajax = ajaxgetGardens("getGardens");
    ajax.done(getGardensCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxgetGardens(method)
{
alert("ajaxGetGardens")
    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {method: method
        }
    });
}

function getGardensCallback(response_in)
{
    alert("getGardensCallback")
    response = JSON.parse(response_in);
    $gardens = response["gardens"];
    if (!response['success'])
    {
        $("#results").html("getGardens failed");
    } else
    {
        $('#Parent').find('option').remove();
        showGardens($gardens);
        $.each($gardens,
            function (key, garden)
                /*
                 * - key is the zero based position in the array
                 * - value is the entire row in the table
                 * - we want the value returned from selecting to be the
                 *   garden id -- position 0 in the row
                 * - we want the value that is displayed in the select
                 *   control to be the name of the garden -- zero based
                 *   position 2 in the row  Therefore:
                 */
            {
                $("#Parent")
                    .append($('<option>',
                        {
                            value: garden[0].toString(),
                            text: garden[2].toString()
                        }));

            }
        )
        ;
    }
}

function updateGarden()
{
    alert("updateGarden")
    var Parent, Name, Position, Years, Number,
        newParent, newName, newPosition, newYears, newNumber;
    Parent = JSON.stringify($('#Parent option:selected').val());
    Name = JSON.stringify($('#Name').val());
    Position = JSON.stringify($('#Position').val());
    Years = JSON.stringify($('#Years').val());
    Number = JSON.stringify($('#Number').val());
    newParent = JSON.stringify($('#newParent option:selected').val());
    newName = JSON.stringify($('#newName').val());
    newPosition = JSON.stringify($('#newPosition').val());
    newYears = JSON.stringify($('#newYears').val());
    newNumber = JSON.stringify($('#newNumber').val());
    ajax = ajaxupdateGardens("updateGarden", newParent, newName, newPosition,
        newYears, newNumber);
    ajax.done(updateGardenCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxupdateGarden(method)
{
alert("ajaxupdateGarden")
    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {method: method
        }
    });
}

function updateGardenCallback(response_in)
{
    alert("updateGardenCallback")
    response = JSON.parse(response_in);
    $gardens = response["gardens"];
    if (!response['success'])
    {
        $("#results").html("updateGardens failed");
    } else
    {
        $("#results").html(response['querystring']);
        $gardens = getGardens();
        showGardens($gardens);
    }
}