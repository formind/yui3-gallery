YUI.add("gallery-pathogen-encoder",function(e,t){function v(e){this.tree={weight:Number.MAX_VALUE,path:"/",children:{}},this.rootPrefixLen=e.rootPrefix.length||0,this.moduleDelimLen=e.moduleDelim.length||0,this.subgroupDelimLen=e.subgroupDelim.length||0,this.groupDelimLen=e.groupDelim.length||0}var n=e.Loader.prototype.resolve,r="p/",s=";",o="+",u=",",a=/-(min|debug).js/,f=/\.(?:js|css)$/,l=/^(?:yui:)?gallery-([^\/]+)/,c={js:!0,css:!0},h,p,d;e.Loader.prototype.buildCombo=function(e,t,n){var r=t,i=t.length+n.length,a,f,l,c,h,d,v,m;for(m=0,v=e.length;m<v;m+=1){d=e[m],a=r===t?"":s,f=d.key,c=d.modules;while(c.length){l=a+f,l=l?l+o:u,d.key.indexOf("path")===0&&(l=a),h=l+c[0];if(!(i+h.length<p))return r+n;r+=h,i+=h.length,c.shift(),a=f=""}}return r+=n,r.length===t.length+n.length&&(r=null),r},e.Loader.prototype.aggregateGroups=function(t){var n={},r,i,a,c,h,p,m,g,y;for(y=0,g=t.length;y<g;y+=1){p=t[y],h=p.name,c=this.groups&&this.groups[p.group];if(c){if(!c.combine||p.fullpath)continue}else if(!this.combine)continue;if(!p.combine&&p.ext)continue;if(!p.group)m="c"+o+YUI.version;else if(p.group==="gallery")d||(r=l.exec(this.groups.gallery.root),d=r&&r[1]),h=h.split("gallery-").pop(),m="g"+o+d;else if(p.path.indexOf(h+"/"+h)===0)m=c.root,m[0]==="/"&&(m=m.slice(1)),m[m.length-1]==="/"&&(m=m.slice(0,-1)),m="r"+o+m;else{h=p.path.split(f).shift();if(e.config.fullpathCompression){a=a||new v({rootPrefix:"p+",moduleDelim:u,subgroupDelim:o,groupDelim:s}),a.add(h);continue}m="path"+o+h}n[m]=n[m]||[],n[m].push(h),e.config.customComboFallback&&(p.group==="gallery"&&(h="gallery-"+h),this.pathogenSeen[h]=!0)}if(a){i=a.compress();for(y=0,g=i.length;y<g;y+=1)m="p"+o+i[y].root,n[m]=n[m]||[],n[m].push(i[y].name);a.destroy(),a=null}return n},v.prototype={add:function(e){var t=this.tree,n=e.split("/"),r=[],i,s,o,u;while(n.length)u=n.shift(),o=t.children[u],r.push(u),i=n.join("/"),o?o.weight+=this.moduleDelimLen+i.length:(s=r.join("/"),o=t.children[u]={path:s,weight:0},i?(o.weight+=s.length+i.length,o.weight+=this.subgroupDelimLen,o.children={}):o.weight=Number.MAX_VALUE),t=o},compress:function(){var e=[],t=[],n,r,i,s,o,u,a,f,l;for(f in this.tree.children)this.tree.children.hasOwnProperty(f)&&e.push(this.tree.children[f]);while(e.length){o=0,n=[],a=e.pop(),s=this.rootPrefixLen+a.weight;for(f in a.children)a.children.hasOwnProperty(f)&&(u=a.children[f],o+=n.length?this.groupDelimLen+this.rootPrefixLen:this.rootPrefixLen,o+=u.weight,n.push(u));if(s<=o){r=new RegExp("^"+a.path+"/"),i=this.getLeafNodes(a);for(l=0;l<i.length;l+=1)t.push({name:i[l].path.replace(r,""),root:a.path})}else e=e.concat(n)}return t},getLeafNodes:function(e){var t=[],n;if(!e.children)return t.push(e),t;for(n in e.children)e.children.hasOwnProperty(n)&&(t=t.concat(this.getLeafNodes(e.children[n])));return t},destroy:function(){this.tree=null},stringify:function(e){return JSON&&JSON.stringify(e,null,4)}},e.Loader.prototype.sortAggregatedGroups=function(e){var t=[],n,r,i;for(n in e)e.hasOwnProperty(n)&&t.push({key:n,modules:e[n]});t.sort(function(e,t){return e.key>t.key});for(i=0,r=t.length;i<r;i+=1)t[i].modules.sort();return t},e.Loader.prototype.customResolve=function(t,n){var r=this.aggregateGroups(t),i=this.sortAggregatedGroups(r),s=[],o,u,f,l;u||(f=a.exec(e.config.loaderPath),u=f&&f[1]||"raw",u=n==="css"&&u==="debug"?"raw":"min",o=u==="min"?"":"."+u,o=o+"."+n),l=this.buildCombo(i,h,o);while(l)s.push(l),l=this.buildCombo(i,h,o);return s},e.Loader.prototype.shouldFallback=function(e){var t,n,r;if(this.fallbackMode)return this.fallbackMode;for(r in c)if(c.hasOwnProperty(r)){t=e[r+"Mods"];for(i=0,len=t.length;i<len;i+=1){n=t[i].name;if(this.pathogenSeen[n])return this.fallbackMode=!0,this.fallbackMode}}},e.Loader.prototype.resolve=function(){var t=n.apply(this,arguments),i=this.combine,s,o,u,a,f,l,d,v,m,g,y;if(!i)for(d in this.groups)if(this.groups.hasOwnProperty(d)&&!i&&d.combine){i=d.combine;break}e.config.customComboBase&&(h=e.config.customComboBase+r);if(e.config.customComboFallback){this.pathogenSeen=this.pathogenSeen||{};if(this.shouldFallback(t))return t}if(h&&i){p=this.maxURLLength;for(v in c){if(!c.hasOwnProperty(v))continue;a=[],f=v,l=v+"Mods",t[f]=s=t[f]||[],t[l]=o=t[l]||[];for(y=0,g=s.length;y<g;y+=1)m=s[y],(typeof m=="object"||typeof m=="string"&&m.indexOf("/combo?")===-1)&&a.push(m);u=this.customResolve(o,v),window.JSON,t[v]=[].concat(u,a)}}return t}},"@BETA@",{requires:["loader-base"]});
