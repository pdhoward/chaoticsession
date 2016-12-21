

import React, { PropTypes }               from 'react';
import noop                               from 'lodash/noop';
import PostAdd                            from '../board/PostAdd';
import { Card, CardText, CardActions }    from 'react-toolbox/lib/card';
import { default as Button }              from 'react-toolbox/lib/button';
import EditableLabel                      from '../EditableLabel';
import classNames                         from 'classnames';
import style                              from './Post.scss';
import icons                              from '../../constants/icons';
import translate                          from '../../i18n/Translate';

const canUse = (icon) => {
    if (icon == icons.thumb_up || icon == icons.thumb_down || icon == icons.chat)
      return 1
     else
      return 0
    }

const canEdit = (post, currentUser) => currentUser === post.user;

/////////////////////////////////////////////////////////////////////////////////////////
//// in order to enable renderDelete insert this call in cardActions compponent  ///////
///           { renderDelete(post, currentUser, strings, onDelete) }             //////
///////////////////////////////////////////////////////////////////////////////////////
const renderDelete = (post, currentUser, strings, onDelete) => {
    if (currentUser === post.user) {
        return (
            <Button
              icon={ icons.delete_forever }
              label={ strings.deleteButton }
              raised
              className={ style.deleteButton }
              onClick={ () => onDelete(post) }
            />
        );
    }

    return null;
};
/////////////////////////////////////////////////////////////////////////////////////

const renderButton = (post, currentUser, name, icon, className, onClick) => {
    const canUseButton = canUse(icon);
    const votes = null;
    const label = votes ? votes.toString() : '-';
    const disableButton = canUseButton ? 0 : 1;
    const disableStyle = canUseButton ? null : style.disabled;
    const classNameFinal = classNames(className, disableStyle);
    const visible = canUseButton || votes > 0;

/*
    if (!visible) {
        return null;
    }
    */
    return (
        <Button
          icon={icon}
          label={label}
          onClick={onClick}
          raised={canUseButton}
          className={classNameFinal}
          disabled={disableButton}
        />
    );
};

const Post = ({ post, currentUser, onEdit, onAdd, onLike, onUnlike, onDelete, strings }) => {

    console.log(">>>>>>>>>>>>>>>INSIDE WIDGETAI POST <<<<<<<<<<<<<<<<<");
    console.log({post: post});

  return (
    <div className={classNames(style.post, style[post.postType])}>
        <Card raised className={style.card}>
            <CardText>
              {post.user} > {post.content}

            </CardText>
            <CardText>
              {'Watson'} > {'Hello. This is Watson with a recommended response'}

            </CardText>
            <CardText>
                <PostAdd
                  onAdd={text => onAdd(type, text)}
                  placeholder={strings.enterContent}
                />
            </CardText>
            <CardActions>
                <div className={style.actions}>
                    { renderButton(post, currentUser,
                        'likes',
                        icons.thumb_up,
                        style.like,
                        () => onLike(post)) }
                    { renderButton(post, currentUser,
                        'dislikes',
                        icons.thumb_down,
                        style.dislike,
                        () => onDelete(post)) }
                    { renderButton(post, currentUser,
                        'live agent',
                         icons.chat,
                         style.agent,
                        () => onUnlike(post)) }
                    { renderButton(post, currentUser,
                        'voice',
                         icons.mic,
                         style.voice,
                        () => onUnlike(post)) }
                    { renderButton(post, currentUser,
                        'escalate',
                         icons.phone,
                         style.escalate,
                        () => onUnlike(post)) }
                    { renderButton(post, currentUser,
                        'notes',
                         icons.notes,
                         style.notes,
                        () => onUnlike(post)) }

                </div>
            </CardActions>
        </Card>
    </div>
)};

Post.propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
    onEdit: PropTypes.func,
    strings: PropTypes.object
};

Post.defaultProps = {
    post: null,
    currentUser: null,
    onDelete: noop,
    onLike: noop,
    onUnlike: noop,
    onEdit: noop,
    strings: {
        deleteButton: 'Delete',
        noContent: '(This post has no content)',
        enterContent: 'Enter a better response'
    }
};

export default translate('Post')(Post);
