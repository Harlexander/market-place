"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Formik } from 'formik'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useEditProfileModal } from '@/hooks/useEditProfileModal'

export const EditProfileModal = ({ user }) => {
  const { isOpen, type, toggleModal } = useEditProfileModal();

  console.log("user", user);

    const { mutate, isSuccess } = useMutation(async values => {
      const {data} = await axios.put("/api/vendor/users", values)
  
      return data;
    }, {
      onSuccess : () => {
        window.location.reload()
      }
    })
    return(
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => toggleModal("personal")}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold font-[montserrat] leading-6 text-gray-900"
                    >
                      Edit {type} Information
                    </Dialog.Title>
  
                    <Formik
                    initialValues={{
                      firstName: user?.firstName,
                      lastName: user?.lastName,
                      mobile: user?.mobile,
                      residential_address: user?.residential_address,
                      name: user?.store?.name,
                      businessType: user?.store?.type,
                      businessLocation: user?.store?.location,
                      description: user?.store?.location,
                    }}
                    onSubmit={(values) => mutate(values)}
                    >
                      {({errors, handleSubmit, handleChange, values}) => (
                        <>
                          <div className="mt-2 text-black">
                            {
                              type === "personal" && (
                                <div>
                                  <li className="px-6 py-4 flex gap-4 flex-col border-b border-gray-200 w-full"><span>First Name:</span><input onChange={handleChange} name="firstName" value={values.firstName} className='text-right py-2' /></li>
                                  <li className="px-6 py-4 flex gap-4 flex-col border-b border-gray-200 w-full"><span>Last Name:</span><input onChange={handleChange} name="lastName" value={values.lastName} className='text-right py-2' /></li>
                                  <li className="px-6 py-4 flex gap-4 flex-col border-b border-gray-200 w-full"><span>Mobile:</span><input onChange={handleChange} name="mobile" value={values.mobile} className='text-right py-2' /></li>
                                  <li className="px-6 py-4 flex gap-4 flex-col border-b border-gray-200 w-full"><span>ID:</span><input onChange={handleChange} name="" value={""} className='text-right py-2' defaultValue={"78383781781"}/></li>
                                  <li className="px-6 py-4 flex gap-4 flex-col border-b border-gray-200 w-full"><span>Location:</span><input onChange={handleChange} name="residential_address" value={values.residential_address} className='text-right py-2' /></li>
                                </div>
                              )
                            }
                            
                            {
                              type === "business" && (
                                <div>
                                  <li className="px-6 py-4 flex gap-4 flex-col border-b border-gray-200 w-full"><span>Brand Name:</span><input onChange={handleChange} name="brandName" disabled value={values.name} className='text-right py-2'/></li>
                                  <li className="px-6 py-4 flex gap-4 flex-col border-b border-gray-200 w-full"><span>Business Type:</span><input onChange={handleChange} name="businessType" value={values.businessType} className='text-right py-2'/></li>
                                  <li className="px-6 py-4 flex gap-4 flex-col border-b border-gray-200 w-full"><span>Location:</span><input onChange={handleChange} name="businessLocation" value={values.businessLocation} className='text-right py-2'/></li>
                                  <li className="px-6 py-4 flex gap-4 flex-col border-b border-gray-200 w-full"><span>Description:</span><textarea onChange={handleChange} name="description" value={values.description} className='text-right h-full'/></li>
                                </div>                       
                              )
                            }
  
                          </div>  
                          <div className="mt-4 space-x-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={handleSubmit}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={() => toggleModal("personal")}
                            >
                              Close!
                            </button>
                          </div>
                        </>
                      )}
                    
                    </Formik>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  }