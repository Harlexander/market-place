"use client"
import { EditProfileModal } from '@/components/Modals/EditProfile'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const EditProfileProvider = () => {
    const { data : user,  } = useSession();
    
    return (
        <div>
            <EditProfileModal data={user} />
        </div>
    )
}

export default EditProfileProvider