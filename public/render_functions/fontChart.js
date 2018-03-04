import ReactDOM from 'react-dom';
import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import './fontChart.css';
import { uniqueId } from 'lodash';
import Odometer from './odometer';
import './odometer-theme-default.css';

export const fontChart = () => ({
  name: 'fontChart',
  displayName: 'Font Chart',
  help: 'Render a font with a percentage',
  reuseDomNode: true,
  render(domNode, config, handlers) {

    const color = config.color;
    const uuid = uniqueId();

    const domId = $('div', domNode).attr('id') || 'fontChart'+uuid;

    const createIcon = (name) => {
      let Icon = FontAwesome['Fa'+name];
      if ( typeof Icon == 'undefined' ) {
        Icon = FontAwesome['FaQuestion'];
      }
      return <Icon />;
    };

    const font = (
      <div id={domId} name={config.name} className='fontChart'>
        <div className="font">
          { createIcon(config.name) }
        </div>
        <div id='odometer' className="odometer"></div>
      </div>
    )
    if ( $('svg', domNode).length != 0 && $('div', domNode).attr('name') != config.name )  {
      ReactDOM.unmountComponentAtNode(domNode);
    }
    
    ReactDOM.render(font, domNode, () => {

      let size = Math.min( 
        Math.round(domNode.clientHeight*0.6), 
        Math.round(domNode.clientWidth*0.6) 
      );
      const percentage = (100-config.value)/100;
      const prevPercentage = $('#'+domId).attr('percentage') || 0;

      // keep the percentage there for state.
      $('#'+domId, domNode).attr('percentage', percentage);

      $('#'+domId + ' .font', domNode).css('font-size', size+'px'); 
      $('#'+domId+' svg g', domNode).attr('fill', 'url(#grad' + uuid + ')');
      $('#'+domId+' svg defs', domNode).remove();
      $('#'+domId+' svg g', domNode).before('<defs><linearGradient id="grad'+uuid+'" x1="0" x2="0" y1="0" y2="100%"><stop offset="'+percentage+'" stop-color="#F5F5F5"><animate begin="0s"  attributeName="offset" from="'+prevPercentage+'" to="'+percentage+'" dur="800ms" repeatCount="1" keySplines="0.1 0.8 0.2 1;0.1 0.8 0.2 1;0.1 0.8 0.2 1;0.1 0.8 0.2 1;0.1 0.8 0.2 1;0.1 0.8 0.2 1" keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" calcMode="spline" /></stop><stop offset="0%" stop-color="'+color+'"></stop></linearGradient></defs>');
      
      //$('#'+domId+' div.odometer', domNode)[0].innerHTML = Math.round(config.value);
      $('#'+domId + ' .odometer', domNode).css('font-size', size*0.3+'px'); 
      $('#'+domId + ' .odometer', domNode).css('color', color); 

      const meter = 100 - $('#'+domId, domNode).attr('percentage') * 100 || 0;
      const odometer = new Odometer({
        el: document.querySelector('#'+domId+' div.odometer', domNode),
        value: meter,
      });

      odometer.update(config.value);

      // rendering SVG changes
      $('#'+domId+' .font').html($('#'+domId+' .font').html());

      handlers.done();
    });



    handlers.onDestroy(() => {
      ReactDOM.unmountComponentAtNode(domNode);
    });

    handlers.onResize( () => {
      let size = Math.min( 
        Math.round(domNode.clientHeight*0.6), 
        Math.round(domNode.clientWidth*0.6) 
      );
      $('#'+domId +' .font', domNode).css('font-size', size+'px'); 
      $('#'+domId +' .odometer', domNode).css('font-size', size*0.3+'px'); 
    });

    return handlers.done();
  }
});