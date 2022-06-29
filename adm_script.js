let all;
const product_template = (item) => {
    return `<tr><td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.prom ? 'Активна' : 'Неактивна'}</td>
            <td>${item.category_text}(${item.category})</td>
            <td>${item.rate}</td>
            <td>${item.desc}</td>
            <td>${item.img}</td>
            <td><button style="cursor: pointer" onclick="delProduct(${item.id})"><i class="fa-solid fa-ban"></i> Удалить</button></td></tr>`;
}
function delProduct(id) {
    for(let it in all) {
        if(all[it].id === id) {
            all.splice(it, 1);
        }
    }
    updateTable()
}
function updateTable() {
    $('#products_table tr').remove()
    $('#products_table').html(`<tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Скидка</th>
            <th>Категория</th>
            <th>Рейтинг</th>
            <th>Описание</th>
            <th>Ссылка на изображение</th>
            <th>Управление</th>
        </tr>`);
    for(let it in all) {
        $('#products_table').append(product_template(all[it]))
    }
}
function download(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
$(document).ready(function() {

    fetch('./products.json')
        .then((response) => response.json())
        .then(async (data) => {
            all = data;
            for(let it in all) {
                $('#products_table').append(product_template(data[it]))
            }
        })

    $('.menu-toggle').click(function(){
        $('nav').toggleClass('active')
    })

    $('ul li').click(function(){
        $(this).siblings().removeClass('active');
        $(this).toggleClass('active');
    })

    $('#addnew').click(function() {
        let id = $('#newid');
        let title = $('#newtitle');
        let price = $('#newprice');
        let prom = $('#newprom');
        let cat = $('#newcat');
        let cattext = $('#newcattext');
        let rait = $('#newrait');
        let desc = $('#newdesc');
        let img = $('#newimg');
        all.push({
            "id": id.val(),
            "title": title.val(),
            "price": Number.parseInt(price.val()),
            "prom": (Number.parseInt(prom.val()) === 1),
            "category": cat.val(),
            "category_text": cattext.val(),
            "rate": Number.parseFloat(rait.val()),
            "desc": desc.val(),
            "img": img.val()
        })
        $('#products_table').append(product_template(all[all.length-1]))
    });
    $('#searchReq').on("keyup change", function(e) {
        let text = $('#searchReq').val();
        $('#products_table tr').remove()
        $('#products_table').html(`<tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Скидка</th>
            <th>Категория</th>
            <th>Рейтинг</th>
            <th>Описание</th>
            <th>Ссылка на изображение</th>
            <th>Управление</th>
        </tr>`);
        if(text !== '') {
            for(let it in all) {
                if(all[it].title.includes(text)) {
                    $('#products_table').append(product_template(all[it]))
                }
            }
        } else {
            for(let it in all) {
                $('#products_table').append(product_template(all[it]))
            }
        }
    })
    $('#saveData').click(function() {
        download(JSON.stringify(all), 'products.json', 'text/plain');
    })
});
