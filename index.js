function getWeeksInYear(year) {
   return moment(new Date(year, 11, 28)).isoWeek()
}

function setBoxSize(size) {
    var css = '.box { width: '+size+'px; height: '+size+'px;}'
        head = document.head,
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
}

function value(id) {
    var value = document.getElementById(id).value
    if (!value) {
        document.getElementById(id).style = 'border: 1px red solid;'
        return false
    }
    return value
}

function setupPath() {
    var year = value('year')
    var month = value('month')
    var day = value('day')
    var lifespan = value('lifespan')
    if (!year || !month || !day || !lifespan) {
        return false;
    }

    var chunks = [year, month, day, lifespan];

    window.location = '/' + chunks.join('/');

    return false;
}

function showBoxes(chunks) {
    const width  = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    const height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    const birthday = moment({
        year: chunks[1],
        month: chunks[2],
        day: chunks[3]
    });

    const now = moment(new Date());
    const death = moment(birthday).add(chunks[4], 'years');

    const crossedBoxes = now.diff(birthday, 'weeks');
    const emptyBoxes = death.diff(now, 'weeks');

    const totalBoxes = crossedBoxes + emptyBoxes

    const boxSize = Math.round(Math.sqrt((width*height) / totalBoxes))

    const rowSize = Math.floor(width / boxSize)

    const rows = Math.floor((height - (boxSize+1)) / boxSize)

    setBoxSize(boxSize-3);

    var body = document.body;
    var i = 0;
    for (r = 0; r < rows; r++) {
        var row = document.createElement('div')
        row.className = "row"

        body.appendChild(row)

        for (b = 0; b < rowSize; b++) {
            i++
            if (i > totalBoxes) {
                break
            }

            var box = document.createElement('div')
            box.className = 'box';
            if (i <= crossedBoxes) {
                box.className = 'box grey'
            }
            row.appendChild(box)
        }
    }
}

var chunks = window.location.pathname.split('/')
if (chunks.length == 5) {
    showBoxes(chunks);
} else {
    document.getElementById('index').style.display = 'block';
}
