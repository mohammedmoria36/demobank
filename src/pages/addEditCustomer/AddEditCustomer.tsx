import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { useAddCustomerMutation, useEditCustomerMutation, useFetchCustomerByIdQuery } from "../../redux/api/customerApi";

const AddEditCustomer = () => {
    let { type, id } = useParams();
    let isEdit = true;
    isEdit = (type === 'edit' || type === 'view') ? true : false;
    const { data, isFetching, isSuccess, isError } = useFetchCustomerByIdQuery(id, { skip: !isEdit, refetchOnMountOrArgChange: true });
    const [addCustomer] = useAddCustomerMutation();
    const [editCustomer] = useEditCustomerMutation();
    const navigate = useNavigate();

    const countryList = ['India', 'USA', 'Germany', 'Brazil', 'England'];

    const CutomerSchema = Yup.object().shape({
        fullName: Yup.string().required('Please Enter FullName'),
        address: Yup.string().required('Please Enter Address'),
        country: Yup.string().required('Please Select Country'),
        pincode: Yup.number().required('Please Enter Pincode'),
    });

    const methods = useForm<any>({
        resolver: yupResolver(CutomerSchema),
        mode: 'onChange'
    });

    const {
        register,
        reset,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors, isDirty },
    } = methods;


    useEffect(() => {
        if (isEdit) {
            if (isSuccess) {
                reset(data);
            }
        }
    }, [reset, isFetching])

    // Submit form
    const SubmitRegisteration = (data: any, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        // console.log(data, 'DDDD');
        if (isEdit) {
            editCustomer(data);
        } else {
            addCustomer(data);
        }
        navigate('/list');
    };

    const getErrorMessage = (error: any) => {
        if (error) {
            return error.message;
        }
        return null;
    };

    const renderAddEditForm = () => {
        return (
            <>
                <form
                    onSubmit={handleSubmit(SubmitRegisteration)}
                    autoComplete="false"
                >
                    <input {...register("fullName")} placeholder="Full name" />
                    {errors.fullName && <p>{getErrorMessage(errors?.fullName)}</p>}
                    <input {...register("address")} placeholder="address" />
                    {errors.address && <p>{getErrorMessage(errors?.address)}</p>}
                    <select {...register('country')}>
                        {countryList.map((country: string) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    {errors.country && <p>{getErrorMessage(errors?.country)}</p>}
                    <input {...register("pincode")} placeholder="pincode" />
                    {errors.pincode && <p>{getErrorMessage(errors?.pincode)}</p>}
                    {/* <p>{errors.fullName?.message}</p> */}
                    <Button type="submit" fullWidth className="lr-btn">
                        Add user
                    </Button>
                </form>
            </>
        )
    }

    const renderViewPart = () => {
        return (
            <>
                <div className="user-details">
                    <h2>User Details</h2>
                    <div>
                        <span className="label">Fullname:</span>
                        <span className="value">{data?.fullName}</span>
                    </div>
                    <div>
                        <span className="label">Country:</span>
                        <span className="value">{data?.country}</span>
                    </div>
                    <div>
                        <span className="label">Address:</span>
                        <span className="value">{data?.address}</span>
                    </div>
                    <div>
                        <span className="label">Pincode:</span>
                        <span className="value">{data?.pincode}</span>
                    </div>
                </div>
            </>
        )
    }

    if (isFetching) {
        return <>Loading...</>
    }

    if (isError) {
        return <>No user found</>
    }

    return (
        <>
            <div>
                <div className='main-container-header'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" to="/">
                            Home
                        </Link>
                        <Link color="inherit" to="/list">
                            List of Beneficiary
                        </Link>
                        <Typography color="text.primary">{type?.toUpperCase()}</Typography>
                    </Breadcrumbs>
                </div>
                {/* <h1>{type?.toUpperCase()}</h1> */}
                {type === 'view' ? renderViewPart() : renderAddEditForm()}
            </div>
        </>
    )
}

export default AddEditCustomer;