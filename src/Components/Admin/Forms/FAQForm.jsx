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
          <label className="form-label text-white">
            Question <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.question ? 'is-invalid' : ''}`}
            {...register('question')}
            disabled={loading}
            placeholder="What is your question?"
          />
          {errors.question && (
            <div className="invalid-feedback">{errors.question.message}</div>
          )}
          <small className="text-white-50">
            {watch('question')?.length || 0}/500 characters
          </small>
        </div>

        {/* Category */}
        <div className="col-md-6">
          <label className="form-label text-white">Category</label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-secondary ${errors.category ? 'is-invalid' : ''}`}
            {...register('category')}
            disabled={loading}
            placeholder="e.g., General, Pricing, Technical"
          />
          {errors.category && (
            <div className="invalid-feedback">{errors.category.message}</div>
          )}
          <small className="text-white-50">Optional. Used for grouping FAQs.</small>
        </div>

        {/* Order */}
        <div className="col-md-6">
          <label className="form-label text-white">Display Order</label>
          <input
            type="number"
            className={`form-control bg-dark text-white border-secondary ${errors.order_num ? 'is-invalid' : ''}`}
            {...register('order_num', { valueAsNumber: true })}
            disabled={loading}
            min="0"
          />
          {errors.order_num && (
            <div className="invalid-feedback">{errors.order_num.message}</div>
          )}
          <small className="text-white-50">Lower numbers appear first.</small>
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
