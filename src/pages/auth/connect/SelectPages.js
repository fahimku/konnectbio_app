import React from 'react'
import Select from "react-select";
import Loader from '../../../components/Loader/Loader';

export default function SelectPages({ pages, setSelectedPage, selectedPage, checkLoading, insta, next }) {
    return (
        <>
            <h5 className="card-title">Select Facebook Page</h5>
            <p className="card-text">Please select a page that is connected to instagram.</p>
            <div className="mb-3">
                <label>Facebook Pages</label>

                <Select
                    options={pages.map((item) => {
                        return (
                            {
                                value: item.id,
                                label: item.name
                            }
                        )
                    })}
                    placeholder="Select Page"
                    onChange={(event) => setSelectedPage(event.value)}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    checkLoading ? <Loader /> : (
                        insta || insta == 0 ? null : <p style={{ color: 'red' }}>Oops, there is no business instagram account found.</p>
                    )
                }
            </div>
            <div className="w-100 justify-content-center">
                <button
                    onClick={next}
                    disabled={insta ? false : true}
                    className="btn btn-primary btn-sm"
                >
                    Next
                </button>
            </div>
        </>
    )
}
