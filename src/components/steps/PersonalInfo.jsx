'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormStep } from '@/context/FormContext';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from './PersonalInfo.module.css';

const schema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  gender: z.enum(['Male', 'Female'], { required_error: 'Gender is required' }),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is required'),
  address: z.string().min(5, 'Contact address is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  parentName: z.string().min(3, 'Parent/Guardian name is required'),
  parentAddress: z.string().min(5, "Parent's contact address is required"),
  // photo is optional
});

export default function PersonalInfo() {
  const { formData, updateFormData, nextStep } = useFormStep();
  const { data: session } = useSession();

  // local state for photo preview
  const [photoPreview, setPhotoPreview] = useState(formData.personalInfo?.photo || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData.personalInfo || {
      fullName: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
      parentName: '',
      parentAddress: '',
      photo: '',
    },
  });

  // If formData.personalInfo.photo changes externally, update preview
  useEffect(() => {
    if (formData.personalInfo?.photo) {
      setPhotoPreview(formData.personalInfo.photo);
      setValue('photo', formData.personalInfo.photo);
    }
  }, [formData.personalInfo?.photo, setValue]);

  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.toString();
      setPhotoPreview(base64String);
      // Update form value & form data context with base64 string
      setValue('photo', base64String);
      updateFormData({
        personalInfo: {
          ...formData.personalInfo,
          photo: base64String,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    updateFormData({ personalInfo: data });

    try {
      await fetch('/api/apply/step-1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id,
          personalInfo: data,
        }),
      });
    } catch (error) {
      console.error('Failed to save personal info:', error);
    }

    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <h2 className={styles.heading}>Step 1: Personal Information</h2>
      <p className={styles.subtext}>Please fill in the required details below.</p>

      {/* Full Name */}
      <label className={styles.label} htmlFor="fullName">Full Names</label>
      <input
        id="fullName"
        {...register('fullName')}
        placeholder="Enter your full name"
        className={styles.input}
        aria-invalid={errors.fullName ? 'true' : 'false'}
      />
      {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}

      {/* Gender */}
      <label className={styles.label} htmlFor="gender">Gender</label>
      <select
        id="gender"
        {...register('gender')}
        className={styles.input}
        aria-invalid={errors.gender ? 'true' : 'false'}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {errors.gender && <p className={styles.error}>{errors.gender.message}</p>}

      {/* Email */}
      <label className={styles.label} htmlFor="email">Email Address</label>
      <input
        id="email"
        {...register('email')}
        placeholder="Enter your email"
        className={styles.input}
        aria-invalid={errors.email ? 'true' : 'false'}
      />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      {/* Phone */}
      <label className={styles.label} htmlFor="phone">Phone Number</label>
      <input
        id="phone"
        {...register('phone')}
        placeholder="Enter your phone number"
        className={styles.input}
        aria-invalid={errors.phone ? 'true' : 'false'}
      />
      {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

      {/* Address */}
      <label className={styles.label} htmlFor="address">Contact Address</label>
      <input
        id="address"
        {...register('address')}
        placeholder="Enter your contact address"
        className={styles.input}
        aria-invalid={errors.address ? 'true' : 'false'}
      />
      {errors.address && <p className={styles.error}>{errors.address.message}</p>}

      {/* Date of Birth */}
      <label className={styles.label} htmlFor="dob">Date of Birth</label>
      <input
        id="dob"
        {...register('dob')}
        type="date"
        className={styles.input}
        aria-invalid={errors.dob ? 'true' : 'false'}
      />
      {errors.dob && <p className={styles.error}>{errors.dob.message}</p>}

      {/* Parent/Guardian Name */}
      <label className={styles.label} htmlFor="parentName">Parent/Guardian Name</label>
      <input
        id="parentName"
        {...register('parentName')}
        placeholder="Enter parent/guardian name"
        className={styles.input}
        aria-invalid={errors.parentName ? 'true' : 'false'}
      />
      {errors.parentName && <p className={styles.error}>{errors.parentName.message}</p>}

      {/* Parent Address */}
      <label className={styles.label} htmlFor="parentAddress">Parent's Contact Address</label>
      <input
        id="parentAddress"
        {...register('parentAddress')}
        placeholder="Enter parent's contact address"
        className={styles.input}
        aria-invalid={errors.parentAddress ? 'true' : 'false'}
      />
      {errors.parentAddress && <p className={styles.error}>{errors.parentAddress.message}</p>}

      {/* Photo upload */}
      <label className={styles.label} htmlFor="photoUpload">Upload Passport Photo</label>
      <input
        type="file"
        id="photoUpload"
        accept="image/*"
        onChange={onPhotoChange}
        className={styles.input}
      />
      {photoPreview && (
        <img
          src={photoPreview}
          alt="Passport Preview"
          style={{ maxWidth: '150px', marginTop: '10px', borderRadius: '5px' }}
        />
      )}

      <button type="submit" className={styles.button}>
        Save and Continue
      </button>
    </form>
  );
}
