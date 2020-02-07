import React from 'react';
import { View, Text, TextInput, Animated, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import _TouchItem from '../_TouchItem/_TouchItem'
import {isEmpty} from '../../lib/_global';

import style from './styles'


export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userError: this.props.userError,
            error: false,
            isFirstFill: true,
            resetKey: null,
            secureTextVisible: false,
            errorAnim: new Animated.Value(0),
            focusBorder: new Animated.Value(0),
            errorBorder: new Animated.Value(0),
            validatedBorder: new Animated.Value(0),
            text: '',
            secured: !!this.props.secured,
            label: props.label || '',
            secure_mask: '',
            borderContainer: this.props.borderContainer
        };

        this.initialState = this.state;
    }

    UNSAFE_componentWillReceiveProps(new_props) {
        if (this.state.isFirstFill && !this.textInput.isFocused() && !isEmpty(new_props.text)) {
            this.check();
            this.setState({
                isFirstFill: false
            });
        }
    }

    componentDidUpdate(newProps) {
        this.animateBorder();
    }

    triggerError(error) {
        this.setState({
            error
        });
        if (!error) {
            Animated.parallel([
                Animated.timing(this.state.errorAnim, {
                    toValue: 0,
                    duration: 300
                })
            ]).start();
            this.props.onChangeText(this.props.text);
        } else {
            Animated.parallel([
                Animated.timing(this.state.errorAnim, {
                    toValue: 1,
                    duration: 300
                })
            ]).start();
        }
    }

    onChangeText = (t) => {
        let s = '';
        if (this.state.secured) {
            if (t.length > this.state.text ?.length) {
                const last = t[t.length - 1];
                t = this.state.text + last;
            } else {
                t = this.state.text ?.slice(0, -1);
            }
            for (let i = 0; i < t.length; i++) {
                s += '•';
            }
            this.setState({
                text: t,
                secure_mask: s
            });
        }

        if (this.props.onChangeText) {
            this.props.onChangeText(t);
        } else {
            this.setState({
                text: t,
                secure_mask: s
            });
        }
        this.check();
    }

    validate = (silent) => {
        var errorCounter = 0;
        if (this.props.validationMode !== undefined) {
            let validationModeArr = this.props.validationMode.split('|');
            validationModeArr.map((validationType) => {
                if (this.validationSwitch(validationType)) {
                    errorCounter++;
                }
            })
        } else if (this.validationSwitch('')) {
            errorCounter++;
        }

        if (!silent) {
            errorCounter > 0 ? this.triggerError(true) : this.triggerError(false);
        } else {
            return errorCounter;
        }
    }

    validationSwitch = (validationType) => {
        switch (validationType) {
            case 'mail':
                var mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!mail.test(this.props.text)) {
                    this.setState({
                        error: true,
                        userError: this.buildError('Valid mail required')
                    });
                    return true;
                }
                break;
            case 'phone_number':
                var number = /^\d{10}$/
                if (this.props.text === '' || !number.test(this.props.text) && this.props.text != '') {
                    this.setState({
                        error: true,
                        userError: this.buildError('Not a Valid Phone Number')
                    });
                    return true;
                }
                break;
            default:
                if (this.props.text.length === 0) {
                    this.setState({
                        error: true,
                        userError: this.buildError('Cannot be empty')
                    });
                    return true;
                }
                this.setState({
                    error: false,
                    userError: ''
                });
                return false;
                break;
        }
    }

    buildError = (error) => {
        return this.state.userError != '' ? this.state.userError + ' & ' + error : error;
    }

    reset() {
        this.textInput.clear()
        this.setState(this.initialState)
    }

    onBlur() {
        this.check();
        this.setState({ focused: false })
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    check = () => {
        if (this.props.noCheck) {
            return;
        }
        this.setState({
            error: false,
            userError: '',
        }, () => {
            if (this.props.validateFn) {
                setTimeout(() => {
                    let userError = this.props.validateFn();
                    if (userError == "success") {
                        this.validate();
                    } else {
                        this.setState({
                            userError: userError,
                            error: true
                        }, () => {
                            this.triggerError(true);
                            this.props.onChangeText('');
                        })
                    }
                }, 200)
            }
            else {
                this.validate();
            }
        });
    }

    checkValidation = () => {
        let errorCount = this.validate(true);
        this.check()
        return errorCount
    }

    focusInput = () => {
        this.textInput.focus();
    }

    animateBorder() {
        Animated.parallel([
            Animated.timing(this.state.focusBorder, {
                toValue: this.state.focused ? 1 : 0,
                duration: 300
            }),
            Animated.timing(this.state.errorBorder, {
                toValue: this.state.error ? 1 : 0,
                duration: 300
            }),
            Animated.timing(this.state.validatedBorder, {
                toValue: !this.state.error && !this.state.isFirstFill ? 1 : 0,
                duration: 300,
            })
        ]).start()
    }

    render() {
        return (
            <View style={[style.wrapperStyle, this.props.wrapperStyle]} key={this.state.resetKey}>
                <View style={style.labelWrapper}>
                    <Text style={style.labelStyle}>{this.state.label}</Text>
                </View>
                <View style={[style.inputStyle, this.props.inputStyle]}>
                    <View style={{ width: '100%' }}>
                        <View style={[style.borderContainer, this.props.theme === 'light' ? style.lightBorder : style.normalBorder, this.state.borderContainer]}></View>
                        <Animated.View style={[style.borderContainer, this.props.theme === 'light' ? style.lightFocusBorder : style.focusBorder, this.state.borderContainer, { opacity: this.state.focusBorder }]}></Animated.View>
                        <Animated.View style={[style.borderContainer, this.state.borderContainer, style.errorBorder, { opacity: this.state.errorBorder }]}></Animated.View>
                        <Animated.View style={[style.borderContainer, this.state.borderContainer, this.props.theme === 'light' ? style.lightValidatedBorder : style.validatedBorder, { opacity: this.state.validatedBorder }]}></Animated.View>
                        <View style={style.inputInnerContainer}>
                            {this.props.iconLeft || <View />}
                            {this.props.label === 'Mobile: *' && 
                            <View style={style.right_border}>
                                <Text style={style.labelStyle}>+91</Text>
                            </View>}
                            <TextInput
                                {...this.props}
                                ref={(ti) => { this.textInput = ti; }}
                                style={[this.props.theme === 'light' ? style.lightInputStyle : style.textInputStyle, this.props.textStyle, this.props.iconLeft ? {} : { paddingLeft: 3 }]}
                                value={this.state.secured ? this.state.secure_mask : this.props.text}
                                secureTextEntry={this.props.secureTextEntry ? !this.state.secureTextVisible : false}
                                onFocus={(e) => {
                                    this.setState({ focused: true });
                                    if (typeof this.props.onFocus === 'function') {
                                        this.props.onFocus(e)
                                    }
                                }}
                                onBlur={this.onBlur.bind(this)}
                                onChangeText={this.onChangeText}
                                maxLength={this.props.maxLength}
                                underlineColorAndroid='transparent'
                                spellCheck={false}
                            />
                        </View>
                    </View>
                    <Animated.View style={[{ opacity: this.state.errorAnim, bottom: -15, position: 'absolute' }]}>
                        <Text style={style.labelError}>{this.state.userError}</Text>
                    </Animated.View>
                </View>
            </View>
        )
    }
}


Input.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    userError: PropTypes.string,
    placeholder: PropTypes.string,
    iconLib: PropTypes.string,
    iconStyle: PropTypes.object,
    iconSize: PropTypes.number,
    maxLength: PropTypes.number,
    validationMode: PropTypes.string,
    validateFn: PropTypes.func,
    customInputValidation: PropTypes.func,
    theme: PropTypes.string,
    onBlur: PropTypes.func,
    noCheck: PropTypes.bool,
    textStyle: PropTypes.object,
    borderContainer: PropTypes.object,
}

Input.defaultProps = {
    borderContainer: {},
    theme: 'dark',
    maxLength: 40,
    noCheck: false
}