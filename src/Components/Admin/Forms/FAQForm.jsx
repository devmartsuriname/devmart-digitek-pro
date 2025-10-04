import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateFAQSchema } from '@/lib/schemas/faq';
import RichTextEditor from './RichTextEditor';

const FAQForm = ({ faq = null, onSubmit, onCancel, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(CreateFAQSchema),
    defaultValues: {
      question: '',
      answer: '',
      category: '',
      order_num: 0,
    },
  });

  const answerValue = watch('answer');

  useEffect(() => {
    if (faq) {
      reset({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || '',
        order_num: faq.order_num,
      });
    }
  }, [faq, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="row g-4">
        {/* Question */}
        <div className="col-12">
          <label htmlFor="faq-question" className="form-label text-white">
            Question <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="faq-question"
            className={`form-control bg-dark text-white border-secondary ${errors.question ? 'is-invalid' : ''}`}
            {...register('question')}
            disabled={loading}
            placeholder="What is your question?"
            aria-required="true"
            aria-invalid={errors.question ? 'true' : 'false'}
            aria-describedby={errors.question ? 'faq-question-error faq-question-hint' : 'faq-question-hint'}
          />
          {errors.question && (
            <div id="faq-question-error" className="invalid-feedback" role="alert">
              {errors.question.message}
            </div>
          )}
          <small id="faq-question-hint" className="text-white-50">
            {watch('question')?.length || 0}/500 characters
          </small>
        </div>

        {/* Category */}
        <div className="col-md-6">
          <label htmlFor="faq-category" className="form-label text-white">Category</label>
          <input
            type="text"
            id="faq-category"
            className={`form-control bg-dark text-white border-secondary ${errors.category ? 'is-invalid' : ''}`}
            {...register('category')}
            disabled={loading}
            placeholder="e.g., General, Pricing, Technical"
            aria-invalid={errors.category ? 'true' : 'false'}
            aria-describedby={errors.category ? 'faq-category-error faq-category-hint' : 'faq-category-hint'}
          />
          {errors.category && (
            <div id="faq-category-error" className="invalid-feedback" role="alert">
              {errors.category.message}
            </div>
          )}
          <small id="faq-category-hint" className="text-white-50">Optional. Used for grouping FAQs.</small>
        </div>

        {/* Order */}
        <div className="col-md-6">
          <label htmlFor="faq-order" className="form-label text-white">Display Order</label>
          <input
            type="number"
            id="faq-order"
            className={`form-control bg-dark text-white border-secondary ${errors.order_num ? 'is-invalid' : ''}`}
            {...register('order_num', { valueAsNumber: true })}
            disabled={loading}
            min="0"
            aria-invalid={errors.order_num ? 'true' : 'false'}
            aria-describedby={errors.order_num ? 'faq-order-error faq-order-hint' : 'faq-order-hint'}
          />
          {errors.order_num && (
            <div id="faq-order-error" className="invalid-feedback" role="alert">
              {errors.order_num.message}
            </div>
          )}
          <small id="faq-order-hint" className="text-white-50">Lower numbers appear first.</small>
        </div>

        {/* Answer (Rich Text) */}
        <div className="col-12">
          <RichTextEditor
            label={
              <>
                Answer <span className="text-danger">*</span>
              </>
            }
            value={answerValue}
            onChange={(value) => setValue('answer', value, { shouldValidate: true })}
            disabled={loading}
          />
          {errors.answer && (
            <div className="text-danger small mt-1">{errors.answer.message}</div>
          )}
        </div>

        {/* Actions */}
        <div className="col-12">
          <div className="d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={onCancel}
              disabled={loading}
            >
              <i className="bi bi-x-lg me-2"></i>
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-dark"
              style={{ background: '#C6F806' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg me-2"></i>
                  {faq ? 'Update FAQ' : 'Create FAQ'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FAQForm;
