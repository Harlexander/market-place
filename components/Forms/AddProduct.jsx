import { faPlusCircle, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@headlessui/react';
import { ClockIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { WindowIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import categories from '@/lib/categories';
import { storeImage } from '@/hooks/useProductImage';
import { removeSymbols } from '@/lib/removeSymbols';
import { Badge } from '../Product/Badge';
import { Description } from '../Product/Description';
import { Features } from '../Product/Features';
import Toggler from './Components/Toggler';

const AddProduct = () => {
  const [preview, setPreview] = useState(false);

  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation(details => uploadProduct(details));

  const uploadProduct = async (details) => {
    try {
      const fileUrl = await storeImage(details.images);
      const data = { ...details, images : fileUrl };
      const upload = await axios.post("/api/products/upload", data)
      return upload.data;      
    } catch (error) {
      throw Error(error)
    }
  }

  const handleList = (e, index, name, state, setState, key) => {
    let list = [...state];
    list[index][name] = e;
    setState(key, list);
  }


  const addInput = (state, setState, initial, key) => {
    const list = [...state, initial]
    setState(key, list);
  }

  const removeItem = (index, state, setState, key) => {
    const list = [...state]
    list.splice(index, 1);
    setState(key, list)
  }

  return (
    <Formik
      initialValues={{
        productName: '',
        description: '',
        category : "",
        subcategory : "",
        features : [{ feature: "" }],
        images : [],
        negotiable: true,
        pre_order : false, 
        brand_new : false,
        price : 0,
      }}

      onSubmit={async (values)  => {
        try {
          !preview && setPreview(true);
     
          if(preview){
            mutate({...values, slug : removeSymbols(values.productName).replace(/ /g, "-").toLowerCase()}, {
              onSuccess : () => {
                window.alert("Product Uploaded Successfully!")
              }
            })
          }
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ errors, handleSubmit, handleChange, setFieldValue, values}) => (
        <form className='grid md:grid-cols-2 gap-10 bg-white p-8' onSubmit={handleSubmit}>
            <div className='col-1 space-y-8'>
              <div className="w-full">
                <label for="exampleFormControlInput1" className="form-label inline-block mb-2 font-nunito text-gray-700"
                >Product Name</label>
                <input  required
                  type="text"
                  className="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            bg-white
                            font-normal
                            capitalize
                            text-gray-700
                            border border-solid border-pry-300
                            transition
                            rounded
                            ease-in-out
                            focus:text-gray-700 focus:border-pry-600 focus:outline-none
                          "
                  name='productName'
                  value={values.productName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label for="exampleFormControlInput1" className="form-label inline-block mb-2 font-nunito text-gray-700"
                >Slug</label>
                <input  disabled
                  type="text"
                  className="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            bg-white
                            font-normal
                            text-gray-700
                            border border-solid border-pry-300
                            transition
                            rounded
                            ease-in-out
                            focus:text-gray-700 focus:border-pry-600 focus:outline-none
                          "
                  name='slug'
                  value={removeSymbols(values.productName).replace(/ /g, "-").toLowerCase()}
                />
              </div>
              <div className="w-full">
                <label for="exampleFormControlInput1" className="form-label inline-block mb-2 font-nunito text-gray-700"
                >Category</label>
                <select  
                  type="text"
                  className="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            bg-white
                            capitalize
                            font-normal
                            text-gray-700
                            border border-solid border-pry-300
                            transition
                            rounded
                            ease-in-out
                            focus:text-gray-700 focus:border-pry-600 focus:outline-none
                          "
                  name='category'
                  value={values.category}
                  onChange={handleChange}
                >
                  {
                    categories.map((item, index) => (
                      <option key={index} value={item.category.toLowerCase()}>{item.category}</option>
                    ))
                  }
                </select>
              </div>
              <div className="w-full">
                <label for="exampleFormControlInput1" className="form-label inline-block mb-2 font-nunito text-gray-700"
                >Sub Category</label>
                <select  
                  type="text"
                  className="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            bg-white
                            font-normal
                            capitalize
                            text-gray-700
                            border border-solid border-pry-300
                            transition
                            rounded
                            ease-in-out
                            focus:text-gray-700 focus:border-pry-600 focus:outline-none
                          "
                  name='subcategory'
                  value={values.subcategory}
                  onChange={handleChange}
                >
                  {
                    categories.find(({category}) => category === (values.category || "supermarket")).subcategories.map((item, index) => (
                      <option key={index} value={item.toLowerCase()}>{item}</option>
                    ))
                  }
                </select>
              </div>
              <div className="w-full">
                <label for="exampleFormControlInput1" className="form-label inline-block mb-2 font-nunito text-gray-700"
                >Price</label>
                <input  required
                  type="number"
                  className="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            bg-white
                            font-normal
                            text-gray-700
                            border border-solid border-pry-300
                            transition
                            rounded
                            ease-in-out
                            focus:text-gray-700 focus:border-pry-600 focus:outline-none
                          "
                  name='price'
                  value={values.price}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-4'>
                <Toggler
                  label={"Negotiable?"}
                  onChange={(e) => setFieldValue("negotiable", e)}
                  value={values.negotiable}
                  name={"negotiable"} />
                <hr />
                <Toggler
                        label={"Is it on Pre-order?"}
                        onChange={(e) => setFieldValue("pre_order", e) }
                        value={values.pre_order}
                        name={"pre_order"}/>
                      <hr />
                <Toggler
                label={"Is the Product Brand New?"}
                onChange={(e) => setFieldValue("brand_new", e) }
                value={values.brand_new}
                name={"brand_new"}/>
              </div>

              <hr />

              <div>
                <label for="exampleFormControlInput1" className="form-label inline-block mb-2 font-nunito text-gray-700"
                >Product Description</label>
                <textarea
                  
                  type="text"
                  name='description'
                  className="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            bg-white
                            font-normal
                            text-gray-700
                            border border-solid border-pry-300
                            transition
                            rounded
                            ease-in-out
                            focus:text-gray-700 focus:border-pry-600 focus:outline-none
                          "
                          value={values.description}
                          onChange={handleChange}
                />
              </div>

              <hr />

              <div className="w-full">
                <label for="exampleFormControlInput1" className="form-label inline-block mb-2 font-nunito text-gray-700"
                >Product Images</label>
                <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div class="space-y-1 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload an image</span>
                        <input  required id="file-upload" name="file-upload" type="file" accept='.jpg,.png,.jpeg,.gif' class="sr-only" onChange={(e) => addInput(values.images, setFieldValue, { "image" : e.currentTarget.files[0] }, "images")}/>
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

                    <div className='flex flex-wrap'>
                      {
                        values.images.map((item, index) => (
                          <div className='relative w-3/6' key={index}>
                              <XMarkIcon className='h-8 absolute' onClick={() => removeItem(index, values.images, setFieldValue, "images")}/>
                              <img  className='object-fit' src={URL.createObjectURL(item.image)} alt="" />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div>
              <label for="exampleFormControlInput1" className="form-label inline-block mb-2 font-nunito text-gray-700"
                >Product Features</label>
                <div className='space-y-3'>
                  {
                    values.features.map((item, index) => (
                      <div key={index} className="flex gap-2 w-full">
                        <input  required
                          onChange={(e) => handleList(e.target.value, index, "feature", values.features, setFieldValue, "features")}
                          className="form-control
                          block
                          text-base
                          bg-white
                          font-normal
                          text-gray-700
                          border border-solid border-pry-300
                          transition
                          rounded-full
                          grow
                          ease-in-out
                          px-4 py-3 
                          focus:text-gray-700 focus:border-pry-600 focus:outline-none"
                          placeholder="Feature"
                          placeholderTextColor={"black"}
                          value={item.feature}
                        />

                        <button
                        type='button'
                          onClick={() => removeItem(index, values.features, setFieldValue, "features")}>
                            {
                              index !== 0 && (
                                <div className="bg-red-400 rounded-full flex-row items-center  px-4 py-3 ">
                                  <FontAwesomeIcon icon={faTrash} size={20} color="white" />
                                </div>
                              )
                            }
                        </button>
                      </div>
                    ))
                  }

                  <div>
                    <button
                    type='button'
                      className="bg-pry  px-6 py-3 rounded-full font-nunito space-x-5 text-white"
                      onClick={() => addInput(values.features, setFieldValue, { feature: "" }, "features")}
                    >
                    <FontAwesomeIcon icon={faPlusCircle} size={20} color="white"/> Add Feature
                    </button>
                  </div>
                </div>
              </div>


              <div>
                <button type={"submit"} disabled={isLoading} className='bg-pry px-5 py-3 text-white font-nunito w-full'>{ isLoading ? <FontAwesomeIcon icon={faSpinner} spin className='lg'/> : (preview ? "Upload Product" : "Preview")} </button>
              </div>
            </div>
            <div className='col-1 md:border-l-2  bg-white p-5'>
              {
                preview && <Preview images={values.images} values={values}/>
              }
              {
                !preview && (
                  <div className='flex gap-2 h-full flex-col font-nunito justify-center items-center'>
                    <WindowIcon className='h-32 text-pry'/>
                    <p>Product preview will show here.</p>
                  </div>
                )
              }
            </div>
        </form>
      )}
    </Formik>
  )
}

export default AddProduct

const Preview = ({images, values}) => {
  return(
    <div className='px-2'>
      <div className='md:col-span-2'>
          <div id="carouselExampleIndicators" className="carousel slide relative" data-bs-ride="carousel">
          <div className="carousel-inner relative w-full overflow-hidden">
          {
              images.map(({image}, index) => (
                  <div key={index} className={`carousel-item float-left w-full ${index == 0 && "active"}`}>
                      <img
                          src={URL.createObjectURL(image)}
                          className="block w-full"
                          alt="product"
                      />
                  </div>
              ))
          }
          </div>
          <button
              className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
          >
              <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button
              className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
          >
              <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>
          </div>
      <div className='flex block flex-wrap justify-start gap-3 py-5'>
          {
              images.map(({image}, index) => (
                  <img src={URL.createObjectURL(image)} key={index} className="h-10 w-10"/>
              ))
          }
      </div>
      </div>
      <div className='col-span-3 space-y-6'>
        <p className='font-lato text-3xl font-semibold'>{values.productName}</p>
        <div className='flex gap-4 items-center'>
           {values.brand_new && <Badge content={"Used"} color={"bg-pry"}/>}
           {values.pre_order && <Badge content={"Pre-order"} color={"bg-pry"}/>}
           {values.negotiable && <Badge content={"Negotiable"} color={"bg-pry"}/>}
        </div>
        <div className='font-nunito flex items-center gap-4'>
            <ClockIcon className='h-5 text-pry'/>
            <span>Uploaded Just now</span>
        </div>
        <Description description={values.description}/>
        <div className='flex gap-4 justify-between'>
            <button type='button' className='py-2 border text-pry border-pry font-nunito w-full rounded-lg'>
                Chat with Vendor
            </button>
            <button type='button' className='py-2 bg-pry text-white font-nunito w-full rounded-lg'>
                Contact Seller
            </button>
        </div>
        <Features features={values.features}/>
      </div>
    </div>
  )
}