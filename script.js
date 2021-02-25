let data = [
    { name: "car", capacity: 4, image: "assets/car.jpg", listAs: "Cars" },
    {
        name: "bus",
        capacity: 55,
        image: "assets/berlinbus.png",
        listAs: "Buses",
    },
    {
        name: "Boeing747",
        capacity: 500,
        image: "assets/boeing747.jpg",
        listAs: "Boeing747s",
    },
    {
        name: "ferry",
        capacity: 2000,
        image: "assets/ferry.jpg",
        listAs: "Cross Channel Ferries",
    },
    {
        name: "OlympiaStadion",
        capacity: 75000,
        image: "assets/olympstad.jpg",
        listAs: "Olympia Stadions",
    },
];

$(document).ready(function () {
    $("#userInput").html(`<label for="user_item">How many </label>
    <select name="user_item" id="useritem">
    
    </select>
    <p>will hold</p>
    <input
        type="number"
        id="usernum"
        name="user_num"
        min="0"
        max="100000001"
        oninput="validity.valid||(value='');"
    />
    <label for="user_num">people?</label>

    <input
        id="submit"
        type="button"
        value="Submit"
        onclick="calcCapacity('usernum', 'useritem');"
    />`);

    for (let i = 0; i < data.length; i++) {
        $("#useritem").append(
            "<option value=" + data[i].name + ">" + data[i].listAs + "</option>"
        );
    }

    $(".credits_text").html(
        `<b>Credits</b> <br> &copy <a href="https://lucysco.de/">Lucy Toman 2021</a> <br> From an original idea by Tim Duckett <br> Banner Photo by <a href="https://www.pexels.com/@krizjohn-rosales-251185?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Krizjohn Rosales</a> from Pexels <br>`
    );
});

function calcCapacity() {
    let people = $("#usernum").val();
    let vehicle = $("#useritem").val();
    let vCap = data.find((item) => item.name === vehicle).capacity;
    let vPic = data.find((item) => item.name === vehicle).image;
    let result;
    let pics;
    let seats;

    if ($(".display-modal").hasClass("vis")) {
        $("#pic").empty();
    }

    $(".display-modal").addClass("vis");

    if (!people || people == 0) {
        $(".results").html(`please choose a number`);
    } else {
        let quotient = people / vCap;
        let remainder = people % vCap;
        result = Math.ceil(quotient);

        let leftover = vCap - remainder;

        if (remainder == 0) {
            space = 0;
        } else {
            space = leftover;
        }

        if (space === 1) {
            seats = "seat";
        } else {
            seats = "seats";
        }

        if (result === 1) {
            if (people == 1) {
                $(".results").html(`
                ${result} ${vehicle} will hold ${people} person with ${space} ${seats} left over`);
            } else {
                $(".results").html(
                    `${result} ${vehicle} will hold ${people} people with ${space} ${seats} left over`
                );
            }
        } else {
            if (vehicle == "bus") {
                $(".results").html(
                    `${result} ${vehicle}es will hold ${people} people with ${space} ${seats} left over`
                );
            } else if (vehicle == "ferry") {
                $(".results").html(
                    `${result} ferries will hold ${people} people with ${space} ${seats} left over`
                );
            } else {
                $(".results").html(
                    `${result} ${vehicle}s will hold ${people} people with ${space} ${seats} left over`
                );
            }
        }

        for (var i = 0; i < result; i++) {
            pics = "<img src='" + vPic + "'/>";
            $("#pic").append(pics);
        }
    }
}

$(".X").on("click", function (e) {
    $(".display-modal").removeClass("vis");
    location.reload();
});

//creditscode
const menu = $("#menu");
const shut = $("#close");

menu.click(function (e) {
    console.log("clicked on menu");
    $(".credits").addClass("up");
    e.stopPropagation();
});

shut.click(function (e) {
    console.log("clicked on close", e);
    $(".credits").removeClass("up").addClass("down");
});
