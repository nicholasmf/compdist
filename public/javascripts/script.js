var showComments = function (div, rating) {
    "use strict";
    var comments = [
        ["Gosto Ruim", "Temperatura Ruim", "Não gosto desse alimento"],
        ["Sem Gosto", "Temperatura Razoável", "Gosto pouco deste alimento"],
        ["Saborosa", "Temperatura Ideal", "Gosto muito desse alimento"]
    ],
        commentsDiv = div.getElementsByTagName("div")[0],
        op,
        i,
        input,
        label,
        catName;
    
    // Limpa div de comentarios
    div.removeChild(commentsDiv);
    commentsDiv = document.createElement("div");
    commentsDiv.className = "commentsDiv";
    div.appendChild(commentsDiv);
    catName = div.getElementsByTagName("input")[0].getAttribute("name").toString().split("_")[1];

    op = rating < 2 ? 0 : rating < 3 ? 1 : 2;
    for (i = 0; i < comments[op].length; i += 1) {
        input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "comment" + i + "_" + catName);
        input.setAttribute("id", div.getAttribute("id") + "_comment" + i);
        commentsDiv.appendChild(input);
        label = document.createElement("label");
        label.textContent = comments[op][i];
        label.setAttribute("for", div.getAttribute("id") + "_comment" + i);
        commentsDiv.appendChild(label);
        commentsDiv.appendChild(document.createElement("br"));
    }
};

var showRating = function (div) {
    "use strict";
    var opinar_isChecked = div.getElementsByTagName("input")[0].checked,
        tempDiv = div.getElementsByTagName("div")[0],
        inputs,
        i;
    
    inputs = div.getElementsByTagName("input");
    tempDiv.className = opinar_isChecked ? "" : "div_hidden";
    if (tempDiv.className == "div_hidden") {
        for (i = 0; i < inputs.length; i += 1) {
            inputs[i].checked = false;
        };
    }
    else {
        inputs[inputs.length - 1].checked = true;
        showComments(tempDiv, 0);
    }
};

var load = function () {
    "use strict";
    var lista = document.getElementById("lista"),
        li,
        i,
        j,
        count,
        score,
        opinarCheckbox,
        opinarLabel,
        option,
        label,
        img,
        div,
        temp,
        p,
        fieldset,
        imgpath = "./img/",
        ext = ".png",
        scores = ["horrible", "bad", "regular", "good", "excellent"],
        categories = ["Arroz", "Arroz Integral",
            "Feijao", "Salada", "Prato Principal", "Opção Vegetariana", "Guarnição", "Sobremesa", "Suco"];
    
    // Cria caixa de selecao para opinar
    opinarCheckbox = document.createElement("input");
    opinarCheckbox.setAttribute("type", "checkbox");
    // Cria o label correspondente
    opinarLabel = document.createElement("label");
    opinarLabel.textContent = "Opinar";
    
    // Cria div para opcoes
    score = document.createElement("div");
    fieldset = document.createElement("fieldset");
    fieldset.className = "rating";
    // Cria opções para selecionar com as imagens em score
    for (i = scores.length - 1; i >= 0; i -= 1) {
        /*Cria botão do tipo radio
    option = document.createElement("input");
    option.setAttribute("type", "radio");
    option.setAttribute("value", i);
    if (!i) {
        option.checked = true;
    }
    //option.className = "radio_hidden";
    score.appendChild(option);
    // Cria o label correspondente
    label = document.createElement("label");
    img = document.createElement("img");
    img.setAttribute("src", imgpath + scores[i] + ext);
    label.appendChild(img);
    score.appendChild(label);
    */
        option = document.createElement("input");
        option.setAttribute("type", "radio");
        option.value = i + 1;
        fieldset.appendChild(option);
        label = document.createElement("label");
        label.className = "full";
        label.title = scores[i];
        fieldset.appendChild(label);
        option = document.createElement("input");
        option.setAttribute("type", "radio");
        option.value = i + ".5";
        fieldset.appendChild(option);
        label = document.createElement("label");
        label.className = "half";
        label.title = scores[i];
        fieldset.appendChild(label);
    }

    score.appendChild(fieldset);
    // Cria div para opcoes de comentarios
    score.appendChild(document.createElement("div"));

    // Cria cada categoria dos alimentos e copia as opções selecionaveis
    for (i = 0; i < categories.length; i += 1) {
        div = document.createElement("div");
        div.className = "cat_div";

        // Texto da categoria do alimento
        p = document.createElement("p");
        p.textContent = categories[i];
        div.appendChild(p);

        // Cria copia do checkbox
        temp = opinarCheckbox.cloneNode(true);
        temp.setAttribute("id", "opinar" + i);
        temp.addEventListener("click", showRating.bind(null, div));
        div.appendChild(temp);
        temp = opinarLabel.cloneNode(true);
        temp.setAttribute("for", "opinar" + i);
        div.appendChild(temp);

        // Cria copia do rating
        temp = score.cloneNode(true);
        div.appendChild(temp);
        // Define atributos do checkbox "Opinar"
        temp.className = "div_hidden";
        temp.setAttribute("id", "div" + i);
        // Para cada botão "radio", atribui um nome e id e um for para o label correspondente
        for (j = 0; j < scores.length; j += 1) {
            count = scores.length * i + j;
            //lista.lastChild.childNodes[j * 2].setAttribute("name", "score" + i);
            //lista.lastChild.childNodes[j * 2].setAttribute("id", "score" + count);
            //lista.lastChild.childNodes[j * 2 + 1].setAttribute("for", "score" + count);
            
            // Define atributos da pontuacao
            temp.getElementsByTagName("input")[(scores.length * 2 - 1) - 2 * j].setAttribute("name", "rating_" + categories[i]);
            temp.getElementsByTagName("input")[(scores.length * 2 - 1) - 2 * j].setAttribute("id", "rating" + count + "half");
            temp.getElementsByTagName("input")[(scores.length * 2 - 1) - 2 * j].addEventListener("click", showComments.bind(null, temp, j));
            temp.getElementsByTagName("label")[(scores.length * 2 - 1) - 2 * j].setAttribute("for", "rating" + count + "half");

            temp.getElementsByTagName("input")[(scores.length * 2 - 2) - 2 * j].setAttribute("name", "rating_" + categories[i]);
            temp.getElementsByTagName("input")[(scores.length * 2 - 2) - 2 * j].setAttribute("id", "rating" + count);
            temp.getElementsByTagName("input")[(scores.length * 2 - 2) - 2 * j].addEventListener("click", showComments.bind(null, temp, j));
            temp.getElementsByTagName("label")[(scores.length * 2 - 2) - 2 * j].setAttribute("for", "rating" + count);
        }
    //lista.lastChild.lastChild.setAttribute("name", "comment" + i);
    lista.appendChild(div);
    }
};

window.onload = load;
