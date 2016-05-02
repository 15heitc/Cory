function onLoad()
{
    getPlayers(false);
    //$(".newValue").hide();
}

function ajaxInsertPlayer(method, Name, Position, Years, Number)
{
    return $.ajax({
        url: 'BengalsAPI.php',
        type: 'POST',
        data: {method: method,

            Name: Name,
            Position: Position,
            Years: Years,
            Number: Number,

        }
    });
}

function insertPlayer()
{
    var id, Name, Position, Years, Number;
    id = JSON.stringify($('#Parent option:selected').val());
    Name = JSON.stringify($('#Name').val());
    Position = JSON.stringify($('#Position').val());
    Years = JSON.stringify($('#Years').val());
    Number = JSON.stringify($('#Number').val());

    ajax = ajaxInsertPlayer("insertPlayer", Name, Position,Years , Number);
    ajax.done(insertPlayerCallback);
    ajax.fail(function () {
        alert("Failure");
    });
    //  getPlayers();
}

function insertPlayerCallback(response_in)
{
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
        getPlayers(false);

    }
}

function showPlayers(gardens)
{
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

function getPlayers()
{
    ajax = ajaxgetPlayer("getPlayers");
    ajax.done(getPlayerCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxgetPlayer(method)
{
    return $.ajax({
        url: 'ShadyAPI.php',
        type: 'POST',
        data: {method: method
        }
    });
}

function getPlayerCallback(response_in)
{
    response = JSON.parse(response_in);
    $gardens = response["gardens"];
    if (!response['success'])
    {
        $("#results").html("getPlayers failed");
    } else
    {
        $('#Parent').find('option').remove();
        showPlayers($gardens);
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
