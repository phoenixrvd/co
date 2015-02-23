#Condition observer

##Examples

###Default usage
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

###JavaScript conditions
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

###Observing DOM-Changes
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
