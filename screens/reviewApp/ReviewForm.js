import React from 'react';
import { View, Button, Text, TextInput } from 'react-native'
import { globalStyles } from '../../styles/review/ReviewStyle';
import Colors from '../../constants/review/Colors'
import FlatButton from '../../shared/common/FlatButton'
import { Formik } from 'formik'
import * as yup from 'yup'

const reviewSchema = yup.object({
    title: yup
        .string()
        .required()
        .min(2),
    body: yup
        .string()
        .required()
        .min(4),
    rating: yup
        .string()
        .required()
        .test('is-num-1-5', 'Please provide rating between 1 to 5!',
            val => {
                return parseInt(val) < 6 && parseInt(val) > 0
            })
})

const ReviewForm = props => {
    const { addReview } = props
    const handleSubmit = values => {
        addReview(values)
    }
    return (
        <View style={globalStyles.screen}>
            <Formik
                initialValues={{
                    title: '',
                    body: '',
                    rating: ''
                }}
                validationSchema={reviewSchema}
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Review title"
                            onChangeText={formikProps.handleChange('title')}
                            value={formikProps.values.title}
                            onBlur={formikProps.handleBlur('title')}
                        />
                        <Text style={globalStyles.error}>
                            {formikProps.touched.title && formikProps.errors.title}
                        </Text>
                        <TextInput
                            multiline
                            minHeight={60}
                            style={globalStyles.input}
                            placeholder="Body"
                            onChangeText={formikProps.handleChange('body')}
                            value={formikProps.values.body}
                            onBlur={formikProps.handleBlur('body')}

                        />
                        <Text style={globalStyles.error}>
                            {formikProps.touched.body && formikProps.errors.body}
                        </Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Rating (1-5)"
                            onChangeText={formikProps.handleChange('rating')}
                            value={formikProps.values.rating}
                            onBlur={formikProps.handleBlur('rating')}
                            keyboardType="numeric"
                        />
                        <Text style={globalStyles.error}>
                            {formikProps.touched.rating && formikProps.errors.rating}
                        </Text>
                        <FlatButton
                            text="submit"
                            color={Colors.white}
                            bgColor={Colors.darkBlue}
                            fontSize={18}
                            onPress={formikProps.handleSubmit}
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
}

export default ReviewForm;
