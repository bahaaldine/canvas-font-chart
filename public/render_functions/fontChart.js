import ReactDOM from 'react-dom';
import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import './fontChart.css';
import { uniqueId } from 'lodash';

export const fontChart = () => ({
  name: 'fontChart',
  displayName: 'Font Chart',
  help: 'Render a font with a percentage',
  reuseDomNode: true,
  render(domNode, config, handlers) {

    const color = config.color;
    const uuid = uniqueId();
    const domId = 'fontChart'+uuid;

    const createIcon = (name) => {
      let Icon = FontAwesome['Fa'+name];
      if ( typeof Icon == 'undefined' ) {
        Icon = FontAwesome['FaQuestion'];
      }
      return <Icon />;
    };

    const font = (
      <div id={domId} name={config.name} className='fontChart'>
        <div>
          { createIcon(config.name) }
        </div>
      </div>
    )
    if ( $('svg', domNode).length != 0 && ($('div', domNode).attr('name') != config.name) ) {
      ReactDOM.unmountComponentAtNode(domNode);
    } 
    ReactDOM.render(font, domNode, () => {

      const size = Math.min( 
        Math.round(domNode.clientHeight*0.7), 
        Math.round(domNode.clientWidth*0.7) 
      );
      const percentage = (100-config.value)/100;
      const prevPercentage = $('#'+domId).attr('percentage') || 0;

      // keep the percentage there for state.
      $('#'+domId, domNode).attr('percentage', percentage);
      
      $('#'+domId, domNode).css('font-size', size+'px'); 
      $('#'+domId+' svg g', domNode).attr('fill', 'url(#grad'+uuid+')');
      $('#'+domId+' svg defs', domNode).remove();
      $('#'+domId+' svg g', domNode).before('<defs><linearGradient id="grad'+uuid+'" x1="0" x2="0" y1="0" y2="100%"><stop offset="'+percentage+'" stop-color="white"><animate begin="0s"  attributeName="offset" from="'+prevPercentage+'" to="'+percentage+'" dur="500ms" repeatCount="1" keySplines="0.1 0.8 0.2 1;0.1 0.8 0.2 1;0.1 0.8 0.2 1;0.1 0.8 0.2 1;0.1 0.8 0.2 1;0.1 0.8 0.2 1" keyTimes="0;0.22;0.33;0.55;0.66;0.88;1" calcMode="spline" /></stop><stop offset="0%" stop-color="'+color+'"></stop></linearGradient></defs>');

      // rendering SVG changes
      $('#'+domId).html($('#'+domId).html());

      handlers.done();
    });


    handlers.onDestroy(() => {
      ReactDOM.unmountComponentAtNode(domNode);
    });

    handlers.onResize( () => {
      $('.fontChart', domNode).css('font-size', Math.round(domNode.clientHeight*0.7)+'px'); 
    });

    return handlers.done();
  }
});