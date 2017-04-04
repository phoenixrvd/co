# jQuery Condition Observer

Es wird oft benötigt, ein HTML-Element, je nach zustand von anderen Komponenten auf der Webseite ein-/auszublenden. Üblicherweise macht man es im Eventhandler, was natürlich die eigentliche "condition" im code verschleiert.

Mit dem Plugin kann man die "condition" in Metadaten von HTML-Element direkt festlegen und dadurch GUI und eigentliche Applikationslogik viel besser voneinander trennen.


## Installation
```html
<head>
  <script src="jquery.min.js"></script>
  <script src="jquery.co.js"></script>
</head>
```

## Tests
```sh
$ open ./test/test.html
```

## Nutzung
**Observer starten**

observer für ein bestimmten HTML-Bereich registrieren.
```javascript
$('.conten').co();
```

**Conditions festlegen**

Text anzeigen, nur wenn **.conten .checkbox** angehackt ist
```html
<p data-condition=".checkbox1:checked" >Visible if checkbox checked</p>
```

## Komplettbeispiele

### Standard
Wenn jQuery-Selectors für validierung reichen.

```html
<div class="content">
    <label>Visible on check</label>
    <input class="checkbox1" type="checkbox">
    <p data-condition=".checkbox1:checked" >Visible if checkbox checked</p>
</div>
```

```javascript
$('.content').co();
```

### JavaScript-Condition
Wenn man komplexere Prüfungen durchführen will, kann man JavaScript benutzen.

```html
<div class="content">
    <label>Select item</label>
    <select class="select1">
        <option>Hide all</option>
        <option value="1">Show item 1</option>
        <option value="2">Show item 2</option>
    </select>
    <p data-condition="return $('.select1').val() == 1">Item 1 is selected</p>
    <p data-condition="return $('.select1').val() == 2">Item 2 is selected</p>
</div>
```

```javascript
$('.content').co();
```

### DOM-Observer
Das Plugin wird auch Änderungen an HTML-Baum beachten und automatisch die Sichtbarkeit ändern, wenn die 'condition' nicht mehr stimmt.

```html
<div class="content">
    <a>Click Me</a>
    <div class="ajax_content"></div>

    <p data-condition="return $('.ajax_content').html() == ''">no content</p>
    <p data-condition="return $('.ajax_content').html() != ''">content is loaded</p>
</div>
```

```javascript
var $container = $('.content');
$container.co(); // Start observing

// Changing of HTML-Tree with AJAX loaded content
$container.on('click', 'a', function(event){
    event.preventDefault();
    $('.ajax_content').html("");
    setTimeout(function(){
        $('.ajax_content').load("ajax_content.txt");
    }, 1000);
});
```
