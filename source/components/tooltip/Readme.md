### Examples

**Standard Use**

The tooltip component takes a child function containing the content that will
activate the tooltip, and creates a `portal` to render the tooltip into.

The child function gets called with a parmater that is an object of the
follwing shape

**ref** - `function` - a ref so the Tooltip Component can get the x and y

**onMouseEnter** - `function` - a function to activite the tooltip

**onMouseLeave** - `number` - a function to deactivite the tooltip

Spread the argument onto the element that you would like to activite the tooltip
with

```
const style = { textAlign: 'center', padding: '2em', background: '#efefef' };

<Tooltip delay={0} tip='I am a tooltip'>
  {bindTooltip => (
    <div {...bindTooltip} style={style}>
      Hover over me!
    </div>
  )}
</Tooltip>
```

**Custom Popup Component**

By not passing in a `tip` prop, the child function will also get called with a second argument containing the necessary
information to easily render your own component

The second argument is an object with the following shape

**hovering** - `boolean` - is the target element being hovered

**styles** - `object` - default styles for positioning the popup relative to the window

```
const ReactDOM = require('react-dom')
const style = { textAlign: 'center', padding: '2em', background: '#efefef' };

<Tooltip delay={0}>
  {(bindTooltip, customPopupProps) => (
    <>

      {customPopupProps.hovering && ReactDOM.createPortal(
        <div style={customPopupProps.styles}>
          I am a custom tooltip
        </div>,
        document.body
      )}

      <div {...bindTooltip} style={style}>
        Hover for a custom tooltip!
      </div>

    </>
  )}
</Tooltip>
```
