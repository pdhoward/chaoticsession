
import React, { PropTypes } 							from 'react';
import ReactDOM 													from 'react-dom';
import { Card, CardText, CardActions }    from 'react-toolbox/lib/card';
import md5                                from 'md5';
import noop 															from 'lodash/noop';
import classNames 												from 'classnames';
import translate 													from '../../i18n/Translate';
import style 															from './Post.scss';
import icons 															from '../../constants/icons';


const getGravatar = client => `https://www.gravatar.com/avatar/${md5(client)}?d=retro`;

const Post = ({ currentUser, posts, type, icon, placeholder, onAdd, onDelete,
                      onLike, onUnlike, onEdit }) => {

      return (
			<div className={classNames(style.Conversation)}>
				<div className={classNames(style.chattitle)}>
            <Header name={currentUser} />
			  </div>
        <div className={classNames(style.chat)}>
					<Messages messages={posts} currentuser={currentUser} />
			  </div>
      </div>
)}


const Header = ({ name }) => (
			<div className={classNames(style.chattitle, style.avatar)}>
				<h1> {name} </h1>
        <img src={getGravatar(name)} />
			</div>
)

class Messages extends React.Component {

	render() {

		var sender = 1
		var viewerID = this.props.currentuser
		var messages = this.props.messages.map(function(message, i) {
				return <Message message={message.content} />;
		});

		return (
			<div className={classNames(style.messages, style.messagecontent)}>
				{messages}
			</div>
		);
	}
}

class Message extends React.Component {

	componentDidMount() {
     this.textmessage.scrollIntoView();
   }

	 componentWillUpdate(){
	 }

	render() {
			return (
				<div className={classNames(style.message)} ref={node => this.textmessage = node}>
					<span>{this.props.message}</span>
				</div>
			)	}

}

Post.propTypes = {
	    currentUser: PropTypes.string.isRequired,
	    posts: PropTypes.array.isRequired,
	    type: PropTypes.string.isRequired,
	    icon: PropTypes.string,
	    placeholder: PropTypes.string.isRequired,
	    onAdd: PropTypes.func,
	    onDelete: PropTypes.func,
	    onLike: PropTypes.func,
	    onUnlike: PropTypes.func,
	    onEdit: PropTypes.func
	};

Post.defaultProps = {
	    currentUser: null,
	    posts: [],
	    type: 'Live',
	    icon: icons.add_circle,
	    placeholder: 'New Comment',
	    onAdd: noop,
	    onDelete: noop,
	    onLike: noop,
	    onUnlike: noop,
	    onEdit: noop
	};

export default translate('Post')(Post);
