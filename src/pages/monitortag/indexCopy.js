import React from 'react'

export default function HashTagSearch() {
    return (
        <div>
            <div style={{ width: '100%', margin: '0px 10px', display: 'flex',marginTop:20 }}>
                <div style={{width:'70%'}}>
                    <input class="form-control" id="exampleDataList" placeholder="Type to search..." />
                </div>
                <div style={{marginLeft:10}}>
                    <button class="btn btn-primary">Recend</button>
                    <button class="btn btn-primary">Top</button>
                </div>
            </div>
        </div>
    )
}
