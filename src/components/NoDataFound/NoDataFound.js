import React from 'react';

export default function NoDataFound() {
    return <div className="no-result-found">
        <div class="result-inner">
            <h2>No Data Available Test</h2>
            <p className="text-muted">Sorry but the data you are looking for does not exist.</p>
        </div>
    </div>;
}
