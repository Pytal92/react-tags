var ReactDND = require('react-dnd');
var React = require('react');

const ItemTypes = { TAG: 'tag' };

var Tag = React.createClass({
    mixins: [ReactDND.DragDropMixin],
    propTypes: {
        labelField: React.PropTypes.string,
        linkElement: React.PropTypes.string,
        onLinkClick: React.PropTypes.func,
        onDelete: React.PropTypes.func.isRequired,
        tag: React.PropTypes.object.isRequired,
        moveTag: React.PropTypes.func.isRequired
    },
    getDefaultProps: function() {
        return {
            labelField: 'text',
            linkElement: 'link'
        };
    },
    statics: {
        configureDragDrop: function(register) {
            register(ItemTypes.TAG, {
                dragSource: {
                    beginDrag: function(component) {
                        return {
                            item: {
                                id: component.props.tag.id
                            }
                        }
                    }
                },
                dropTarget: {
                    over(component, item) {
                        component.props.moveTag(item.id, component.props.tag.id);
                    }
                }
            });
        }
    },
    render: function(){
        var label = this.props.tag[this.props.labelField];
        var link = this.props.tag[this.props.linkElement];
        var output = label;

        if (link) {
            output = (
                <a href={link} onClick={this.props.onLinkClick.bind(null, label)}>{label}</a>
            )
        }

        return (
            <span className="ReactTags__tag"
                {...this.dragSourceFor(ItemTypes.TAG)}
                {...this.dropTargetFor(ItemTypes.TAG)}>{output}
                <a className="ReactTags__remove"
                   onClick={this.props.onDelete}>x</a>
            </span>
        )
    }
});

module.exports = Tag;